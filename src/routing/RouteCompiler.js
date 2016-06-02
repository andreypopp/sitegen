/**
 * @copyright 2016-present, Sitegen team
 * @flow
 */

type JSAST = mixed;

type PromisidiedFS = {
  readdirAsync: (directory: string) => Promise<Array<string>>;
  statAsync: (filename: string) => {
    isDirectory: () => boolean;
  };
};

import type {Route} from './Route';
import {relative, join, extname} from 'path';
import invariant from 'invariant';
import {promisifyAll} from 'bluebird';
import {expr} from 'babel-plugin-ast-literal/api';
import {chunk, flatten} from 'lodash';

import {moduleRequest} from '../config';
import {PageRoute, CollectionRoute, AssetRoute} from './Route';

const META_LOADER = require.resolve('../loader/meta');
const CHUNK_LOADER = require.resolve('../loader/chunk');
const REACT_HOT_LOADER = require.resolve('react-hot-loader/webpack');

type Options = {
  fs: PromisidiedFS;
  split: boolean;
  publicPath: string;
};

export default class RouteCompiler {

  fs: PromisidiedFS;
  split: boolean;
  publicPath: string;

  constructor({fs, split, publicPath}: Options) {
    promisifyAll(fs);
    this.fs = fs;
    this.split = split;
    this.publicPath = publicPath;
  }

  render(route: Route): JSAST {
    return this._render(route, this.publicPath, ['']);
  }

  _render(
    route: Route,
    path: ?string,
    trace: Array<string>): Promise<mixed> {

    if (route instanceof PageRoute) {
      return this._renderPageRoute(route, path, trace);
    } else if (route instanceof CollectionRoute) {
      return this._renderCollectionRoute(route, path, trace);
    } else if (route instanceof AssetRoute) {
      return this._renderAssetRoute(route, path, trace);
    } else {
      invariant(
        false,
        'Unknown route: %s', route
      );
    }
  }

  async _renderPageRoute(
    route: PageRoute,
    path: ?string,
    trace: Array<string>) {

    let indexRoute;
    let childRoutes = [];

    for (let key in route.routes) {
      if (key === 'index') {
        indexRoute = await this._render(route.routes[key], null, trace);
      } else {
        let childRoute = await this._render(route.routes[key], key, trace.concat(key));
        childRoutes.push(childRoute);
      }
    }

    let getComponent = renderGetComponent(route.component, {
      split: this.split !== undefined ? this.split : route.options.split,
      chunkName: trace.join('/'),
    });

    return renderRouteSpec({
      path,
      getComponent,
      indexRoute,
      childRoutes
    });
  }

  async _renderCollectionRoute(
    route: CollectionRoute,
    path: ?string,
    trace: Array<string>): Promise<JSAST> {

    let {collection: {context, match}, options: {paginate}} = route;

    let chunkName = trace.join('/');
    let name = chunkName;

    let items = await walkDirectory(this.fs, context);
    items = items.filter(filename => match(filename));
    items = items.map(filename => ({
      filename,
      path: stripExtension(relative(context, filename))
    }));

    let chunks = [items];

    if (paginate) {
      chunks = chunk(items, paginate.size);
    }

    chunks = chunks.map((chunk, idx) => renderGetCollectionChunk(chunk, {
      page: route.component,
      chunkNumber: idx,
      chunkCount: chunks.length,
      loader: META_LOADER,
      chunkName: trace.concat('@page', idx + 1).join('/'),
      split: this.split !== undefined ? this.split : true,
    }));

    let childRoutes = items.map(item => renderRouteSpec({
      path: item.path,
      getComponent: renderGetComponent(item.filename, {
        split: this.split !== undefined ? this.split : true,
        chunkName: trace.concat(item.path).join('/'),
      }),
    }));

    let getComponent = expr`function getComponent(nextState, cb) {
      var pageNumber = parseInt(nextState.params.page || 1, 10);
      var chunkList = ${chunks};
      var getCollectionChunk = chunkList[pageNumber - 1];
      getCollectionChunk(nextState, cb);
    }`;

    childRoutes = childRoutes.concat(renderRouteSpec({
      path: '@page/:page',
      name,
      params: expr`{page: ${chunks.map((_, idx) => idx + 1)}}`,
    }));

    return renderRouteSpec({
      path,
      getComponent,
      childRoutes,
      name,
    });
  }

  async _renderAssetRoute(
    _route: Route,
    _path: ?string,
    _trace: Array<string>): Promise<JSAST> {

    return expr`ok`;
  }
}

type RouteSpec = {
  path: ?string;
  getComponent?: JSAST;
  indexRoute?: JSAST;
  childRoutes?: Array<JSAST>;
  name?: string;
  params?: JSAST;
};

/**
 * Render React Router route spec.
 */
function renderRouteSpec(spec: RouteSpec): JSAST {
  let {path, getComponent, indexRoute, childRoutes, name, params} = spec;

  return expr`{
    path: ${path},
    getComponent: ${getComponent},
    indexRoute: ${indexRoute},
    childRoutes: ${childRoutes || []},
    name: ${name},
    params: ${params},
  }`;
}

/**
 * Render component loader to load component from a given module.
 */
function renderGetComponent(
  req: string,
  options: {split?: boolean; chunkName?: string}): JSAST {

  options = {
    split: false,
    chunkName: 'component',
    ...options,
  };

  if (options.split) {
    return expr`
      function getComponentAsync(_nextState, cb) {
        require.ensure([], function(require) {
          cb(null, require(${req}).default);
        }, ${options.chunkName});
      }
    `;
  } else {
    return expr`
      function getComponentSync(_nextState, cb) {
        cb(null, require("${req}").default);
      }
    `;
  }
}

type ChunkSpec = {
  filename: string;
  path: string;
};

/**
 * Render a fetcher for a collection chunk.
 */
function renderGetCollectionChunk(
  chunk: Array<ChunkSpec>,
  options: {loader?: string; chunkName?: string; split?: boolean}): JSAST {

  options = {
    loader: META_LOADER,
    chunkName: 'collectionPage',
    split: false,
    ...options,
  };

  let query = {
    chunk,
    loader: options.loader,
    chunkNumber: options.chunkNumber,
    chunkCount: options.chunkCount,
  };

  let req = moduleRequest(
    options.page,
    {loader: CHUNK_LOADER, query},
    // TODO: we don't really want to leak configuration here, think of a better
    // way to inject this
    REACT_HOT_LOADER
  );
  return renderGetComponent(req, {
    split: options.split,
    chunkName: options.chunkName,
  });
}

async function walkDirectory(
  fs: PromisidiedFS,
  directory: string): Promise<Array<string>> {

  let files = await fs.readdirAsync(directory).then(segments =>
    Promise.all(segments.map(async segment => {
      let filename = join(directory, segment);
      let stat = await fs.statAsync(filename);
      if (stat.isDirectory()) {
        return walkDirectory(fs, filename);
      } else {
        return [filename];
      }
    }))
  );
  return flatten(files);
}

function stripExtension(filename: string): string {
  return filename.substring(0, filename.length - extname(filename).length);
}

