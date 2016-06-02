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
    if (stats.compilation.errors.length > 0) {
      this.debug('compilation failed');
      stats.compilation.errors.forEach(error => {
			  if(error.details) {
          this.debug(error.details);
        }
        this.debug(error.message)
      });
    } else {
      if(stats.compilation.warnings.length > 0) {
        stats.compilation.warnings.forEach(error => this.debug(error.message));
      }

      process.stdout.write(stats.toString({colors:true}) + "\n");
      
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
