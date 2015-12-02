import React                              from 'react';
import ReactDOM                           from 'react-dom';
import {RoutingContext, match, useRoutes} from 'react-router';
import createBrowserHistory               from 'history/lib/createBrowserHistory';
import RenderRoot                         from './RenderRoot';
import createPage                         from './createPage';
import {collectRoutes}                    from './util/Route';
import LinkRegistry                       from './LinkRegistry';
import PageRegistry                       from './PageRegistry';
import Meta                               from './Meta';

export default function createSite(spec, key) {
  let routes = {
    ...createPage(spec, key),

    getRenderedMeta() {
      return Meta.rewind() || {};
    }
  };

  routes.renderIntoDocument = async function(element = RenderRoot.getDOMNode()) {

    if (!PageRegistry.installed() || !LinkRegistry.installed()) {
      let flatRoutes = await collectRoutes(routes);
      PageRegistry.createFromRoutes(flatRoutes).install();
      LinkRegistry.createFromRoutes(flatRoutes).install();
    }

    let history = useRoutes(createBrowserHistory)({routes: [routes]});
    let unlisten = history.listen((err, {location}) => {
      if (err) {
        throw err;
      }
      match({routes, location}, (err, redirect, props) =>
        ReactDOM.render(<RoutingContext {...props} history={history} />, element));
    });

    return function unmount() {
      unlisten();
      ReactDOM.unmountComponentAtNode(element);
    };
  };

  return routes;
}
