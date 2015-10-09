import evaluate                               from 'eval';
import createLocation                         from 'history/lib/createLocation';
import React                                  from 'react';
import {match, RoutingContext}                from 'react-router';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Site                                   from './Site';
import {JS_BUNDLE_NAME, CSS_BUNDLE_NAME}      from './createWebpackConfig';
import * as RouteUtils                        from './RouteUtils';
import {forEachSeq}                           from './PromiseUtils';
import LinkRegistry                           from './LinkRegistry';
import PageRegistry                           from './PageRegistry';

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

      let collectedRoutes = RouteUtils.collectRoutes(routes);

      collectedRoutes
        .then(childRoutes => {
          let linkRegistry = LinkRegistry.createFromRoutes(childRoutes);
          let pageRegistry = PageRegistry.createFromRoutes(childRoutes);
          linkRegistry.install(scope);
          pageRegistry.install(scope);
          return forEachSeq(childRoutes, route =>
            this.renderPath(routes, route.path, {linkRegistry, pageRegistry})
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

  renderPath(routes, path, siteProps) {
    return new Promise((resolve, reject) => {
      let location = createLocation(path);
      match({routes, location}, (error, redirectLocation, routeProps) => {
        if (error) {
          reject(error);
        } else {
          let innerMarkup = renderToString(<RoutingContext {...routeProps} />);
          let {title, meta, link} = routes.getRenderedMeta();
          let markup = renderToStaticMarkup(
            <Site
              title={title}
              meta={meta}
              link={link}
              jsBundlePath={'/' + JS_BUNDLE_NAME}
              cssBundlePath={'/' + CSS_BUNDLE_NAME}
              {...siteProps}>
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
