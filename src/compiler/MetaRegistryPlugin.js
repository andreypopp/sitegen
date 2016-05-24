/**
 * @copyright 2016-present, Sitegen team
 */

import path from 'path';
import minimatch from 'minimatch';
import {flatten} from 'lodash';
import {promisifyAll} from 'bluebird';
import Dependency from 'webpack/lib/dependencies/PrefetchDependency';
import {moduleRequest} from '../config';
import {evalAsModule} from './utils';

export default class MetaRegistryPlugin {

  constructor({loader}) {
    this.loader = loader;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation, params) => {
      let normalModuleFactory = params.normalModuleFactory;
      compilation.dependencyFactories.set(Dependency, normalModuleFactory);
      compilation.plugin('normal-module-loader', loaderContext => {
        loaderContext.getMetaRegistry = () => this.getMetaRegistry({
          context: loaderContext.context,
          compiler: compiler,
          compilation: compilation,
          resolve: loaderContext.resolve,
          addDependency: loaderContext.addDependency,
          addContextDependency: loaderContext.addContextDependency,
        });
      });
    });
  }

  getMetaRegistry(context) {
    return new MetaRegistryAPI(this.loader, context);
  }
}

class MetaRegistryAPI {

  constructor(loader, context) {
    this.loader = loader;
    this.context = context;
    this.compiler = context.compiler;
    this.compilation = context.compilation;
    this.fs = this.compiler.inputFileSystem;

    this.compilation.sitegenMetaCache = this.compilation.sitegenMetaCache || {};
    this.cache = this.compilation.sitegenMetaCache;

    promisifyAll(this.fs);
  }

  _resolve(req) {
    return new Promise((resolve, reject) =>
      this.context.resolve(this.context.context, req, (err, req) => {
        if (err) {
          reject(err);
        } else if (module) {
          resolve(req);
        }
      }));
  }

  async _getMeta(req) {
    req = await this._resolve(req);
    if (this.cache[req] === undefined) {
      this.cache[req] = new Promise((resolve, reject) => {
        let dep = new Dependency(moduleRequest(req, this.loader));
        this.context.compilation.prefetch(this.context.context, dep, (err, module) => {
          if (err) {
            reject(err);
          } else if (module) {
            let source = module._source.source();
            let meta = evalAsModule(source, req);
            resolve(meta.default || {});
          } else {
            reject(new Error('cannot resolve meta for the module: ' + req));
          }
        });
      });
    }
    return this.cache[req];
  }

  async getPageMeta(req) {
    this.context.addDependency(req);
    return this._getMeta(req);
  }

  async getCollectionMeta(reqPattern) {
    let {directory, match} = parsePattern(reqPattern, {basedir: this.context.context});

    this.context.addContextDependency(directory);

    let items = await walkDirectory(this.fs, directory);
    items = items.filter(req => match(req));
    items = items.map(async req => {
      let meta = await this._getMeta(req);
      return {meta, req};
    });
    return Promise.all(items);
  }
}

async function walkDirectory(fs, directory) {
  let files = await fs.readdirAsync(directory).then(segments =>
    Promise.all(segments.map(async segment => {
      let filename = path.join(directory, segment);
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

function parsePattern(pattern, {basedir}) {
  pattern = path.join(basedir, pattern);
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
