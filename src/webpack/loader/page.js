import LoaderUtils from 'loader-utils';
import resourceID  from '../../resourceID';

let bundleLoader = require.resolve('bundle-loader');

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  let key = JSON.stringify(resourceID(this.resource));
  source = `
    ${source};
    module.exports = require('sitegen/internal').createPage(module.exports, ${key});
  `;
  return source;
};

module.exports.pitch = function(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }
  let query = LoaderUtils.parseQuery(this.query);
  let options = this.options.sitegen;

  if (query.wrap) {
    return undefined;
  } else if (options.mode === 'serve' && !options.dev) {
    let request = LoaderUtils.stringifyRequest(
      this,
      `!!${bundleLoader}?name=[path][name]!${__filename}?wrap!${remainingRequest}`
    );
    return `module.exports = require(${request});`;
  } else {
    return undefined;
  }
};
