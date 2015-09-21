import path                           from 'path';
import {stringifyRequest, parseQuery} from 'loader-utils';

module.exports = function(source) {
  this.cacheable && this.cacheable();
  let sitegen = parseQuery(this.query);
  if (sitegen.contentIsDirectory) {
    source = `
      var site = Sitegen.createSite({
        path: '/',
        page: require.context('page!./${sitegen.content}', true, /.+/)
      });
    `;
  } else {
    source = `
      var site = Sitegen.createSite({
        path: '/',
        page: require('page!./${sitegen.content}')
      });
    `;
  }
  source = `
    var Sitegen = require('sitegen');
    ${source}
    module.exports = site;
  `;
  return source;
}
