export default function createPage(spec) {
  if (isRoute(spec)) {
    return spec;
  }
  let {context, meta, component} = spec;
  let childRoutes = context ? context.keys().map(requestToPath.bind(null, context)) : [];
  childRoutes.sort(sortChildRoutes);

  return {
    childRoutes,
    component,
  };
}

function isRoute(obj) {
  return obj.childRoutes !== undefined;
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

function requestToPath(context, request) {
  var path = request
    .substring(1)
    .replace(/\..+$/, '')
    .replace(/\/index$/, '') + '/';

  function requireModule(cb) {
    var module = context(request);
    if (typeof module === 'function') {
      module(cb);
    } else {
      cb(module);
    }
  }

  return {
    path,
    getComponent(location, cb) {
      requireModule(function(module) {
        cb(null, module.component);
      });
    },
    getChildRoutes(location, cb) {
      requireModule(function(module) {
        let childRoutes = module.childRoutes || [];
        childRoutes = childRoutes
          .map(route => ({...route, path: path + route.path.substring(1)}))
          .filter(route => route.path !== path);
        cb(null, childRoutes);
      });
    }
  };
}
