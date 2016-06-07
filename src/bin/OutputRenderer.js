/**
 * @copyright 2016-present, Sitegen team
 */

import fs from 'fs';
import logUpdate from 'log-update';
import onetime from 'onetime';
import exitHook from 'exit-hook';

const NEWLINE = '\n';

let installExitHook = onetime(() =>
  exitHook(() => OutputRenderer.done()));

let OutputRenderer = {

  stdout: [],
  stderr: [],

  _stdoutWrite: process.stdout.write,
  _stderrWrite: process.stderr.write,
  _consoleLog: console.log, // eslint-disable-line no-console
  _consoleWarning: console.warning, // eslint-disable-line no-console
  _consoleError: console.error, // eslint-disable-line no-console
  _consoleDebug: console.debug, // eslint-disable-line no-console

  get hasBuffer() {
    return this.stdout.length || this.stderr.length;
  },

  manage() {
    process.stdout.write = msg => this.stdout.push(msg);
    process.stderr.write = msg => this.stderr.push(msg);
    console.log = msg => this.stdout.push(msg + NEWLINE); // eslint-disable-line no-console
    console.warning = msg => this.stderr.push(msg + NEWLINE); // eslint-disable-line no-console
    console.error = msg => this.stderr.push(msg + NEWLINE); // eslint-disable-line no-console
    console.debug = msg => this.stderr.push(msg + NEWLINE); // eslint-disable-line no-console
    installExitHook();
  },

  release() {
    process.stdout.write = this._stdoutWrite;
    process.stderr.write = this._stderrWrite;
    console.log = this._consoleLog; // eslint-disable-line no-console
    console.warning = this._consoleWarning; // eslint-disable-line no-console
    console.error = this._consoleError; // eslint-disable-line no-console
    console.debug = this._consoleDebug; // eslint-disable-line no-console
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
