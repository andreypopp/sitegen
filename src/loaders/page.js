var {stringifyRequest} = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  return source;
}

module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable();
  var target = this._compiler.options.target;
  if (target === 'web') {
    let request = stringifyRequest(this, `!!bundle?name=[path][name]!${remainingRequest}`);
    return `module.exports = require(${request});`;
  }
}
