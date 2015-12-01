import createLogger from 'debug';

export default class LogProgressPlugin {

  constructor(name = 'webpack') {
    this.name = name;
    this._logger = createLogger(`sitegen:compiler:${name}`);
    this._notifyOnCompile = true;
  }

  apply(compiler) {
    compiler.plugin('compile', this._onCompile.bind(this));
    compiler.plugin('invalid', this._onInvalid.bind(this));
    compiler.plugin('done', this._onDone.bind(this));
  }

  _onDone(stats) {
    if (stats.compilation.errors.length > 0) {
      this._logger('compilation failed');
      stats.compilation.errors.forEach(error => this._logger(error.message));
    } else {
      this._logger('compilation finished');
    }
  }

  _onCompile() {
    if (this._notifyOnCompile) {
      this._notifyOnCompile = false;
      this._logger('compilation started');
    }
  }

  _onInvalid() {
    this._logger('bundled invalidated, recompiling...');
  }
}
