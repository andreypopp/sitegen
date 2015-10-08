import * as LinkRegistry from './LinkRegistry';
import MetaRegistry from './MetaRegistry';

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
  return MetaRegistry.get(module.id);
}

export function wrapPageMetaContext(context) {
  return context.keys().map(key => MetaRegistry.get(context(key).id));
}
