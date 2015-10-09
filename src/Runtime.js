import memoize from 'memoize-decorator';
import PageRegistry from './PageRegistry';

export default {

  @memoize
  get PageRegistry() {
    return PageRegistry.resolve();
  }
};

