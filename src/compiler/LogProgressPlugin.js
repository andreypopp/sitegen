/**
 * @copyright 2016-present, Sitegen team
 */

import createLogger from 'debug';

export default class LogProgressPlugin {

  constructor(name = 'webpack') {
    this.name = name;
    this.debug = createLogger(`sitegen:compile:${name}`);
    this._notifyOnCompile = true;
  }

  apply(compiler) {
    compiler.debug = this.debug;
    compiler.plugin('compile', this._onCompile.bind(this));
    compiler.plugin('invalid', this._onInvalid.bind(this));
    compiler.plugin('done', this._onDone.bind(this));
  }

  _onDone(stats) {
    if (stats.compilation.errors.length > 0) {
      this.debug('compilation failed');
      stats.compilation.errors.forEach(error => this.debug(error.message));
    } else {
      this.debug('compilation finished');
    }
  }

  _onCompile() {
    if (this._notifyOnCompile) {
      this._notifyOnCompile = false;
      this.debug('compilation started');
    }
  }

  _onInvalid() {
    this.debug('bundled invalidated, recompiling...');
  }
}

