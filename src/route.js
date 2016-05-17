/**
 * @copyright 2016-present, Sitegen team
 */

import {join, extname, relative} from 'path';
import invariant from 'invariant';
import {promisifyAll} from 'bluebird';
import minimatch from 'minimatch';
import {flatten, chunk} from 'lodash';

import {string, number, ref, maybe, object, mapping, oneOf, boolean} from 'validated/schema';
import {validate as validateObject} from 'validated/object';

import generate from 'babel-generator';
import * as types from 'babel-types';

const META_LOADER = require.resolve('./loader/meta');
const COLLECTION_CTX = require.resolve('./CollectionContext');

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
  let node = await renderRoutePage(route, '/', [''], options);
  return generate(node).code;
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

  let getComponentInner = renderGetComponent(route.page, {
    split: options.split !== undefined ? options.split : route.split,
    chunkName,
  });

  let getComponent = expr`function getComponentAsync(nextState, cb) {
    var getComponentInner = ${getComponentInner};
    var pageNumber = parseInt(nextState.params.page || 1, 10);
    var chunkList = ${types.arrayExpression(chunks)};
    var getCollectionChunk = chunkList[pageNumber - 1];
    getComponentInner(nextState, function(_err, InnerComponent) {
      var lastRoute = nextState.routes[nextState.routes.length - 1];
      if (lastRoute.name !== ${types.stringLiteral(name)} || !getCollectionChunk) {
        cb(null, InnerComponent);
      } else {
        getCollectionChunk(function(page) {
          function Component(props) {
            var ComponentWrapper = ${renderRequire(COLLECTION_CTX)};
            return  React.createElement(ComponentWrapper, {
              Component: InnerComponent,
              pageNumber: pageNumber,
              pageCount: chunkList.length,
              page: page,
              props: props
            });
          }
          cb(null, Component);
        });
      }
    });
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
function renderGetCollectionChunk(page, options) {
  options = {
    loader: META_LOADER,
    chunkName: 'collectionPage',
    split: false,
    ...options,
  };

  let requireList = page.map(item => {
    let req = options.loader + '!' + item.filename;
    return renderRequire(req);
  });

  let pathList = page.map(item => {
    return types.stringLiteral(item.path);
  });

  if (options.split) {
    return expr`
      function getCollectionPage(cb) {
        require.ensure([], function(require) {
          var page = ${types.arrayExpression(requireList)};
          var path = ${types.arrayExpression(pathList)};
          page = page.map(function(item, idx) {
            return {item: item, path: path[idx]};
          });
          cb(page);
        }, ${types.stringLiteral(options.chunkName)});
      }
    `;
  } else {
    return expr`
      function getCollectionPage(cb) {
        var page = ${types.arrayExpression(requireList)};
        var path = ${types.arrayExpression(pathList)};
        page = page.map(function(item, idx) {
          return {item: item, path: path[idx]};
        });
        cb(page);
      }
    `;
  }
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

function renderRequire(id) {
  return expr`require(${types.stringLiteral(id)}).default`;
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
