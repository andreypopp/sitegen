import path                 from 'path';
import fs                   from 'fs';
import createWebpackConfig  from './createWebpackConfig';

let siteLoader = require.resolve('./loaders/site');

const defaultOptions = {
  require: []
};

export default function configureFromDirectory(site, options) {
  options = {...defaultOptions, ...options};
  if (fs.existsSync(path.join(site, 'package.json'))) {
    let relativize = p => path.join(site, p);
    let filename = path.join(site, 'package.json');
    let sitegen = readJSON(filename).sitegen || {};
    if (typeof sitegen === 'string') {
      sitegen = {content: sitegen};
    }
    if (sitegen.content === undefined) {
      error(`${filename} is missing "sitegen": "<site entry point>" metadata`);
    }
    sitegen.asContext = fs.statSync(relativize(sitegen.content)).isDirectory();
    options = {
      ...options,
      entry: []
        .concat(options.require)
        .concat(sitegen.require.map(relativize))
        .concat(makeSiteEntry(filename, sitegen))
        .filter(Boolean),
      lib: options.lib || relativize(sitegen.lib || 'lib'),
      output: options.output || relativize(sitegen.output || 'output'),
    };
  } else if (fs.existsSync(site) && fs.statSync(site).isFile()) {
    let relativize = p => path.join(path.dirname(site), p);
    options = {
      ...options,
      entry: []
        .concat(options.require)
        .concat(makeSiteEntry(site, {content: site, asContext: false}))
        .filter(Boolean),
      lib: options.lib || relativize('lib'),
      output: options.output || relativize('output'),
    };
  } else {
    error(`${site} is not an npm package, nor a file`);
  }
  return createWebpackConfig(options);
}

function makeSiteEntry(entry, options) {
  options = JSON.stringify(options);
  return `${siteLoader}?${options}!${entry}`;
}

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function error(message) {
  process.stderr.write('error: ' + message + '\n');
  process.exit(1);
}
