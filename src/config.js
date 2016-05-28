/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

import type {Route} from './routing/Route';

import invariant from 'invariant';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import {sync as resolve} from 'resolve';
import {transform} from 'babel-core';
import {flatten} from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {Minimatch} from 'minimatch';
import {evalAsModule} from './compiler/utils';

const NODE_MODULES_RE = /node_modules/;

const BABEL_PRESET_ES2015 = require.resolve('babel-preset-es2015');
const BABEL_PRESET_STAGE_1 = require.resolve('babel-preset-stage-1');
const BABEL_PRESET_REACT = require.resolve('babel-preset-react');

type WebpackConfig = mixed;
type WebpackLoaderConfig = mixed;

type Plugin = {
  configure: (context: CompilerConfigContext) => CompilerConfigSubset;
};

type SiteConfig = {
  route: Route;
  configure: (context: CompilerConfigContext) => CompilerConfigSubset;
  plugins: Array<Plugin>;
};

type LoaderConfig = {
  [pattern: string]: Loader
};

type BabelConfig = {
  presets?: Array<mixed>;
  plugins?: Array<mixed>;
};

type CompilerConfig = {
  entry: string | Array<string>;
  output: Object;
  context: string;
  loaders: LoaderConfig;
  babel: BabelConfig;
  globalLoaders: LoaderConfig;
  plugins: Array<mixed>;
};

type CompilerConfigSubset = {
  entry?: string | Array<string>;
  output?: Object;
  context?: string;
  loaders?: LoaderConfig;
  babel?: BabelConfig;
  globalLoaders?: LoaderConfig;
  plugins?: Array<mixed>;
};

type CompilerConfigContext = {
  env: {
    development: boolean;
    production: boolean;
    content: boolean;
  }
};

export function defaultConfig({env}: CompilerConfigContext): CompilerConfigSubset {

  let deployCSS = env.development ? injectCSS : extractCSS;

  return {

    devtool: env.development ? 'cheap-module-source-map' : undefined,

    babel: {
      presets: [
        BABEL_PRESET_ES2015,
        BABEL_PRESET_STAGE_1,
        BABEL_PRESET_REACT
      ]
    },

    loaders: {
      '**/*.js': JS,
      '**/*.md': [JS, markdown],
    },

    globalLoaders: {
      '**/*.css': deployCSS(CSS({minimize: env.production})),
      '**/*.png': img,
      '**/*.jpg': img,
      '**/*.jpeg': img,
      '**/*.gif': img,
      '**/*.ico': img,
    },

    plugins: [
      (env.content || env.production) && extractCSSPlugin,
      env.production && new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      }),
    ],
  };
}

export function mergeConfig(...config: Array<CompilerConfigSubset>): CompilerConfigSubset {
  config = config.filter(Boolean);
  invariant(
    config.length > 0,
    'Trying to merge empty list of configurations'
  );
  if (config.length === 1) {
    return config[0];
  } else {
    return config.reduce(mergeConfigImpl);
  }
}

function mergeConfigImpl(
  a: CompilerConfigSubset,
  b: CompilerConfigSubset): CompilerConfigSubset {

  return {
    ...a,
    ...b,
    entry: mergeArray(a.entry, b.entry),
    babel: {
      ...a.babel,
      ...b.babel,
      presets: mergeArray(a.babel && a.babel.presets, b.babel && b.babel.presets),
      plugins: mergeArray(a.babel && a.babel.plugins, b.babel && b.babel.plugins),
    },
    output: {
      ...a.output,
      ...b.output,
    },
    loaders: {
      ...a.loaders,
      ...b.loaders
    },
    globalLoaders: {
      ...a.globalLoaders,
      ...b.globalLoaders
    },
    plugins: mergeArray(a.plugins, b.plugins),
  };
}

function mergeArray<T, S: T | Array<T>>(a?: ?S = null, b?: ?S = null): Array<T> {
  let _a = a || [];
  let _b = b || [];
  return [].concat(_a).concat(_b).filter(item => item);
}

type SingleLoader
  = LoaderConfigurator
  | {loader: string; query?: Object}
  | string

type Loader
  = Array<SingleLoader>
  | SingleLoader;

export function moduleRequest(id: string, ...loaders: Array<Loader>): string {
  loaders.reverse();
  let loader = flatten(loaders);
  return `${normalizeLoader(loader)}!${id}`;
}

