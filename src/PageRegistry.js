import TransferableRegistry from './TransferableRegistry';

export default class PageRegistry extends TransferableRegistry {

  static key = '__SitegenPageRegistry';

  static createFromRoutes(routes) {
    let storage = {};
    for (let i = 0; i < routes.length; i++) {
      let route = routes[i];
      storage[route.key] = route.meta;
    }
    return new this(storage);
  }
}
