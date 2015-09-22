import resourceID  from '../resourceID';

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  return source;
};

module.exports.pitch = function() {
  if (this.cacheable) {
    this.cacheable();
  }
  let key = JSON.stringify(resourceID(this.resource));
  return `
    var Sitegen = require('sitegen');
    if (Sitegen.LinkRegistry.getLink(${key}) === undefined) {
      module.exports = new Sitegen.PageLink(${key});
    } else {
      module.exports = Sitegen.LinkRegistry.getLink(${key});
    }
  `;
};
