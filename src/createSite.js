import React                    from 'react';
import ReactDOM                 from 'react-dom';
import {RoutingContext, match}  from 'react-router';
import createBrowserHistory     from 'history/lib/createBrowserHistory';
import RenderRoot               from './RenderRoot';
import createPage               from './createPage';

export default function createSite(spec) {
  let page = createPage(spec);
  return {
    ...page,

    renderIntoDocument(element = RenderRoot.getDOMNode()) {
      let history = createBrowserHistory();
      let unlisten = history.listen(location => 
        match({routes: page.childRoutes, location}, (err, redirect, props) =>
          ReactDOM.render(<RoutingContext {...props} history={history} />, element)));

      return function unmount() {
        unlisten();
        ReactDOM.unmountComponentAtNode(element);
      }
    }
  };
}
