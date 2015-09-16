module.exports = function(source) {
  this.cacheable && this.cacheable();
  return `
    if (typeof window !== 'undefined' && !window.fake) {
      ${source}
    }
  `;
}
