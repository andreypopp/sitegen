import path               from 'path';
import {stringifyRequest} from 'loader-utils';

module.exports = function(source) {
  this.cacheable && this.cacheable();
  let pkg = JSON.parse(source);
  let sitegen = pkg.sitegen;
  if (typeof sitegen === 'string') {
    sitegen = {content: sitegen};
  }
  source = `
    var Sitegen = require('sitegen');

    module.exports = Sitegen.createSite({
      context: require.context('page!./${sitegen.content}', true, /.+/)
    });
  `;
  return source;
}
