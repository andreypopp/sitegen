### Guides

#### Support for SASS/SCSS

SASS/SCSS support can be provided via [sass-loader][] (which uses [libsass][]).

Install both libraries from npm:

```
% npm i install sass-loader libsass --save
```

Then add the loader for corresponding file extensions in `sitegen.config.js`:

```
import {CSS, extractCSS, injectCSS} from '../lib/config'

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

#### Support for LESS

LESS support can be provided via [less-loader][].

Install it from npm:

```
% npm i install less-loader --save
```

Then add the loader for corresponding file extensions in `sitegen.config.js`:

```
import {CSS, extractCSS, injectCSS} from '../lib/config'

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

#### Support for PostCSS (autoprefixer)

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
import {CSS, extractCSS, injectCSS} from '../lib/config'

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
