import {loader, JS, CSS, extractCSS, injectCSS} from '../lib/config';
import {page} from '../lib/routing';

export let route = page('./components/Site', undefined, {
  index: page('./content/overview.md', {split: true}),
  tutorial: page('./content/tutorial.md', {split: true}),
  docs: page('./content/docs.md', {split: true}),
  community: page('./content/community.md', {split: true}),
});

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS;
  let CSSComponent = loader('react-css-components/webpack');
  let CSSModule = CSS({modules: true, minimize: env.production || env.content});
  return {
    globalLoaders: {
      '**/*.mcss': deployCSS(CSSModule),
      '**/*.rcss': [JS, CSSComponent({loadCSS: deployCSS(CSSModule)})],
    },
  };
}
