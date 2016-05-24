### Content tree

Content tree specifies what pages does the site have and how to navigate between
them. It should be specified in `sitegen.config.js` and exported under `route`
name.

The type of the content tree:

```
type ContentTree = Page | Collection
```

#### Pages

The `Page` type represents pages of the site.

Sub pages can be specified using optional `route` key which is a mapping from
path segments to remainings of the content tree.

The content of the page can be split from the main bundle by setting `split:
true`. This is useful if a page contains a lot of custom JS code which specific
for the page.

```
import {page} from 'sitegen/routing'

let about = page('./About', {split: true})
let site = page('./Site', undefined, {
  about: about
})
```

#### Collections

The `Collection` type represents collections of related pages, such as blog
posts for example.

The `collection` specifies pattern (using glob syntax) and optional pagination
strategy. By default all the pages in the collections are split from the main
bundle.

```
import {collection} from 'sitegen/routing'

let blog = collection('./Blog', 'posts/*.md')
```

#### Examples

The simplest example for a site consisting of a single page:

```
import {page} from 'sitegen/routing'

export let route = page('./Site.js')
```

Site with a single chrome component and multiple pages:

```
import {page} from 'sitegen/routing'

export let route = page('./Site', undefined, {
  index: page('./Main.js'),
  docs: page('./Docs.md'),
  about: page('./About.md'),
})
```

Site with a collection of blog posts:

```
import {page, collection} from 'sitegen/routing'

export let route = page('./Site', undefined, {
  index: collection('./Blog', './posts/*.md'),
  about: page('./About'),
})
```

### Components

As Sitegen allows you to use React component you can find on npm there's little
we can ship in its distribution. Though there are some components which are
specific to how Sitegen works.

#### &lt;Link /&gt;

`<Link />` component is used to define navigation between pages. While standard
`<a />` is usable with Sitegen it reloads the browser page on transitions, use
`<Link />` to provide non-reloading page transitions:

```
import {Link} from 'sitegen'

<Link href="/about" />
```

#### &lt;Meta /&gt;

`<Meta />` component allows to specify page metadata such as title and others:

```
import {Meta} from 'sitegen'

<Meta title="Main Page" />
```

The component is based of [React Helmet][] library, consult its docs for usage.

[React Helmet]: https://github.com/nfl/react-helmet

### Compiler

### Guides

#### SASS/SCSS

SASS/SCSS support can be provided via [sass-loader][] (which uses [libsass][]).

Install both libraries from npm:

```
% npm i install sass-loader libsass --save
```

Then add the loader for corresponding file extensions in `sitegen.config.js`:

```
import {CSS, extractCSS, injectCSS} from 'sitegen/config'

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS
  let SASS = deployCSS(CSS, 'sass-loader'),

  return {
    globalLoaders: {
      '**/*.scss': SASS,
      '**/*.sass': SASS,
    },
  }
}
```

[sass-loader]: https://github.com/jtangelder/sass-loader
[libsass]: https://github.com/sass/libsass

#### LESS

LESS support can be provided via [less-loader][].

Install it from npm:

```
% npm i install less-loader --save
```

Then add the loader for corresponding file extensions in `sitegen.config.js`:

```
import {CSS, extractCSS, injectCSS} from 'sitegen/config'

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS

  return {
    globalLoaders: {
      '**/*.less': deployCSS(CSS, 'less-loader'),
    },
  }
}
```

[less-loader]: https://github.com/webpack/less-loader

#### CSS Modules

[CSS Modules][] is technique for writing modular CSS which scales well with the
app size.

As CSS Modules are implemented by the built-in [css-loader][] Webpack loader the
only thing we need is to enable processing for CSS modules in the
`sitegen.config.js`:

```
import {CSS, extractCSS, injectCSS} from 'sitegen/config';

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS;
  return {
    globalLoaders: {
      '**/*.mcss': deployCSS(CSS({modules: true})),
    },
  };
}
```

[CSS Modules]: https://github.com/css-modules/css-modules
[css-loader]: https://github.com/webpack/css-loader

#### PostCSS (Autoprefixer)

[PostCSS][] is a popular framework for process CSS. It is the most famous for
[Autoprefixer][], a tool which automatically adds prefixes to CSS.

PostCSS is easy to use with Sitegen. You need to enable support for it via
[postcss-loader][].

Install it from npm:

```
% npm i install postcss-loader autoprefixer --save
```

Then add the loader for corresponding file extensions in `sitegen.config.js`:

```
import autoprefixer from 'autoprefixer'
import {CSS, extractCSS, injectCSS} from 'sitegen/config'

export function configure({env}) {
  let deployCSS = env.development ? injectCSS : extractCSS

  return {
    globalLoaders: {
      '**/*.css': deployCSS(CSS, 'postcss-loader'),
    },

    postcss() {
      return [autoprefixer]
    },
  }
}
```

[PostCSS]: http://postcss.org/
[Autoprefixer]: https://github.com/postcss/autoprefixer
[postcss-loader]: https://github.com/postcss/postcss-loader
