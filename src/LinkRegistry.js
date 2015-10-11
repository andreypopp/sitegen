import TransferableRegistry from './TransferableRegistry';

export default class LinkRegistry extends TransferableRegistry {

  static key = '__SitegenLinkRegistry';

  static createFromRoutes(routes) {
    let storage = {};
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      if (route.key) {
        storage[route.key] = route.path;
      }
    }
    return new this(storage);
  }
}
