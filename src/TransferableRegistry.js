import invariant from 'invariant';
import React from 'react';

/**
 * `TransferableRegistry` provides ES2015 Map-like abstraction which can be
 * transfered across different scopes and realms.
 */
export default class TransferableRegistry {

  /**
   * Unique global key for a transferable registry instance.
   *
   * This should be set by subclasses.
   */
  static key = null;

  /**
   * Check if registry is installed in the `scope`.
   */
  static installed(scope = window) {
    return scope[this.key] !== undefined;
  }

  /**
   * Resolve installed registry in the `scope`.
   *
   * This fails if no registry is installed in the `scope`.
   */
  static resolve(scope = window) {
    invariant(
      scope[this.key] !== undefined,
      'Cannot resolve a registry with key "%s", it is undefined',
      this.key
    );
    let registry = scope[this.key];
    // This is a cross realm check...
    if (registry.constructor && registry.constructor.name !== this.name) {
      registry = new this(registry);
    }
    return registry;
  }

  constructor(storage = null) {
    this._storage = storage || {};
    this.initialized = storage !== null;
  }

  /**
   * Install registry instance into the `scope` so that it could be resolved
   * later.
   */
  install(scope = window) {
    invariant(
      scope[this.constructor.key] === undefined,
      'Cannot install a registry as key "%s" is already allocated in the scope',
      this.constructor.key
    );
    scope[this.constructor.key] = this._storage;
  }

  /**
   * Size of the registry.
   *
   * See ES2015 Map interface for details.
   */
  get size() {
    return Object.keys(this._storage).length;
  }

  /**
   * Clear registry.
   *
   * See ES2015 Map interface for details.
   */
  clear() {
    this._storage = {};
  }

  /**
   * Delete key from the registry.
   *
   * See ES2015 Map interface for details.
   */
  delete(key) {
    delete this._storage[key];
  }

  /**
   * Returns an iterator of k-v pairs.
   *
   * See ES2015 Map interface for details.
   */
  entries() {
    return Object.keys(this._storage).map(key =>
      [key, this._storage[key]]).values();
  }

  /**
   * Returns an iterator of keys.
   *
   * See ES2015 Map interface for details.
   */
  keys() {
    return Object.keys(this._storage).values();
  }

  /**
   * Returns an iterator of values.
   *
   * See ES2015 Map interface for details.
   */
  values() {
    return Object.keys(this._storage).map(key =>
      this._storage[key]).values();
  }

  /**
   * Call a `func` for each k-v pair in registry.
   *
   * See ES2015 Map interface for details.
   */
  forEach(func, context) {
    Object.keys(this._storage).forEach(key =>
      func.call(context, this._storage[key], key));
  }

  /**
   * Get a value by `key`.
   *
   * See ES2015 Map interface for details.
   */
  get(key) {
    return this._storage[key];
  }

  /**
   * Check if registry has a value for `key`.
   *
   * See ES2015 Map interface for details.
   */
  has(key) {
    return key in this._storage;
  }

  /**
   * Check if registry has a value for `key`.
   *
   * See ES2015 Map interface for details.
   */
  set(key, value) {
    this._storage[key] = value;
  }

  /**
   * Get JSON serializable representation of registry.
   */
  toJSON() {
    return this._storage;
  }
}

/**
  * React component to render a registry instance into a `<script />` element
  * from which the registry could be bootstrapped again.
  */
function RenderRegistry(key, {registry}) {
  if (!registry) {
    return <noscript />;
  } else {
    let __html = `window[${JSON.stringify(key)}] = ${JSON.stringify(registry)};`;
    return <script dangerouslySetInnerHTML={{__html}} />;
  }
}

Object.defineProperty(TransferableRegistry, 'Render', {
  configurable: true,
  get() {
    let value = RenderRegistry.bind(null, this.key);
    Object.defineProperty(this, 'Render', {value});
    return value;
  }
});
