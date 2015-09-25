import * as LinkRegistry from './LinkRegistry';

export default {

  wrapPageModule(module) {
    return module;
  },

  wrapPageContext(context) {
    return context;
  },

  wrapPageLinkModule(module) {
    return LinkRegistry.getLink(module.id);
  },

  wrapPageLinkContext(context) {
    return context.keys().map(key => LinkRegistry.getLink(context(key).id));
  },

  wrapPageMetaModule(module) {
    return module;
  },

  wrapPageMetaContext(context) {
    return context.keys().map(key => context(key));
  },
};
