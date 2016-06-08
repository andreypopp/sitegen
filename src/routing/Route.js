/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import {Minimatch} from 'minimatch';

/**
 * Marker class for site routes.
 */
export class Route {

}

/**
 * Mapping from path segments to routes.
 */
type RouteMap = {
  [path: string]: Route;
};

type PageRouteOptions = {
  /**
   * If route should be split into a separate bundle.
   */
  split?: boolean;
};

/**
 * Route which represents a regular page.
 */
export class PageRoute extends Route {

  component: string;
  options: PageRouteOptions;
  routes: RouteMap;

  constructor(
    component: string,
    options: PageRouteOptions,
    routes: RouteMap) {

    super();
    this.component = component;
    this.options = options;
    this.routes = routes;
  }
}

type CollectionRouteOptions = {
  paginate?: {size: number};
};

type CollectionSpec = {
  context: string;
  match: (filename: string) => boolean;
};

/**
 * Route which represents a page which manages a collection of pages.
 *
 * Example blog post index which manages a collection of blog posts.
 */
export class CollectionRoute extends Route {

  component: string;
  collection: CollectionSpec;
  options: CollectionRouteOptions;

  constructor(
    component: string,
    collection: CollectionSpec,
    options: CollectionRouteOptions) {

    super();
    this.component = component;
    this.collection = collection;
    this.options = options;
  }
}

/**
 * Route which references some asset.
 */
export class AssetRoute extends Route {

  req: string;

  constructor(req: string) {
    super();
    this.req = req;
  }
}

export function page(
  component: string,
  options?: PageRouteOptions = {},
  routes?: RouteMap = {}): PageRoute {

  return new PageRoute(component, options, routes);
}

export function collection(
  component: string,
  pattern: string,
  options?: CollectionRouteOptions = {}): CollectionRoute {
  let spec = parsePattern(pattern);
  return new CollectionRoute(component, spec, options);
}

export function asset(req: string): AssetRoute {
  return new AssetRoute(req);
}

export function forEach(route: Route, func: (route: Route) => void): void {
  func(route);
  if (route instanceof PageRoute)  {
    for (let k in route.routes) {
      forEach(route.routes[k], func);
    }
  }
}

function parsePattern(pattern: string): CollectionSpec {
  let matcher = new Minimatch(pattern);
  let context = [];
  for (let i = 0; i < matcher.set[0].length; i++) {
    if (typeof matcher.set[0][i] === 'string') {
      context.push(matcher.set[0][i]);
    } else {
      break;
    }
  }
  if (context.length > 1) {
    context = context.join('/');
  } else {
    context = '.';
  }
  return {
    context,
    match: matcher.match.bind(matcher),
  };
}
