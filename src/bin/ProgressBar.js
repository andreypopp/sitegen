/**
 * Terminal progress bar, based on code found in reactpack.
 *
 * @copyright 2016, Ola Holmström
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import padLeft from 'lodash/padStart';
import padRight from 'lodash/padEnd';
import util from 'util';

import 'colour';

type Theme = {
  complete: string;
  incomplete: string;
};

const THEMES = {
  unicode: {
    complete: '▓',
    incomplete: '░'
  },
  ascii: {
    complete: '#',
    incomplete: '-'
  },
  cp437: {
    complete: '█',
    incomplete: '░'
  }
};

export default class ProgressBar {

  name: string;
  message: string;
  spun: number;
  progress: number;
  theme: Theme;
  _largestMsgWidth: number;

  constructor(name: string, options: {theme?: Theme} = {}) {
    this.name = name;
    this.message = '';
    this.spun = 0;
    this.progress = 0;
    this.theme = options.theme || THEMES.unicode;
    this._largestMsgWidth = 0;
  }

  _columns() {
    // $FlowIssue: add to defs!
    return process.stdout.columns - 1;
  }

  _renderMessage() {
    return util.format('%s', padRight(this.message, this._largestMsgWidth));
  }

  _renderBar() {
    let percentage = this.progress;

    let getProgressWidth = () =>
      this._columns() - this._renderMessage().length;

    let getComplete = percentage =>
      padLeft('', Math.floor(percentage * getProgressWidth()), this.theme.complete);

    let getIncomplete = percentage => {
      let width = getProgressWidth() - Math.floor(percentage * getProgressWidth());
      return padRight('', width, this.theme.incomplete);
    };

    let complete = getComplete(percentage).blue;
    let incomplete = getIncomplete(percentage);

    return complete + incomplete;
  }

  update(message: string, percentage: number) {
    message = this.name + ': ' + message;
    this.message = message.trim() === '' ? this.message : message;
    this._largestMsgWidth = Math.max(message.length, this._largestMsgWidth);
    this.progress = percentage || this.progress;
  }

  render() {
    let bar = this._renderBar(this.progress);
    let message = this._renderMessage();

    return util.format('%s %s', message, bar);
  }

}
