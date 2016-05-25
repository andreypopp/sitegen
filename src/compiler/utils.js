/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import type {AssetCollection, Asset} from 'webpack';

import path from 'path';
import evaluate from 'eval';
import {sync as resolve} from 'resolve';

export function evalBundle(assets: AssetCollection): ?mixed {
  let source = assetSource(assets['bundle.js']);
  if (source == null) {
    return {};
  } else {
    return evalAsModule('module.exports = ' + source, '<boot>', {require});
  }
}

export function evalAsModule(source: string, filename: string, scope?: Object): mixed {
  let dirname = path.dirname(filename);
  function localResolve(module) {
    return resolve(module, {basedir: dirname});
  }
  function localRequire(module) {
    // $FlowIssue: ...
    return require(localResolve(module));
  }
  localRequire.resolve = localResolve;
  scope = {
    console,
    process,
    require: localRequire,
    setTimeout,
    __filename: filename,
    __dirname: dirname,
    ...scope,
  };
  return evaluate(source, filename, scope);
}

export function assetSource(asset: Asset): ?string {
  if (!asset) {
    return null;
  }
  return  asset._source
    ? asset._source.source()
    : asset.source();
}