type LoaderConfigurator = {
  (query: Object): LoaderConfigurator;
  toLoaderString(): string;
};

export function loader(loader: string): LoaderConfigurator {
  return loaderImpl({loader});
}

function loaderImpl(config: {loader: string, query?: Object}): LoaderConfigurator {
  let mergeQuery = config.mergeQuery || ((a, b) => ({...a, ...b}));
  let configurator = function configurator(query) {
    return loaderImpl({
      ...config,
      query: mergeQuery(config.query, query),
    });
  };
  configurator.config = config;
  configurator.toLoaderString = function toLoaderString() {
    return normalizeLoader(config);
  };
  configurator.toString = configurator.toLoaderString;
  return configurator;
}

function normalizeLoader(element: Loader): string {
  if (Array.isArray(element)) {
    return element.map(normalizeLoader).join('!');
  } else if (typeof element === 'string') {
    return element;
  } else if (element.toLoaderString) {
    return element.toLoaderString();
  } else {
    if (element.query) {
      return element.loader + '?' + JSON.stringify(element.query);
    } else {
      return element.loader;
    }
  }
}

function makePatterMatcher(context, pattern, global) {
  if (!global) {
    pattern = path.join(context, pattern);
  }
  let patterMatcher = new Minimatch(pattern, {dot: true});

  let matcher = filename =>
    (global || NODE_MODULES_RE.exec(filename)) && patterMatcher.match(filename);
  matcher.toString = () => `[PatternMatcher ${pattern}]`;
  matcher.inspect = matcher.toString;

  return matcher;
}

function configureWebpackLoaderList(
  context: string,
  loaders: LoaderConfig,
  global?: boolean): Array<WebpackLoaderConfig> {
  let result = [];
  for (let pattern in loaders) {
    let loader = loaders[pattern];
    result.push({
      loader: normalizeLoader(loader),
      text: makePatterMatcher(context, pattern, global),
    });
  }
  return result;
}

export function configureWebpack({context, loaders, globalLoaders, ...config}: CompilerConfig): WebpackConfig {
  let webpackLoaders = configureWebpackLoaderList(context, loaders);
  let webpackGlobalLoaders = configureWebpackLoaderList(context, globalLoaders, true);
  return {
    ...config,
    context,
    output: {
      ...config.output,
      path: path.resolve(config.context, config.output.path)
    },
    module: {
      loaders: webpackLoaders.concat(webpackGlobalLoaders),
    }
  };
}

function noopConfigure(_ctx): CompilerConfigSubset {
  return {};
}

export function readConfigSync(filename: string): SiteConfig {
  let basedir = path.dirname(filename);
  // $FlowIssue: ...
  let {plugins = [], configure = noopConfigure, route} = requireFile(filename);
  return {
    route,
    configure,
    // $FlowIssue: ...
    plugins: plugins.map(p => requireModule(p, {basedir})),
  };
}

function requireModule(module, {basedir}): mixed {
  let filename = resolve(module, {basedir});
  return requireFile(filename);
}

function requireFile(filename: string): mixed {
  let source = fs.readFileSync(filename, 'utf8');
  source = transform(source, {
    filename,
    presets: [BABEL_PRESET_ES2015, BABEL_PRESET_STAGE_1]
  }).code;
  return evalAsModule(source, filename);
}

export let extractCSSPlugin = new ExtractTextPlugin('bundle.css');

export let JS = loader(require.resolve('babel-loader'));

export let markdown = loader(require.resolve('reactdown/webpack'));

export let url = loader(require.resolve('url-loader'));

export let img = url({limit: 10000});

export let CSS = loader(require.resolve('css-loader'));

export let injectStyleLoader = loader(require.resolve('style-loader'));

export function injectCSS(...loaders: Array<Loader>): Loader {
  let loader = flatten(loaders);
  // $FlowIssue: TODO: Investigate
  return normalizeLoader([injectStyleLoader].concat(loader)).split('!');
}

export function extractCSS(...loaders: Array<Loader>): Loader {
  let loader = flatten(loaders);
  return extractCSSPlugin.extract(
    normalizeLoader(injectStyleLoader),
    normalizeLoader(loader)
  ).split('!');
}
