/**
 * @copyright 2016-present, Sitegen team
 */

import fs from 'fs';
import path from 'path';
import commander from 'commander';

export function parse(configure = p => p, args = process.argv) {
  args = configure(commander)
    .parse(args);

  let [entry] = args.args;

  if (!fs.existsSync(entry)) {
    error('site entry does not exist');
  }

  if (fs.statSync(entry)) {
    entry = path.join(process.cwd(), entry, 'sitegen.config.js');
  }

  if (!fs.existsSync(entry)) {
    error('site entry does not exist');
  }

  args.args = [entry];
  return args;
}

export function error(error, code = 1) {
  let message = error.details || error.stack || error;
  console.error('Error:', message);
  if (code != null) {
    process.exit(code);
  }
}

export function log(message) {
  console.log(message);
}
