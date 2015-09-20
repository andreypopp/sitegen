import path                 from 'path';
import fs                   from 'fs';
import createWebpackConfig  from './createWebpackConfig';

export default function configureFromDirectory(site, options) {
  let filename = path.join(site, 'package.json');
  let sitegen = readSitegenConfig(filename);
  let siteEntry = `${require.resolve('./loaders/site')}?${JSON.stringify(sitegen)}!${filename}`;
  let entry = [].concat(sitegen.require).concat(siteEntry).filter(Boolean);
  let lib = path.join(site, options.lib || sitegen.lib || 'lib');
  let output = path.join(site, options.output || sitegen.output || 'output');
  return createWebpackConfig({...options, entry, site, lib, output});
}

function readSitegenConfig(filename) {
  if (!fs.existsSync(filename)) {
    error(`${filename} does not exist`);
  }
  let pkg = readJSON(filename);
  let sitegen = pkg.sitegen || {content: 'content'};
  if (typeof sitegen === 'string') {
    sitegen = {content: sitegen};
  }
  sitegen.contentIsDirectory = fs.statSync(sitegen.content).isDirectory();
  return sitegen;
}

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function error(message) {
  process.stderr.write('error: ' + message);
  process.exit(1);
}
