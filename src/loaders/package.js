import path               from 'path';
import {stringifyRequest} from 'loader-utils';

module.exports = function(source) {
  this.cacheable && this.cacheable();
  let pkg = JSON.parse(source);
  source = `
    var Sitegen = require('sitegen');

    module.exports = Sitegen.createSite({
      context: require.context('page!./${pkg.sitegen.content}', true, /.+/g)
    });
  `;
  return source;
}
