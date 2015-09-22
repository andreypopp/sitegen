import LoaderUtils from 'loader-utils';
import resourceID  from '../resourceID';

function normalizePath(path) {
  if (path[0] === '/') {
    return path;
  } else {
    return './' + path;
  }
}

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  let options = LoaderUtils.parseQuery(this.query);
  let key = JSON.stringify(resourceID(this.resource));
  if (options.asContext) {
    source = `
      var site = Sitegen.createSite({
        path: '/',
        page: require.context('page!${normalizePath(options.content)}', true, /.+/)
      }, ${key});
    `;
  } else {
    source = `
      var site = Sitegen.createSite({
        path: '/',
        page: require('page!${normalizePath(options.content)}')
      }, ${key});
    `;
  }
  source = `
    var Sitegen = require('sitegen');
    ${source}
    module.exports = site;
  `;
  return source;
};
