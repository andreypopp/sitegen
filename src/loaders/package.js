var path               = require('path');
var {stringifyRequest} = require('loader-utils');

module.exports = function(source) {
  let sitegen = this._compiler.options.sitegen;
  this.cacheable && this.cacheable();
  let pkg = JSON.parse(source);
  let component = pkg.sitegen.component ?
    `require('${pkg.sitegen.component}')` :
    'undefined';
  source = `
    var Sitegen = require('sitegen');

    module.exports = Sitegen.createPage({
      component: ${component}, 
      context: require.context('page!./${pkg.sitegen.content}', true, /.+/g)
    });
  `;
  return source;
}
