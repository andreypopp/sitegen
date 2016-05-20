### Introduction & Motivation

Sitegen is a static site generator based on [Webpack][] and [React][].

Sitegen's motivation is to provide a framework for content based sites with
**simple API** to take the advantage of React **component model** and rich
Webpack ecosystem.

The usage scenarious for Sitegen are **static sites**, **blogs**, **project
documentation**, presentation **slide decks**, live **styleguides** and other
similar content based sites.

#### Component model

Sitegen embraces [React][] for its component model.

Any element of Sitegen site is a React component. Be it a site design element or
a piece even content. The latter allows to Sitegen to host sites with dynamic
content easily.

#### Flexible build pipeline

[Webpack][] is at the core of Sitegen compiler.

Every Webpack plugin or loader is automatically compatible with Sitegen site:
**code splitting**, support for **CSS preprocessors**, **optimizations**, **hot
module reloading** and a multiple others.

Sitegen comes with a sane configuration for Webpack out of the box. But it is
easy to **override** parts of it or **extend** with new behaviours.

#### Rich & extensible markup

Sitegen has support for markdown syntax out of the box.

Moreover the support is provided by [Reactdown][] which allows to extend
markdown syntax with arbitrary elements:

```
..live-code-example

  console.log('Hello, world!');
```

#### Simple API

Sitegen API is extremely simple. The most simple site takes 3 easy steps to
take.

##### 1. Define content tree

Content tree describes the structure of your site:

```
export let route = {
  page: './Site'
}
```


##### 2. Create React component

Page is rendered with a regular React component:

```
export default function Site() {
  return <div>Hello, world</div>
}
```

##### 3. Run dev server & iterate

Run development server with hot reloading & iterate on your site:

```
% sitegen-serve

```

#### What's next

Ready to start using Sitegen? Follow the link to the [tutorial][] and then
consult the [documentation][].

[React]: https://reactjs.org
[Webpack]: https://webpack.github.io
[Reactdown]: https://andreypopp.github.io/reactdown
[tutorial]: /tutorial
[documentation]: /docs
