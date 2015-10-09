import memoize from 'memoize-decorator';
import PageRegistry from './PageRegistry';
import LinkRegistry from './LinkRegistry';

export default {

  @memoize
  get LinkRegistry() {
    return LinkRegistry.resolve();
  },

  @memoize
  get PageRegistry() {
    return PageRegistry.resolve();
  }
};

