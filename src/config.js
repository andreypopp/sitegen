/**
 * @copyright 2016-present, Sitegen team
 */

import fs from 'fs';
import path from 'path';
import {transform} from 'babel-core';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {Minimatch} from 'minimatch';
import {evalAsModule} from './compiler/utils';

const BABEL_PRESET_ES2015 = require.resolve('babel-preset-es2015');
const BABEL_PRESET_STAGE_1 = require.resolve('babel-preset-stage-1');
const BABEL_PRESET_REACT = require.resolve('babel-preset-react');

export function configureLoader(element) {
  if (Array.isArray(element)) {
    return element.map(configureLoader).join('!');
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

export function createRequest(id, ...loader) {
  loader.reverse();
  return `${configureLoader(loader)}!${id}`;
}

export function loaderConfigurator(config) {
  let mergeQuery = config.mergeQuery || ((a, b) => ({...a, ...b}));
  let configurator = function configurator(query) {
    return loaderConfigurator({
      ...config,
      query: mergeQuery(config.query, query),
    });
  };
  configurator.config = config;
  configurator.toLoaderString = function toLoaderString() {
    return configureLoader(config);
  };
  configurator.toString = configurator.toLoaderString;
  return configurator;
}

export let extractCSSPlugin = new ExtractTextPlugin('bundle.css');

export let JS = loaderConfigurator({
  loader: require.resolve('babel-loader')
});

export let markdown = require.resolve('reactdown/webpack');

export let url = loaderConfigurator({
  loader: require.resolve('url-loader')
});

export let img = url({limit: 10000});

export let CSS = loaderConfigurator({
  loader: require.resolve('css-loader'),
});

export let CSSModule = CSS({modules: true});

export let ReactCSSComponent = loaderConfigurator({
  loader: require.resolve('react-css-components/webpack')
});

export let injectStyleLoader = require.resolve('style-loader');

export let injectCSS = (...loader) =>
  [injectStyleLoader].concat(configureLoader(loader));

export let extractCSS = (...loader) =>
  extractCSSPlugin.extract(injectStyleLoader, configureLoader(loader)).split('!');


export function defaultConfig({env}) {

  let development = env === 'development';
  let production = env === 'production';
  let content = env === 'content';

  let deployCSS = development ? injectCSS : extractCSS;

  return {

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
      '**/*.rcss': [JS, ReactCSSComponent({loadCSS: deployCSS(CSSModule)})],
      '**/*.png': img,
      '**/*.jpg': img,
      '**/*.jpeg': img,
      '**/*.gif': img,
      '**/*.ico': img,
    },

    plugins: [
      (content || production) && new ExtractTextPlugin('bundle.css'),
    ],
  };
}

function mergeArray(a, b) {
  return [].concat(a).concat(b).filter(Boolean);
}

export function mergeConfig(a, b) {
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
    loader: configureLoader(loader),
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
  globalLoaders = configureWebpackLoaderList(context, globalLoaders, {global: true});
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
