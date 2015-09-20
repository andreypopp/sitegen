import React     from 'react';
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
      return createProxyRoute(path, contextModule);
    } else {
      return createProxyRoute(path, page, component);
    }
  }

  if (childPages) {
    childRoutes = [];
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

function loadModule(module, callback) {
  if (typeof module === 'function') {
    module(callback);
  } else {
    callback(module);
  }
}

function Compose(Wrapper, Component) {
  if (Wrapper === undefined) {
    return Component;
  }
  console.error(Wrapper, Component);
  return function Composed(props) {
    return (
      <Wrapper {...props}>
        <Component {...props} />
      </Wrapper>
    );
  };
}

function createProxyRoute(path, module, component) {
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
      console.log('ProxyRoute.getComponent', path, component);
      loadModule(module, function(module) {
        if (module.component !== undefined) {
          callback(null, Compose(component, module.component));
        } else if (module.getComponent) {
          module.getComponent(location, function(error, routeComponent) {
            if (error) {
              callback(error);
            } else {
              callback(null, Compose(component, routeComponent));
            }
          });
        } else {
          callback(null, undefined);
        }
      });
    },

    getChildRoutes(location, callback) {
      console.log('ProxyRoute.getChildRoutes');
      loadModule(module, function(module) {
        if (module.childRoutes !== undefined) {
          callback(null, rewriteChildRoutes(path, module.childRoutes, component));
        } else if (module.getChildRoutes) {
          module.getChildRoutes(location, function(error, childRoutes) {
            if (error) {
              callback(error);
            } else {
              callback(null, rewriteChildRoutes(path, childRoutes, component));
            }
          });
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

function rewriteChildRoutes(path = '/', childRoutes = [], component) {
  return childRoutes
    .map(route => ({
      ...route, path: path + route.path.substring(1),
      component: Compose(component, route.component),
      getComponent(location, callback) {
        route.getComponent(location, function(error, routeComponent) {
          if (error) {
            callback(error);
          } else {
            callback(null, Compose(component, routeComponent));
          }
        });
      }
    }))
    .filter(route => route.path !== path);
}

function createModuleRoute(path, module) {

  return {
    type: 'ModuleRoute',

    path,

    getComponent(location, callback) {
      console.log('ModuleRoute.getComponent');
      getComponentWithProxy(path, module, location, callback);
    },

    getChildRoutes(location, callback) {
      console.log('ModuleRoute.getChildRoutes');
      getChildRoutesWithProxy(path, module, location, callback);
    }
  };
}

function getComponentWithProxy(path, module, location, callback) {
  loadModule(module, function(module) {
    if (module.type === 'ProxyRoute') {
      module.getComponent(location, function(error, component) {
        if (error) {
          callback(error);
        } else {
          callback(null, Compose(module.component, component));
        }
      });
    } else {
      callback(null, module.component);
    }
  });
}

function getChildRoutesWithProxy(path, module, location, callback) {
  loadModule(module, function(module) {
    if (module.type === 'ProxyRoute') {
      module.getChildRoutes(location, function(error, childRoutes) {
        if (error) {
          callback(error);
        } else {
          callback(null, rewriteChildRoutes('', childRoutes, module.component));
        }
      });
    } else {
      callback(null, rewriteChildRoutes(path, module.childRoutes));
    }
  });
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
  return {type: 'ContextRoute', path, childRoutes, indexRoute, component};
}
