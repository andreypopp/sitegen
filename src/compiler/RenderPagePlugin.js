/**
 * @copyright 2016-present, Sitegen team
 */

import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import Promise from 'bluebird';
import {evalBundle, assetSource} from './utils';

export default class RenderPagePlugin {

  constructor({inlineCSS}) {
    this.inlineCSS = inlineCSS;
    this.compiler = null;
  }

  apply(compiler) {
    this.compiler = compiler;
    this.compiler.plugin('emit', (compilation, done) => {
      let {route, Meta, Site} = evalBundle(compilation.assets);
      let css = compilation.assets['bundle.css'];

      cleanAssets(compilation.assets);

      function addToAssets(path, markup) {
        compilation.assets[routePathToAssetPath(path)] = createAssetFromContents(markup);
      }

      let tasks = [];
      forEachPath(route, path => {
        this.compiler.debug('rendering path', path);
        tasks.push(
          this.renderPath(route, path, css, Site, Meta).then(
            markup => {
              if (markup) {
                addToAssets(path, markup);
              }
            },
            error => {
              this.compiler.debug('error while rendering path', path);
              throw error;
            })
        );
      });

      Promise.all(tasks).then(
        () => {
          done();
        },
        err => {
          this.compiler.debug('error', err);
          compilation.errors.push(err);
          done(err);
        });
    });
  }

  renderPath(route, path, css, Site, Meta) {
    return new Promise((resolve, reject) => {
      let location = joinPath(this.compiler.options.output.publicPath, path);
      match({routes: route, location}, (error, redirectLocation, routeProps) => {
        if (error) {
          reject(error);
        } else if (!routeProps || redirectLocation) {
          resolve(null);
        } else {
          let innerMarkup = renderToString(<RouterContext {...routeProps} />);
          let meta = Meta.rewind();
          let markup = renderToStaticMarkup(
            <Site
              meta={meta}
              bundle={{
                js: `${this.compiler.options.output.publicPath}bundle.js`,
                css: !this.inlineCSS && `${this.compiler.options.output.publicPath}bundle.css`,
              }}
              style={this.inlineCSS && assetSource(css)}
              content={innerMarkup}
              />
          );
          resolve(markup);
        }
      });
    });
  }
}

function createAssetFromContents(contents) {
  return {
    source() {
      return contents;
    },
    size() {
      return contents.length;
    }
  };
}

function routePathToAssetPath(path) {
  path = path.replace(/^\//, '').replace(/\/$/, '');
  return path + '/index.html';
}

function cleanAssets(assets) {
  Object.keys(assets).forEach(key => delete assets[key]);
}

function normalizePath(href) {
  return href.replace(new RegExp('/+', 'g'),  '/');
}

function joinPath(...segments) {
  return normalizePath(segments.join('/'));
}

export function forEachPath(route, func, trace = ['']) {
  let path = '/' + trace.filter(Boolean).join('/');
  if (route.params) {
    Object.keys(route.params).forEach(key => {
      route.params[key].forEach(value => {
        func(interpolateParams(path, {[key]: value}));
      });
    });
  } else {
    func(path);
  }
  if (route.childRoutes) {
    route.childRoutes.forEach(route =>
      forEachPath(route, func, trace.concat(route.path)));
  }
}

function interpolateParams(path, params) {
  return path.replace(/:([a-zA-Z_\-]+)/g, (_, key) => params[key]);
}
