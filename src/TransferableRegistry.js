import invariant from 'invariant';
import React from 'react';

export function create(symbol) {

  let _registry = null;

  if (typeof window !== 'undefined' && window[symbol]) {
    _registry = window[symbol];
  }

  return {

    symbol,

    update(registry) {
      _registry = registry;
    },

    get(key) {
      return _registry ? _registry[key] : undefined;
    },

    set(key, value) {
      if (_registry === null) {
        _registry = {};
      }
      _registry[key] = value;
    },

    get isInitialized() {
      return _registry !== null;
    },

    Render({registry}) {
      if (!registry) {
        return <noscript />;
      } else {
        let __html = `var ${symbol} = ${JSON.stringify(registry)};`;
        return <script dangerouslySetInnerHTML={{__html}} />;
      }
    },

    toJSON() {
      return _registry;
    },
  };
}
