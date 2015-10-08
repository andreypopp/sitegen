import invariant from 'invariant';
import React from 'react';

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

export function routesToRegistry(routes) {
  let registry = {};
  for (let i = 0; i < routes.length; i++) {
    let route = routes[i];
    if (route.key) {
      registry[route.key] = route.path;
    }
  }
  return registry;
}

export function initialize(routes) {
  invariant(
    _REGISTRY === null,
    'LinkRegistry already initialized'
  );
  _REGISTRY = routesToRegistry(routes);
}

export function LinkRegistryPayload({linkRegistry}) {
  if (!linkRegistry) {
    return <noscript />;
  }
  let __html = `var SitegenLinkRegistry = ${JSON.stringify(linkRegistry)};`;
  return <script dangerouslySetInnerHTML={{__html}} />;
}
