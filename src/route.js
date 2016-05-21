/**
 * @copyright 2016-present, Sitegen team
 */

import {join, extname, relative} from 'path';
import {promisifyAll} from 'bluebird';
import minimatch from 'minimatch';
import {flatten, chunk} from 'lodash';

import {string, number, ref, maybe, object, mapping, oneOf, boolean} from 'validated/schema';
import {validate as validateObject} from 'validated/object';

import * as types from 'babel-types';
import {moduleRequest} from './config';

const META_LOADER = require.resolve('./loader/meta');
const CHUNK_LOADER = require.resolve('./loader/chunk');
const REACT_HOT_LOADER = require.resolve('react-hot-loader/webpack');

export function forEach(route, func) {
  func(route);
  if (route.route) {
    for (let k in route.route) {
      forEach(route.route[k], func);
    }
  }
}

/**
 * Validate route.
 */
export function validate(route, {basedir}) {
  let pattern = string.andThen(val => parsePattern(val, {basedir}));
  let pageShortcut = string.andThen(page => ({page}));
  let collectionShortcut = pattern.andThen(page => ({page}));
  let schema = ref();

  let routePage = oneOf(
    pageShortcut,
    object({
      page: string,
      split: maybe(boolean),
      route: maybe(mapping(schema)),
      collection: maybe(oneOf(
        collectionShortcut,
        object({
          page: pattern,
          paginate: maybe(object({size: number})),
        })
      )),
    })
  ).andThen((route, error) => {
    if (route.route && route.collection) {
      error('Route cannot have both "route" and "collection" defined');
    }
    return route;
  });

  schema.set(routePage);

  return validateObject(schema, route);
}

/**
 * Render route into JS.
 */
export async function renderRoute(route, options) {
  promisifyAll(options.fs);
  let {publicPath = '/'} = options;
  let node = await renderRoutePage(route, publicPath, [''], options);
  return node;
}

async function renderRoutePage(route, path, trace, options) {
  if (route.route) {
    let indexRoute;
    let childRoutes = [];
    for (let key in route.route) {
      if (key === 'index') {
        indexRoute = await renderRoutePage(route.route[key], null, trace, options);
      } else {
        childRoutes.push(
          await renderRoutePage(route.route[key], key, trace.concat(key), options)
        );
      }
    }

    let getComponent = renderGetComponent(route.page, {
      split: options.split !== undefined ? options.split : route.split,
      chunkName: trace.join('/'),
    });
    return renderRouteSpec({
      path,
      getComponent,
      indexRoute,
      childRoutes
    });
  } else if (route.collection) {
    return renderRouteCollection(route, path, trace, options);
  } else {
    let getComponent = renderGetComponent(route.page, {
      split: options.split !== undefined ? options.split : route.split,
      chunkName: trace.join('/'),
    });
    return renderRouteSpec({
      path,
      getComponent,
    });
  }
}

async function renderRouteCollection(route, path, trace, options) {
  let {page: {directory, match}, paginate} = route.collection;

  let chunkName = trace.join('/');
  let name = chunkName;

  let items = (await walkDirectory(options.fs, directory))
    .filter(filename => match(filename))
    .map(filename => ({
      filename,
      path: stripExtension(relative(directory, filename))
    }));

  let chunks = [items];
  if (paginate) {
    chunks = chunk(items, paginate.size);
  }

  chunks = chunks.map((chunk, idx) => renderGetCollectionChunk(chunk, {
    page: route.page,
    chunkNumber: idx,
    chunkCount: chunks.length,
    loader: META_LOADER,
    chunkName: trace.concat('@page', idx + 1).join('/'),
    split: options.split !== undefined ? options.split : true,
  }));

  let childRoutes = items.map(item => renderRouteSpec({
    path: item.path,
    getComponent: renderGetComponent(item.filename, {
      split: options.split !== undefined ? options.split : true,
      chunkName: trace.concat(item.path).join('/'),
    }),
  }));

  let getComponent = expr`function getComponent(nextState, cb) {
    var pageNumber = parseInt(nextState.params.page || 1, 10);
    var chunkList = ${types.arrayExpression(chunks)};
    var getCollectionChunk = chunkList[pageNumber - 1];
    getCollectionChunk(nextState, cb);
  }`;

  let pageParam = types.arrayExpression(chunks.map((_, idx) => types.numericLiteral(idx + 1)));
  childRoutes = childRoutes.concat(renderRouteSpec({
    path: '@page/:page',
    name,
    params: expr`{page: ${pageParam}}`,
  }));

  return renderRouteSpec({
    path,
    getComponent,
    childRoutes,
    name,
  });
}

/**
 * Render a fetcher for a collection chunk.
 */
function renderGetCollectionChunk(chunk, options) {
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

/**
 * Render React Router route spec.
 */
function renderRouteSpec({path, getComponent, indexRoute, childRoutes, name, params}) {
  path = path == null ? expr`undefined` : types.stringLiteral(path);
  getComponent = getComponent == null ? expr`undefined` : getComponent;
  indexRoute = indexRoute == null ? expr`undefined` : indexRoute;
  childRoutes = types.arrayExpression(childRoutes || []);
  name = name == null ? expr`undefined` : types.stringLiteral(name);
  params = params == null ? expr`undefined` : params;
  return expr`{
    path: ${path},
    getComponent: ${getComponent},
    indexRoute: ${indexRoute},
    childRoutes: ${childRoutes},
    name: ${name},
    params: ${params},
  }`;
}

/**
 * Render component loader to load component from a given module.
 */
function renderGetComponent(id, options) {
  options = {
    split: false,
    chunkName: 'component',
    ...options,
  };

  let req = types.stringLiteral(id);

  if (options.split) {
    return expr`
      function getComponentAsync(_nextState, cb) {
        require.ensure([], function(require) {
          cb(null, require(${req}).default);
        }, ${types.stringLiteral(options.chunkName)});
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

function parsePattern(pattern, {basedir}) {
  pattern = join(basedir, pattern);
  let matcher = new minimatch.Minimatch(pattern);
  let directory = [];
  for (let i = 0; i < matcher.set[0].length; i++) {
    if (typeof matcher.set[0][i] === 'string') {
      directory.push(matcher.set[0][i]);
    } else {
      break;
    }
  }
  if (directory.length > 1) {
    directory = directory.join('/');
  }
  return {
    directory,
    match: matcher.match.bind(matcher),
  };
}

function stripExtension(filename) {
  return filename.substring(0, filename.length - extname(filename).length);
}

async function walkDirectory(fs, directory) {
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
