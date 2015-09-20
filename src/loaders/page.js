import {stringifyRequest, parseQuery} from 'loader-utils';

module.exports = function(source) {
  this.cacheable && this.cacheable();
  source = `
    ${source};
    module.exports = require('sitegen').createPage(module.exports);
    console.log('page', module.exports);
  `;
  return source;
}

module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable();
  let query = parseQuery(this.query);
  let target = this._compiler.options.target;
  if (target === 'web' && !query.wrap) {
    let request = stringifyRequest(this, `!!bundle?name=[path][name]!${__filename}?wrap!${remainingRequest}`);
    return `module.exports = require(${request});`;
  }
}
