/**
 * @copyright 2016-present, Sitegen team
 */

import path from 'path';
import evaluate from 'eval';
import resolve from 'resolve';

export function evalBundle(assets) {
  let source = assetSource(assets['bundle.js']);
  return evalAsModule('module.exports = ' + source, '<boot>', {require});
}

export function evalAsModule(source, filename, scope) {
  let dirname = path.dirname(filename);
  scope = {
    console,
    process,
    require(module) {
      return require(resolve.sync(module, {basedir: dirname}));
    },
    setTimeout,
    __filename: filename,
    __dirname: dirname,
    ...scope,
  };
  return evaluate(source, filename, scope);
}

export function assetSource(asset) {
  if (!asset) {
    return null;
  }
  return  asset._source
    ? asset._source.source()
    : asset.source();
}
