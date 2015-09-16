var path               = require('path');
var {stringifyRequest} = require('loader-utils');

module.exports = function(source) {
  let sitegen = this._compiler.options.sitegen;
  this.cacheable && this.cacheable();
  let pkg = JSON.parse(source);
  let content = path.relative(sitegen.site, pkg.sitegen.content);
  let component = pkg.sitegen.component ?
    `require('${pkg.sitegen.component}')` :
    'undefined';
  source = `
    var Sitegen = require('sitegen');

    module.exports = Sitegen.createPage({
      component: ${component}, 
      context: require.context('page!./${content}', true, /.+/g)
    });
  `;
  return source;
}
