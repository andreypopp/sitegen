/**
 * @copyright 2016-present, Sitegen team
 */

import fs from 'fs';
import logUpdate from 'log-update';

let OutputRenderer = {

  stdout: [],
  stderr: [],

  _stdoutWrite: process.stdout.write,
  _stderrWrite: process.stderr.write,
  _consoleLog: console.log,
  _consoleWarning: console.warning,
  _consoleError: console.error,
  _consoleDebug: console.debug,

  get hasBuffer() {
    return this.stdout.length || this.stderr.length;
  },

  manage() {
    process.stdout.write = msg => this.stdout.push(msg);
    process.stderr.write = msg => this.stderr.push(msg);
    console.log = msg => this.stdout.push(msg + NEWLINE);
    console.warning = msg => this.stderr.push(msg + NEWLINE);
    console.error = msg => this.stderr.push(msg + NEWLINE);
    console.debug = msg => this.stderr.push(msg + NEWLINE);
  },

  release() {
    process.stdout.write = this._stdoutWrite;
    process.stderr.write = this._stderrWrite;
    console.log = this._consoleLog;
    console.warning = this._consoleWarning;
    console.error = this._consoleError;
    console.debug = this._consoleDebug;
  },

  flush() {
    if (this.hasBuffer) {
      updateScreen.clear();
    }
    this._flush();
  },

  _flush() {
    if (this.stdout.length > 0) {
      writeSync(1, this.stdout.join(''), true);
      this.stdout = [];
    }
    if (this.stderr.length > 0) {
      writeSync(2, this.stderr.join(''), true);
      this.stderr = [];
    }
  },

  render(content) {
    updateScreen(content);
  },

  done() {
    this.flush();
    updateScreen.clear();
    updateScreen.done();
    this.release();
  },
};

export function writeSync(fd, msg, flush) {
  fs.writeSync(fd, msg);
  if (flush) {
    fs.fsyncSync(fd);
  }
}

let updateScreen  = logUpdate.create({
  write(msg) {
    writeSync(1, msg, false);
  }
});


export default OutputRenderer;
