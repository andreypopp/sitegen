var path               = require('path');
var {stringifyRequest} = require('loader-utils');

module.exports = function(source) {
  source = `
    ${source};
    module.exports = require('sitegen').createPage(module.exports);
  `;
  return source;
}
