/**
 * @copyright 2016-present, Sitegen team
 */

import {loader, CSS, extractCSS, injectCSS} from 'sitegen/config';

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS;
  // We need to minimize both for production and content because of inlineCSS
  // option and content uses its own build to inline bundle.css.
  let minimize = env.production || env.content;
  let CSSModule = CSS({modules: true, minimize});
  let CSSComponent = loader(require.resolve('react-css-components'));
  return {
    globalLoaders: {
      '**/*.rcss': CSSComponent({loadCSS: deployCSS(CSSModule)}),
    },
  };
}
