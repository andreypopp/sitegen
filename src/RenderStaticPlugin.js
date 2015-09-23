import evaluate                               from 'eval';
import createLocation                         from 'history/lib/createLocation';
import React                                  from 'react';
import {match, RoutingContext}                from 'react-router';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Site                                   from './Site';
import {JS_BUNDLE_NAME, CSS_BUNDLE_NAME}      from './createWebpackConfig';
import * as RouteUtils                        from './RouteUtils';
import {mapSequential}                        from './PromiseUtils';
import * as LinkRegistry                      from './LinkRegistry';

export default class RenderStaticPlugin {

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      let source = compilation.assets[JS_BUNDLE_NAME]._source.source();
      let window = {
        SitegenLinkRegistry: {}
      };
      let scope = {
        console,
        process,
        setTimeout,
        window
      };
      let routes = evaluate('module.exports = ' + source, '<bootstrap>', scope);

      cleanAssets(compilation.assets);

      function addToAssets(path, markup) {
        compilation.assets[routePathToAssetPath(path)] = createAssetFromContents(markup);
      }

      function populateLinkRegistry(registry) {
        for (let key in registry) {
          if (registry.hasOwnProperty(key)) {
            window.SitegenLinkRegistry[key] = registry[key];
          }
        }
      }

      let collectedRoutes = RouteUtils.collectRoutes(routes);

      collectedRoutes
        .then(childRoutes => {
          let linkRegistry = LinkRegistry.routesToRegistry(childRoutes);
          populateLinkRegistry(linkRegistry);
          return mapSequential(childRoutes, route =>
            this.renderPath(routes, linkRegistry, route.path)
              .then(addToAssets.bind(null, route.path)));
        })
        .then(
          () => {
            done();
          },
          err => {
            done(err);
          });
    });
  }

  renderPath(routes, linkRegistry, path) {
    return new Promise((resolve, reject) => {
      let location = createLocation(path);
      match({routes, location}, (error, redirectLocation, props) => {
        if (error) {
          reject(error);
        } else {
          let innerMarkup = renderToString(<RoutingContext {...props} />);
          let markup = renderToStaticMarkup(
            <Site
              jsBundlePath={'/' + JS_BUNDLE_NAME}
              cssBundlePath={'/' + CSS_BUNDLE_NAME}
              linkRegistry={linkRegistry}>
              {innerMarkup}
            </Site>
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
