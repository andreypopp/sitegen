import LoaderUtils from 'loader-utils';
import resourceID  from '../resourceID';

function normalizePath(path) {
  if (path[0] === '/') {
    return path;
  } else {
    return './' + path;
  }
}

module.exports = function() {
  if (this.cacheable) {
    this.cacheable();
  }
  let options = LoaderUtils.parseQuery(this.query);
  let key = JSON.stringify(resourceID(this.resource));
  if (options.asContext) {
    return `
      module.exports = require('sitegen/internal').createSite({
        path: '/',
        route: require.context(
          'page!${normalizePath(options.content)}',
          true,
          /.+/)
      }, ${key});
    `;
  } else {
    return `
      module.exports = require('sitegen/internal').createSite({
        path: '/',
        route: require('page!${normalizePath(options.content)}')
      }, ${key});
    `;
  }
};
