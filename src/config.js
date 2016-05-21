/**
 * @copyright 2016-present, Sitegen team
 */

import invariant from 'invariant';
import fs from 'fs';
import path from 'path';
import {transform} from 'babel-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {Minimatch} from 'minimatch';
import {evalAsModule} from './compiler/utils';

const BABEL_PRESET_ES2015 = require.resolve('babel-preset-es2015');
const BABEL_PRESET_STAGE_1 = require.resolve('babel-preset-stage-1');
const BABEL_PRESET_REACT = require.resolve('babel-preset-react');

export function defaultConfig({env}) {

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
      '**/*.css': deployCSS(CSS),
      '**/*.mcss': deployCSS(CSSModule),
      '**/*.rcss': [JS, CSSComponent({loadCSS: deployCSS(CSSModule)})],
      '**/*.png': img,
      '**/*.jpg': img,
      '**/*.jpeg': img,
      '**/*.gif': img,
      '**/*.ico': img,
    },

    plugins: [
      (env.content || env.production) && extractCSSPlugin,
    ],
  };
}

export function mergeConfig(...config) {
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

function mergeArray(a, b) {
  return [].concat(a).concat(b).filter(Boolean);
}

function mergeConfigImpl(a, b) {
  return {
    ...a,
    ...b,
    entry: mergeArray(a.entry, b.entry),
    babel: {
      ...a.babel,
      ...b.babel,
      presets: mergeArray(a.presets, b.presets),
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

export function moduleRequest(id, ...loader) {
  loader.reverse();
  return `${normalizeLoader(loader)}!${id}`;
}

export function loader(loader) {
  return loaderImpl({loader});
}

function loaderImpl(config) {
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

function normalizeLoader(element) {
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

function makePatterMatcher(pattern) {
  let patterMatcher = new Minimatch(pattern);

  let matcher = filename => patterMatcher.match(filename);
  matcher.toString = () => `[PatternMatcher ${pattern}]`;
  matcher.inspect = matcher.toString;

  return matcher;
}

function configureWebpackLoader(context, pattern, loader, global) {
  if (!global) {
    pattern = path.join(context, pattern);
  }
  let test = makePatterMatcher(pattern);
  return {
    loader: normalizeLoader(loader),
    test,
  };
}

function configureWebpackLoaderList(context, loaders, global) {
  let result = [];
  for (let pattern in loaders) {
    let loader = loaders[pattern];
    result.push(configureWebpackLoader(context, pattern, loader, global));
  }
  return result;
}

export function configureWebpack({context, loaders, globalLoaders, ...config}) {
  loaders = configureWebpackLoaderList(context, loaders);
  globalLoaders = configureWebpackLoaderList(context, globalLoaders, true);
  return {
    ...config,
    context,
    output: {
      ...config.output,
      path: path.resolve(config.context, config.output.path)
    },
    module: {
      loaders: loaders.concat(globalLoaders),
    }
  };
}

export function readConfigSync(filename) {
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

export let CSSModule = CSS({modules: true});

export let CSSComponent = loader(require.resolve('react-css-components/webpack'));

export let injectStyleLoader = loader(require.resolve('style-loader'));

export let injectCSS = (...loader) =>
  normalizeLoader([injectStyleLoader].concat(loader)).split('!');

export let extractCSS = (...loader) =>
  extractCSSPlugin.extract(
    normalizeLoader(injectStyleLoader),
    normalizeLoader(loader)
  ).split('!');
