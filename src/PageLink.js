import * as LinkRegistry from './LinkRegistry';

export default class PageLink {
  constructor(resource) {
    this.resource = resource;
  }

  valueOf() {
    return LinkRegistry.getLink(this.resource);
  }

  match(...args) {
    return this.valueOf().match(...args);
  }

  indexOf(...args) {
    return this.valueOf().indexOf(...args);
  }
}
