import {stringifyRequest, parseQuery} from 'loader-utils';

module.exports = function(source) {
  this.cacheable && this.cacheable();
  source = `
    ${source};
    module.exports = require('sitegen').createPage(module.exports);
  `;
  return source;
}

module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable();
  let query = parseQuery(this.query);
  let options = this.options.sitegen;
  if (options.mode === 'serve' && !query.wrap) {
    let request = stringifyRequest(this, `!!bundle?name=[path][name]!${__filename}?wrap!${remainingRequest}`);
    return `module.exports = require(${request});`;
  } else if (options.mode === 'build' && !query.wrap) {
    let request = stringifyRequest(this, `!!${__filename}?wrap!${remainingRequest}`);
    return `module.exports = require(${request});`;
  }
}
