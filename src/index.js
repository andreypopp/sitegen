export Site               from './Site';
export createPage         from './createPage';
export createSite         from './createSite';
export PageLink           from './PageLink';
export * as LinkRegistry  from './LinkRegistry';

export default {
  __internal: {

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
  }
}
