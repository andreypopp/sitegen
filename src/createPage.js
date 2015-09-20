import invariant from 'invariant';

export default function createPage(spec) {
  let {page, indexRoute, childRoutes, childPages, component, path} = spec;

  invariant(
    !(childRoutes && childPages),
    'Page cannot specify both childPages and childRoutes at the same time.'
  );

  invariant(
    !(childPages && page),
    'Page cannot specify both childPages and page at the same time.'
  );

  if (page) {
    if (isContextModule(page)) {
      let contextModule = createContextRoute(path, page, component);
      return createProxyRoute(path, contextModule, component);
    } else {
      return createProxyRoute(path, page, component);
    }
  }

  if (childPages) {
    childRoutes = childPagesToRoutes(childPages);
    childRoutes.sort(sortChildRoutes);
  }

  if (!childRoutes) {
    childRoutes = []
  }

  return {
    type: 'PlainRoute',
    path,
    component,
    childRoutes,
    indexRoute,
  };
}

function childPagesToRoutes(childPages) {
  let childRoutes = [];
  for (let key in childPages) {
    if (childPages.hasOwnProperty(key)) {
      let module = childPages[key];
      if (isContextModule(module)) {
        childRoutes.push(createContextRoute(key, childPages[key]));
      } else {
        childRoutes.push(createModuleRoute(key, childPages[key]));
      }
    }
  }
  return childRoutes;
}

function loadModule(module, callback) {
  if (typeof module === 'function') {
    module(callback);
  } else {
    callback(module);
  }
}

function createProxyRoute(path, module) {
  return {
    type: 'ProxyRoute',

    path,

    getIndexRoute(location, callback) {
      console.log('ProxyRoute.getIndexRoute');
      loadModule(module, function(module) {
        if (module.indexRoute !== undefined) {
          callback(null, module.indexRoute);
        } else if (module.getIndexRoute) {
          module.getIndexRoute(location, callback);
        } else {
          callback(null, undefined);
        }
      });
    },

    getComponent(location, callback) {
      console.log('ProxyRoute.getComponent');
      loadModule(module, function(module) {
        if (module.component !== undefined) {
          callback(null, module.component);
        } else if (module.getComponent) {
          module.getComponent(location, callback);
        } else {
          callback(null, undefined);
        }
      });
    },

    getChildRoutes(location, callback) {
      console.log('ProxyRoute.getChildRoutes');
      loadModule(module, function(module) {
        if (module.childRoutes !== undefined) {
          callback(null, module.childRoutes);
        } else if (module.getChildRoutes) {
          module.getChildRoutes(location, callback);
        } else {
          callback(null, []);
        }
      });
    }
  };
}

function isContextModule(module) {
  return typeof module.keys === 'function' && typeof module.resolve === 'function';
}

function sortChildRoutes(a, b) {
  if (a.path.length > b.path.length) {
    return 1;
  } else if (a.path.length > b.path.length) {
    return -1;
  } else {
    return 0;
  }
}

function createModuleRoute(path, module) {

  return {
    type: 'ModuleRoute',

    path,

    getComponent(location, callback) {
      console.log('PageRoute.getComponent');
      loadModule(module, function(module) {
        callback(null, module.component);
      });
    },

    getChildRoutes(location, callback) {
      console.log('PageRoute.getChildRoutes');
      loadModule(module, function(module) {
        let childRoutes = module.childRoutes || [];
        childRoutes = childRoutes
          .map(route => ({...route, path: path + route.path.substring(1)}))
          .filter(route => route.path !== path);
        callback(null, childRoutes);
      });
    }
  };
}

function createContextRoute(path, context, component) {
  let keys = context.keys();
  let childRoutes = [];
  let indexRoute;
  keys.forEach(key => {
    let module = function loadContextModule(cb) {
      context(key)(cb);
    };
    let childPath = key.substring(1).replace(/\..+$/, '');
    if (childPath === '/index') {
      indexRoute = createModuleRoute(undefined, module);
    } else {
      childRoutes.push(createModuleRoute(childPath, module));
    }
  });
  childRoutes.sort(sortChildRoutes);
  console.log('createContextRoute', path, indexRoute, childRoutes);
  return {type: 'ContextRoute', path, childRoutes, indexRoute};
}
