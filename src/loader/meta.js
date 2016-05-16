module.exports = function(source) {
  return `module.exports.default = {meta: "${this.resource}"};`;
}
