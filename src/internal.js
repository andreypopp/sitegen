import LinkRegistry from './LinkRegistry';
import PageRegistry from './PageRegistry';

export createPage from './createPage';
export createSite from './createSite';
import {uniqueBy} from './util/Array';

export function wrapPageModule(module) {
  return module;
}

export function wrapPageContext(context) {
  return context;
}

export function wrapPageLinkModule(module) {
  if (module.__sitegetLink === undefined) {
    let registry = LinkRegistry.resolve();
    module.__sitegetLink = registry.get(module.id);
  }
  return module.__sitegetLink;
}

export function wrapPageLinkContext(context) {
  if (module.__sitegetLink === undefined) {
    let items = context.keys().map(key => wrapPageLinkModule(context(key)));
    items = uniqueBy(items);
    module.__sitegetLink = items;
  }
  return module.__sitegetLink;
}

export function wrapPageMetaModule(module) {
  if (module.__sitegenPage === undefined) {
    let registry = PageRegistry.resolve();
    module.__sitegenPage = registry.get(module.id);
  }
  return module.__sitegenPage;
}

export function wrapPageMetaContext(context) {
  if (module.__sitegenPage === undefined) {
    let items = context.keys().map(key => wrapPageMetaModule(context(key)));
    items = uniqueBy(items, item => item.path);
    module.__sitegenPage = items;
  }
  return module.__sitegenPage;
}
