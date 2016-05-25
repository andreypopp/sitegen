import {page} from 'sitegen/routing';

export let plugins = [
  'sitegen-plugin-css-modules',
  'sitegen-plugin-react-css-components'
];

export let route = page('./components/Site', undefined, {
  index: page('./content/overview.md', {split: true}),
  tutorial: page('./content/tutorial.md', {split: true}),
  docs: page('./content/docs.md', {split: true}),
  community: page('./content/community.md', {split: true}),
});
