import resourceID from '../resourceID';

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
  let id = JSON.stringify(resourceID(this.resource));
  return `
    module.exports = {id: ${id}};
  `;
};
