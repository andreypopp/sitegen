import {loader, JS, CSS, extractCSS, injectCSS} from '../lib/config';

export let route = {
  page: './components/Site',
  route: {
    index: {
      page: './content/overview.md',
      split: true,
    },
    tutorial: {
      page: './content/tutorial.md',
      split: true,
    },
    docs: {
      page: './content/docs.md',
      split: true,
    },
    community: {
      page: './content/community.md',
      split: true,
    },
  }
};

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS;
  let CSSComponent = loader('react-css-components/webpack');
  let CSSModule = CSS({modules: true});
  return {
    globalLoaders: {
      '**/*.mcss': deployCSS(CSSModule),
      '**/*.rcss': [JS, CSSComponent({loadCSS: deployCSS(CSSModule)})],
    },
  };
}
