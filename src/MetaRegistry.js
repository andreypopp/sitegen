import {create} from './TransferableRegistry';

let registry = create('SitegenMetaRegistry');

export default registry;

export function populateFromRoutes(routes) {
  routes.forEach(route => registry.set(route.key, route.meta));
}
