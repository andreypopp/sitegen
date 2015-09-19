import path                 from 'path';
import fs                   from 'fs';
import createWebpackConfig  from './createWebpackConfig';

export default function configureFromDirectory(site, options) {
  let pkgFilename = path.join(site, 'package.json');
  if (!fs.existsSync(site)) {
    error(`site ${site} does not exist`);
  }
  if (!fs.existsSync(pkgFilename)) {
    error(`site ${site}/package.json does not exist`);
  }
  let pkg = readJSON(pkgFilename);
  let sitegen = pkg.sitegen || {content: 'content'};
  if (typeof sitegen === 'string') {
    sitegen = {content: sitegen};
  }

  let entry = [require.resolve('./loaders/site') + '!' + pkgFilename];
  if (sitegen.require) {
    entry = [].concat(sitegen.require).concat(entry);
  }
  let lib = path.join(site, options.lib || sitegen.lib || 'lib');
  let output = path.join(site, options.output || sitegen.output || 'output');
  return createWebpackConfig({...options, entry, site, lib, output});
}

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function error(message) {
  process.stderr.write('error: ' + message);
  process.exit(1);
}
