export default {
  wrapPageModule(module) {
    return module;
  },

  wrapPageContext(context) {
    return context;
  },

  wrapPageLinkModule(module) {
    return module;
  },

  wrapPageLinkContext(context) {
    return context.keys().map(key => context(key));
  }
};
