/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import type {Compiler, AssetCollection} from 'webpack';

import Promise from 'bluebird';

export default class PromiseAssetsPlugin<T> {

  name: string;
  then: (assets: AssetCollection) => T;

  constructor({name, then}: {name: string; then: (assets: AssetCollection) => T}) {
    this.name = name || 'promiseAssets';
    this.then = then || (assets => assets);
  }

  apply(compiler: Compiler) {
    let pending;

    let init = () => {
      pending = Promise.pending();
      compiler[this.name] = pending.promise.then(this.then);
    };

    init();

    compiler.plugin('done', ({compilation}) => {
      pending.resolve(compilation.assets);
    });
    compiler.plugin('invalid', init);
  }
}
