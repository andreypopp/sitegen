/**
 * @copyright 2016-present, Sitegen team
 */

export function configureLoader(element) {
  if (Array.isArray(element)) {
    return element.map(configureLoader).join('!');
  } else if (typeof element === 'string') {
    return element;
  } else {
    if (element.query) {
      return element.loader + '?' + JSON.stringify(element.query);
    } else {
      return element.loader;
    }
  }
}

export function createRequest(id, ...loader) {
  loader.reverse();
  return `${configureLoader(loader)}!${id}`;
}
