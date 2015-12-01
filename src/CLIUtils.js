import path from 'path';
import commander from 'commander';
import pkg from '../package.json';
import createWebpackConfig from './createWebpackConfig';

export function listFormatter(items = []) {
  return function(item) {
    items.push(item);
    return items;
  };
}

export function parse(argv, configure = null) {
  let parser = commander
    .version(pkg.version)
    .usage('sitegen-serve [options] <site>')
    .description('Serve site')
    .option('-L, --lib <directory>', 'site library directory (default: $site/lib)')
    .option('-r, --require <entry>', 'additional entry to require', listFormatter(), []);

  if (configure) {
    parser = configure(parser);
  }

  let options = parser.parse(process.argv);

  let cwd = process.cwd();
  let site = path.join(cwd, options.args[0] || '.');

  return {
    site,
    options: {
      ...options,
      output: options.output ? path.join(cwd, options.output) : options.output,
      lib: options.lib ? path.join(cwd, options.lib) : options.lib,
      require: options.require.map(item => path.join(cwd, item))
    }
  };
}

let siteLoader = require.resolve('./loaders/site');

function makeSiteEntry(entry, options) {
  options = JSON.stringify(options);
  return `${siteLoader}?${options}!${entry}`;
}

export function configure(site, options) {
  let relativize = p => path.join(path.dirname(site), p);
  let entry = []
    .concat(options.require)
    .concat(makeSiteEntry(site, {content: site, asContext: false}))
    .filter(Boolean);
  let lib = options.lib || relativize('lib');
  let output = options.output || relativize('output');
  return createWebpackConfig({...options, entry, lib, output });
}
