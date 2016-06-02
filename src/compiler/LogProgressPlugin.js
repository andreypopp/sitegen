/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import type {Logger} from 'debug';
import type {Compiler, Stats} from 'webpack';

import createLogger from 'debug';

export default class LogProgressPlugin {

  name: string;
  debug: Logger;
  _notifyOnCompile: boolean;

  constructor(name: string = 'webpack') {
    this.name = name;
    this.debug = createLogger(`sitegen:compile:${name}`);
    this._notifyOnCompile = true;
  }

  apply(compiler: Compiler) {
    compiler.debug = this.debug;
    compiler.plugin('compile', this._onCompile.bind(this));
    compiler.plugin('invalid', this._onInvalid.bind(this));
    compiler.plugin('done', this._onDone.bind(this));
  }

  _onDone(stats: Stats) {
    let info = stats.toJson();
    if (info.errors.length > 0) {
      this.debug('compilation failed');
      info.errors.forEach(this._logError, this);
    }

    if (info.warnings.length > 0) {
      info.warnings.forEach(this._logError, this);
    }

    this.debug('compilation finished');
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

  _logError(error: string) {
    this.debug('ERROR in ' + error);
  }
}
