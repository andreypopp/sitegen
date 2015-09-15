export default class LogProgressPlugin {
  
  constructor(name = 'webpack') {
    this.name = name;
    this._notifyOnCompile = true;
  }

  apply(compiler) {
    compiler.plugin('compile', this._onCompile.bind(this));
    compiler.plugin('invalid', this._onInvalid.bind(this));
    compiler.plugin('done', this._onDone.bind(this));
  }

  _log(message) {
    console.log(`${this.name}: ${message}`);
  }

  _onDone(stats) {
    var time = stats.endTime - stats.startTime;
    this._log('compilation finished (' + time + 'ms)');
  }

  _onCompile() {
    if (this._notifyOnCompile) {
      this._notifyOnCompile = false;
      this._log('compilation started');
    }
  }

  _onInvalid() {
    this._log('bundled invalidated, recompiling...');
  }
}
