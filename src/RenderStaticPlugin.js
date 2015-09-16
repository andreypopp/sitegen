import evaluate                               from 'eval';
import path                                   from 'path';
import createLocation                         from 'history/lib/createLocation';
import React                                  from 'react';
import {match, RoutingContext}                from 'react-router';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import Site                                   from './Site';

export default class RenderStaticPlugin {

  apply(compiler) {
    compiler.plugin('emit', (compilation, done) => {
      let source = compilation.assets['_bootstrap.js']._source.source();
      let routes = evaluate('module.exports = ' + source, '<bootstrap>', {console: console, process: process});
      let renderAll = Promise.resolve();

      cleanAssets(compilation.assets);

      routes.childRoutes.forEach(route =>
        renderAll = renderAll.then(() =>
          this.render(routes, route).then(markup => {
            compilation.assets[assetNameFromRoute(route)] = createAssetFromContents(markup)
          }, done)));

      renderAll.then(
        () => {
          done()
        },
        (err) => {
          throw err
        }
      );
    });
  }

  generateAsset(routes, route) {
  }

  render(routes, route) {
    return new Promise((resolve, reject) => {
      let location = createLocation(route.path);
      match({routes: routes.childRoutes, location}, (error, redirectLocation, props) => {
        if (error) {
          reject(error);
        } else {
          let Component = routes.component || Site;
          let innerMarkup = renderToString(<RoutingContext {...props} />);
          let markup = renderToStaticMarkup(<Component>{innerMarkup}</Component>);
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
