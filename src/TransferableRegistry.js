import invariant from 'invariant';
import React from 'react';

export default class TransferableRegistry {

  static key = null;

  static Render({registry}) {
    if (!registry) {
      return <noscript />;
    } else {
      let __html = `window[${JSON.stringify(this.key)}] = ${JSON.stringify(registry)};`;
      return <script dangerouslySetInnerHTML={{__html}} />;
    }
  }

  static installed(scope = global) {
    return scope[this.key] !== undefined;
  }

  static resolve(scope = global) {
    invariant(
      scope[this.key] !== undefined,
      'Cannot resolve a registry with key "%s", it is undefined',
      this.key
    );
    let registry = scope[this.key];
    if (!(registry instanceof this)) {
      registry = new this(registry);
    }
    return registry;
  }

  constructor(storage = null) {
    this._storage = storage || {};
    this.initialized = storage !== null;
  }

  install(scope = global) {
    invariant(
      scope[this.constructor.key] === undefined,
      'Cannot install a registry as key "%s" is already allocated in the scope',
      this.constructor.key
    );
    scope[this.constructor.key] = this;
  }

  get size() {
    return Object.keys(this._storage).length;
  }

  clear() {
    this._storage = {};
  }

  delete(key) {
    delete this._storage[key];
  }

  entries() {
    return Object.keys(this._storage).map(key => [key, this._storage[key]]);
  }

  keys() {
    return Object.keys(this._storage);
  }

  values() {
    return Object.keys(this._storage).map(key => this._storage[key]);
  }

  forEach(func, context) {
    Object.keys(this._storage).forEach(key =>
      func.call(context, this._storage[key], key));
  }

  get(key) {
    return this._storage[key];
  }

  has(key) {
    return key in this._storage;
  }

  update(items) {
    this._storage = {...this._storage, ...items};
  }

  set(key, value) {
    this._storage[key] = value;
  }

  toJSON() {
    return this._storage;
  }
}
