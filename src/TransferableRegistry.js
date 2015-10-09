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
   * React component to render a registry instance into a `<script />` element
   * from which the registry could be bootstrapped again.
   */
  static Render({registry}) {
    if (!registry) {
      return <noscript />;
    } else {
      let __html = `window[${JSON.stringify(this.key)}] = ${JSON.stringify(registry)};`;
      return <script dangerouslySetInnerHTML={{__html}} />;
    }
  }

  /**
   * Check if registry is installed in the `scope`.
   */
  static installed(scope = global) {
    return scope[this.key] !== undefined;
  }

  /**
   * Resolve installed registry in the `scope`.
   *
   * This fails if no registry is installed in the `scope`.
   */
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

  /**
   * Install registry instance into the `scope` so that it could be resolved
   * later.
   */
  install(scope = global) {
    invariant(
      scope[this.constructor.key] === undefined,
      'Cannot install a registry as key "%s" is already allocated in the scope',
      this.constructor.key
    );
    scope[this.constructor.key] = this;
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
