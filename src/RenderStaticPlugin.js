import evaluate                               from 'eval';
import path                                   from 'path';
import createLocation                         from 'history/lib/createLocation';
import React                                  from 'react';
import {match, RoutingContext}                from 'react-router';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Site                                   from './Site';
import {JS_BUNDLE_NAME, CSS_BUNDLE_NAME}      from './createWebpackConfig';

function getChildRoutes(route, callback) {
  if (route.childRoutes) {
    callback(null, childRoutes);
  } else if (route.getChildRoutes) {
    route.getChildRoutes(null, callback);
  } else {
    callback(null, []);
  }
}

export default class RenderStaticPlugin {

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      let source = compilation.assets[JS_BUNDLE_NAME]._source.source();
      let routes = evaluate('module.exports = ' + source, '<bootstrap>', {
        console,
        process,
        setTimeout
      });
      let renderAll = Promise.resolve();

      cleanAssets(compilation.assets);

      getChildRoutes(routes, (error, childRoutes) => {
        if (error) {
          return done(error);
        }
        try {
          childRoutes.forEach(route =>
            renderAll = renderAll.then(() =>
              this.render(routes, route).then(markup => {
                compilation.assets[assetNameFromRoute(route)] = createAssetFromContents(markup)
              }, done)));
        } catch (err) {
          return done(err);
        }
        renderAll.then(() => done(), (err) => done(err));
      });

    });
  }

  render(routes, route) {
    return new Promise((resolve, reject) => {
      let location = createLocation(route.path);
      match({routes, location}, (error, redirectLocation, props) => {
        if (error) {
          reject(error);
        } else {
          let innerMarkup = renderToString(<RoutingContext {...props} />);
          let markup = renderToStaticMarkup(
            <Site jsBundlePath={'/' + JS_BUNDLE_NAME} cssBundlePath={'/' + CSS_BUNDLE_NAME}>
              {innerMarkup}
            </Site>
          );
          resolve(markup);
        }
      })
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

function assetNameFromRoute(route) {
  let path = route.path.replace(/^\//, '').replace(/\/$/, '');
  return path + '/index.html';
}

function cleanAssets(assets) {
  Object.keys(assets).forEach(key => delete assets[key]);
}
