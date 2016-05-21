/**
 * @copyright 2016-present, Sitegen team
 */

import Promise from 'bluebird';

export default class PromiseAssetsPlugin {

  constructor({name, then}) {
    this.name = name || 'promiseAssets';
    this.then = then || (assets => assets);
  }

  apply(compiler) {
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
