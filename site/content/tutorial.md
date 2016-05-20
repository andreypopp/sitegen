### Tutorial

The tutorial covers creation of a simple site using Sitegen.

The site we are going to create is similar to the one you are looking at now.
The topics we are going to cover are:

* Installing Sitegen and creating a new site.

* Writing pages with [markdown][] syntax

* Setting chrome components for pages which wraps content with some UI

* Links between pages

* Using [CSS Modules][] for styling

The first step is to create a new npm package.

#### Creating a new site

Sitegen lets you build site the same way you build programs, with code. With
JavaScript code in particular.

The way you manage distribution, dependency management and the whole lifecycle
of JavaScript code is through [npm][].

Let's create a new npm package and set Sitegen and React as its dependencies:

```
% mkdir site && cd site
% npm init
% npm install sitegen react react-dom --save
```

The `npm init` command will ask you a few questions about the package. Answer
them and at the end you will see a `package.json` file with basic package
metadata along with its dependency information.

#### Chrome

Chrome components is a special term for components which wrap content with a UI.
To state differently: the way your site looks is determined by chrome
components.

Create a new file `index.js` and put the following contents there:

    import React from 'react'
    import {Meta} from 'sitegen';

    export default class Site extends React.Component {

      render() {
        let {children} = this.props
        return (
          <div>
            <Meta title="Sitegen based site" />
            <div>
              {children}
            </div>
          </div>
        )
      }
    }

As you can see this is just a regular React component which accepts a `children`
prop and renders it.

We used `<Sitegen.Meta />` component which allows us to set page wide metadata
such as title, links, meta tags and others.

#### Content

Now create a directory and put a few markdown files there:

    % mkdir pages
    % echo '# Home' > pages/index.md
    % echo '# About' > pages/about.md

Those are simplest pages defined using markdown syntax.

#### Content tree

Now to have the site working we must define how our chrome components and
content relate to each other.

For that we need to configure the content tree of our site. It should be defined
in `sitegen.config.js` file:

```
export let route = {
  page: './index.js',
  collection: './pages/*.md',
}
```

#### Development server

Now to serve our site:

    % ./node_modules/.bin/sitegen-serve

You can open `http://localhost:3000` in browser and browse through site's pages.
Try to edit any of the content pages or the chrome component — changes should
appear in browser as you save edits in your text editor.

#### Navigation

We could use `<a />` DOM components to define navigation between our pages but
that's inefficient as we don't want browser to reload an entire page but just
fetch the content for the next page and re-render it.

Instead we could use `<Sitegen.Link />` component which is aware of the Sitegen
routing:

    import React from 'react'
    import {Meta, Link} from 'sitegen';

    export default class Site extends React.Component {

      render() {
        let {children} = this.props
        return (
          <div>
            <Meta title="Sitegen based site" />
            <div>
              <Link href="/pages/home">Home</Link>
              <Link href="/pages/about">About</Link>
            </div>
            <div>
              {children}
            </div>
          </div>
        )
      }
    }

As you can see using `<Sitegen.Link />` is as straightforward as using `<a />`
DOM component. You check in browser that by clicking on the links it just
renders the corresponding page without reload.

Now that's better but still suboptimal as we manually listed each page. Instead
we want to render such list automatically.

Fortunately for us Sitegen passes `page` prop with the list of all pages'
metadata. We can use to render a page index:

    import React from 'react'
    import {Meta, Link} from 'sitegen';

    export default class Site extends React.Component {

      render() {
        let {children, page} = this.props
        let index = page.map(item =>
          <Link key={item.path} href={item.path}>
            {item.meta.title || item.path}
          </Link>
        )
        return (
          <div>
            <Meta title="Sitegen based site" />
            <div>
              {index}
            </div>
            <div>
              {children}
            </div>
          </div>
        )
      }
    }

That's it, check `http://localhost:3000` and see that the list of pages appears.
You can

#### Production build

Production build with Sitegen is simple:

    % ./node_modules/.bin/sitegen-build

The command above will build an entire site into `./build` directory. HTML files
will be pregenerated and assets are minified.

The last step would be to deploy those files on some hosting (probably [GitHub
Pages][gh-pages]).

[npm]: https://www.npmjs.com
[CSS Modules]: https://github.com/css-modules/css-modules
[markdown]: https://daringfireball.net/projects/markdown/
[gh-pages]: https://pages.github.com/
