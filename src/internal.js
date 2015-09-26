import * as LinkRegistry from './LinkRegistry';

export createPage from './createPage';
export createSite from './createSite';

export function wrapPageModule(module) {
  return module;
}

export function wrapPageContext(context) {
  return context;
}

export function wrapPageLinkModule(module) {
  return LinkRegistry.getLink(module.id);
}

export function wrapPageLinkContext(context) {
  return context.keys().map(key => LinkRegistry.getLink(context(key).id));
}

export function wrapPageMetaModule(module) {
  return module;
}

export function wrapPageMetaContext(context) {
  return context.keys().map(key => context(key));
}
