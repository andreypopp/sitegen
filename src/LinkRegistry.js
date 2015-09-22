import invariant from 'invariant';

let _REGISTRY = null;

if (typeof window !== 'undefined' && window.SitegenLinkRegistry) {
  _REGISTRY = window.SitegenLinkRegistry;
}

export function getLink(resource) {
  return _REGISTRY ? _REGISTRY[resource] : undefined;
}

export function isInitialized() {
  return _REGISTRY !== null;
}

export function initialize(routes) {
  let registry = {};
  for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    if (route.key) {
      registry[route.key] = route.path;
    }
  }
  invariant(
    _REGISTRY === null,
    'LinkRegistry already initialized'
  );
  _REGISTRY = registry;
}
