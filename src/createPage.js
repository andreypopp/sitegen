import invariant            from 'invariant';
import {suggestPullRequest} from './ErrorUtils';

export default function createPage(spec, key) {
  invariant(key !== undefined, 'oops');
  let {
    route,
    meta,
    path,
    component,
    indexRoute,
    childRoutes = [],
  } = spec;

  if (route) {
    if (isContextModule(route)) {
      return {...createContextRoute(path, route, component), key};
    } else {
      return {...createProxyRoute(path, route, component), key};
    }
  }

  return {
    type: 'Module',
    meta,
    key,
    path,
    component,
    childRoutes,
    indexRoute,
  };
}

function createContextRoute(path, context, component) {
  let childRoutes = [];
  let indexRoute;
  context.keys().forEach(key => {
    let module = cb => ensureModuleLoaded(context(key), cb);
    let childPath = key.substring(1).replace(/\..+$/, '').replace(/^\//, '');
    if (childPath === 'index') {
      indexRoute = createProxyRoute(path, module);
    } else {
      childRoutes.push(createProxyRoute(childPath, module));
    }
  });
  childRoutes.sort(sortChildRoutes);
  return {
    type: 'Context',
    path,
    childRoutes,
    indexRoute,
    component,

    getMeta(callback) {
      if (indexRoute) {
        indexRoute.getMeta(callback);
      } else {
        callback(null, null);
      }
    },

    getKey(callback) {
      if (indexRoute) {
        indexRoute.getKey(callback);
      } else {
        callback(null, null);
      }
    }
  };
}

function ensureModuleLoaded(module, callback) {
  if (isModuleLoader(module)) {
    module(callback);
  } else {
    callback(module);
  }
}

function createProxyRoute(path, module) {
  let self = {
    type: 'Proxy',

    path,

    getKey(callback) {
      getKeyRecursively(module, callback);
    },

    getMeta(callback) {
      getMetaRecursively(module, callback);
    },


    getIndexRoute(location, callback) {
      ensureModuleLoaded(module, function(module) {
        if (module.type === 'Proxy') {
          module.getIndexRoute(location, callback);
        } else if (module.indexRoute !== undefined) {
          callback(null, module.indexRoute);
        } else if (module.getIndexRoute) {
          suggestPullRequest('Route.getIndexRoute');
        } else {
          callback(null, undefined);
        }
      });
    },

    getComponent(location, callback) {
      ensureModuleLoaded(module, function(module) {
        if (module.type === 'Proxy') {
          module.getComponent(location, callback);
        } else if (module.component !== undefined) {
          callback(null, module.component);
        } else if (module.getComponent) {
          suggestPullRequest('Route.getChildRoutes');
        } else {
          callback(null, undefined);
        }
      });
    },

    getChildRoutes(location, callback) {
      ensureModuleLoaded(module, function(module) {
        if (module.type === 'Proxy') {
          module.getChildRoutes(location, callback);
        } else if (module.childRoutes !== undefined) {
          callback(null, module.childRoutes);
        } else if (module.getChildRoutes) {
          suggestPullRequest('Route.getChildRoutes');
        } else {
          callback(null, []);
        }
      });
    }
  };

  return self;
}

/**
 * Check if `module` is a context module.
 */
function isContextModule(module) {
  return (
    typeof module === 'function' &&
    typeof module.keys === 'function' &&
    typeof module.resolve === 'function'
  );
}

/**
 * Check if `module` is a module loader (created with bundle-loader).
 */
function isModuleLoader(module) {
  return (
    typeof module === 'function' &&
    !isContextModule(module)
  );
}

/**
 * Sort function for child routes.
 */
function sortChildRoutes(a, b) {
  if (a.path.length > b.path.length) {
    return 1;
  } else if (a.path.length > b.path.length) {
    return -1;
  } else {
    return 0;
  }
}

function getKeyRecursively(module, callback) {
  ensureModuleLoaded(module, function(module) {
    if (module.key) {
      callback(null, module.key);
    } else if (module.getKey) {
      module.getKey(function(error, key) {
        if (error) {
          callback(error);
        } else {
          callback(null, key);
        }
      });
    } else {
      invariant(false, 'Cannot get key of the module');
    }
  });
}

function getMetaRecursively(module, callback) {
  ensureModuleLoaded(module, function(module) {
    if (module.meta) {
      callback(null, module.meta);
    } else if (module.getMeta) {
      module.getMeta(function(error, meta) {
        if (error) {
          callback(error);
        } else {
          callback(null, meta);
        }
      });
    } else {
      callback(null, {});
    }
  });
}
