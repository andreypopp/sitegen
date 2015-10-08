import invariant from 'invariant';
import React from 'react';

const PAYLOAD_SYMBOL = 'SitegenLinkRegistry';

let _REGISTRY = null;

if (typeof window !== 'undefined' && window[PAYLOAD_SYMBOL]) {
  _REGISTRY = window[PAYLOAD_SYMBOL];
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
  let __html = `var ${PAYLOAD_SYMBOL} = ${JSON.stringify(linkRegistry)};`;
  return <script dangerouslySetInnerHTML={{__html}} />;
}
