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

import {CSS, extractCSS, injectCSS} from '../lib/config';

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS;
  return {
    globalLoaders: {
      '**/*.scss': deployCSS([CSS, 'sass-loader']),
    },
  };
}
