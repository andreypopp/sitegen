/**
 * @copyright 2016-present, Sitegen team
 */

import React from 'react';

export let contextTypes = {
  page: React.PropTypes.object,
};

export default class CollectionContext extends React.Component {

  static contextTypes = contextTypes;
  static childContextTypes = contextTypes;

  render() {
    let {Component, page, props} = this.props;
    page = page.map(item => ({
      ...item,
      path: createPath(props.route, props.routes, item.path),
    }));
    return <Component {...props} page={page} />;
  }

  getChildContext() {
    let {pageNumber, pageCount, props: {routes, route}} = this.props;
    return {
      page: {
        collection: {pageNumber, pageCount},
        routes: routes,
        route: route,
        createPath(...rest) {
          return createPath(route, routes, ...rest);
        }
      }
    };
  }
}

function createPath(route, routes, ...rest) {
  let basepath = [];
  for (let i = 0; i < routes.length; i++) {
    basepath.push(routes[i].path);
    if (routes[i] === route) {
      break;
    }
  }
  basepath = basepath.join('');
  if (rest.length > 0) {
    return [basepath].concat(rest).join('/');
  } else {
    return basepath;
  }
}
