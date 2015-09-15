import React                    from 'react';
import ReactDOM                 from 'react-dom';
import {RoutingContext, match}  from 'react-router';
import createBrowserHistory     from 'history/lib/createBrowserHistory';
import RenderRoot               from './RenderRoot';

export Site from './Site';

export function createPage({context, meta, component}) {
  let childRoutes = context ? context.keys().map(requestToPath.bind(null, context)) : [];
  childRoutes.sort(sortChildRoutes);

  return {

    childRoutes,

    component,

    renderIntoDocument(element = RenderRoot.getDOMNode()) {
      let history = createBrowserHistory();
      let unlisten = history.listen(location => 
        match({routes: childRoutes, location}, (err, redirect, props) =>
          ReactDOM.render(<RoutingContext {...props} history={history} />, element)));

      return function unmount() {
        unlisten();
        ReactDOM.unmountComponentAtNode(element);
      }
    }
  };
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
        var childRoutes = module.childRoutes
          .map(route => ({...route, path: path + route.path.substring(1)}))
          .filter(route => route.path !== path);
        cb(null, childRoutes);
      });
    }
  };
}
