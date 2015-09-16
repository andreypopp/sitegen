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
  let sitegen = pkg.sitegen || {};
  let entry;
  if (sitegen.entry) {
    entry = sitegen.entry;
  } else if (sitegen.content) {
    entry = require.resolve('./loaders/package') + '!' + pkgFilename;
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
