webpackJsonp([3],{399:function(e,t,n){e.exports=n(400)},400:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.DocumentContext=t.directives=t.components=void 0;var r=n(401),o=l(r),i=n(402),u=l(i),d=n(405),s=a(d);t.components=o,t.directives=u,t.DocumentContext=s["default"]},401:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){var n={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}function r(e){var t=e.html;return d["default"].createElement("div",{dangerouslySetInnerHTML:{__html:t}})}function o(e){var t=e.level,n=l(e,["level"]),a="h"+Math.min(t,6);return d["default"].createElement(a,n)}function i(e){var t=e.children;return d["default"].createElement("div",{style:s.root},d["default"].createElement("div",{style:s.heading},"Unknown node found:"),d["default"].createElement("pre",{style:s.report},d["default"].createElement("code",null,t)))}Object.defineProperty(t,"__esModule",{value:!0}),t.UnorderedList=t.OrderedList=t.ListItem=t.Link=t.Code=t.Blockquote=t.TableCell=t.TableHeaderCell=t.TableRow=t.TableHead=t.TableBody=t.Table=t.Rule=t.InlineCode=t.Strong=t.Emphasis=t.Break=t.Image=t.Strikethrough=t.Paragraph=t.Root=void 0,t.HTML=r,t.Heading=o,t.Unknown=i;var u=n(5),d=a(u),s=(t.Root="div",t.Paragraph="p",t.Strikethrough="del",t.Image="img",t.Break="br",t.Emphasis="em",t.Strong="strong",t.InlineCode="code",t.Rule="hr",t.Table="table",t.TableBody="tbody",t.TableHead="thead",t.TableRow="tr",t.TableHeaderCell="th",t.TableCell="td",t.Blockquote="blockquote",t.Code="code",t.Link="a",t.ListItem="li",t.OrderedList="ol",t.UnorderedList="ul",{root:{color:"#5F0101",background:"rgb(255, 231, 231)",fontWeight:"bold",fontFamily:"monospace"},heading:{background:"#FF7575",padding:5},report:{padding:10,margin:0}})},402:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.meta=t.ref=void 0;var l=n(403),r=a(l),o=n(404),i=a(o);t.ref=r["default"],t.meta=i["default"]},403:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e){var t=e.line,n=e.name,a=e.style;return i["default"].createElement("div",{style:r({},u.root,a)},i["default"].createElement("a",{name:n||t},"#"))}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};t["default"]=l;var o=n(5),i=a(o),u={root:{height:0,width:0,top:"-1em",visibility:"hidden",position:"relative"}}},404:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var i,u,d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(5),c=a(s),f=n(405),p={root:{color:"#444",background:"rgb(226, 226, 226)",fontWeight:"bold",fontFamily:"monospace"},heading:{background:"rgb(175, 175, 175)",padding:5},report:{padding:10,margin:0}},m=(u=i=function(e){function t(){return l(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),d(t,[{key:"render",value:function(){var e=JSON.stringify(this.context.reactdown.metadata,null,2);return c["default"].createElement("div",{style:p.root},c["default"].createElement("div",{style:p.heading},"Document metadata:"),c["default"].createElement("pre",{style:p.report},c["default"].createElement("code",null,e)))}}]),t}(c["default"].Component),i.contextTypes=f.contextTypes,u);t["default"]=m},405:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=t.contextTypes=void 0;var i,u,d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),s=n(5),c=a(s),f=t.contextTypes={reactdown:c["default"].PropTypes.object},p=(u=i=function(e){function t(){return l(this,t),r(this,Object.getPrototypeOf(t).apply(this,arguments))}return o(t,e),d(t,[{key:"getChildContext",value:function(){return{reactdown:this.props.context}}},{key:"render",value:function(){var e=this.props.children;return c["default"].Children.only(e)}}]),t}(c["default"].Component),i.childContextTypes=f,u);t["default"]=p},406:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e,t){var n=e.children,a=((0,o["default"])(e,["children"]),t.reactdown),l=a.model,r=a.metadata;return d["default"].createElement(i.Root,null,d["default"].createElement(f["default"],{title:r.title||l.title}),n)}Object.defineProperty(t,"__esModule",{value:!0}),t.Heading=t.ListItem=t.Link=t.Code=t.Strong=t.Emphasis=t.InlineCode=t.UnorderedList=t.OrderedList=t.Paragraph=void 0;var r=n(273),o=a(r);t.Root=l;var i=n(407);Object.defineProperty(t,"Paragraph",{enumerable:!0,get:function(){return i.Paragraph}}),Object.defineProperty(t,"OrderedList",{enumerable:!0,get:function(){return i.OrderedList}}),Object.defineProperty(t,"UnorderedList",{enumerable:!0,get:function(){return i.UnorderedList}}),Object.defineProperty(t,"InlineCode",{enumerable:!0,get:function(){return i.InlineCode}}),Object.defineProperty(t,"Emphasis",{enumerable:!0,get:function(){return i.Emphasis}}),Object.defineProperty(t,"Strong",{enumerable:!0,get:function(){return i.Strong}}),Object.defineProperty(t,"Code",{enumerable:!0,get:function(){return i.Code}}),Object.defineProperty(t,"Link",{enumerable:!0,get:function(){return i.Link}}),Object.defineProperty(t,"ListItem",{enumerable:!0,get:function(){return i.ListItem}}),Object.defineProperty(t,"Heading",{enumerable:!0,get:function(){return i.Heading}});var u=n(5),d=a(u),s=n(405),c=n(329),f=a(c);l.contextTypes=s.contextTypes},407:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function l(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].Root;return C["default"].createElement("div",(0,b["default"])({},t,{className:n}))}function r(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].Paragraph;return C["default"].createElement("p",(0,b["default"])({},t,{className:n}))}function o(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].OrderedList;return C["default"].createElement("ol",(0,b["default"])({},t,{className:n}))}function i(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].UnorderedList;return C["default"].createElement("ul",(0,b["default"])({},t,{className:n}))}function u(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].Code;return C["default"].createElement("pre",(0,b["default"])({},t,{className:n}))}function d(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].NoteRoot;return C["default"].createElement("div",(0,b["default"])({},t,{className:n}))}function s(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].TKRoot;return C["default"].createElement("div",(0,b["default"])({},t,{className:n}))}function c(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].Emphasis;return C["default"].createElement("em",(0,b["default"])({},t,{className:n}))}function f(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].Strong;return C["default"].createElement("strong",(0,b["default"])({},t,{className:n}))}function p(e){var t=e.variant,n=void 0===t?{}:t,a=(0,_["default"])(e,["variant"]),l=x["default"].Link+(n.hover?" "+x["default"].Link__hover:"");return C["default"].createElement(P.Link,(0,b["default"])({},a,{className:l}))}function m(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].ListItem;return C["default"].createElement("li",(0,b["default"])({},t,{className:n}))}function g(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].InlineCode;return C["default"].createElement("code",(0,b["default"])({},t,{className:n}))}function h(e){var t=(e.variant,(0,_["default"])(e,["variant"])),n=x["default"].Heading+(1==t.level?" "+x["default"].Heading__prop__6fa24d:"")+(2==t.level?" "+x["default"].Heading__prop__70ad44:"")+(3==t.level?" "+x["default"].Heading__prop__be9d2c:"")+(t.level>=4?" "+x["default"].Heading__prop__f335cd:"")+(t.level>=5?" "+x["default"].Heading__prop__d5070c:"");return C["default"].createElement(k.Heading,(0,b["default"])({},t,{className:n}))}Object.defineProperty(t,"__esModule",{value:!0});var v=n(235),b=a(v),S=n(273),_=a(S);t.Root=l,t.Paragraph=r,t.OrderedList=o,t.UnorderedList=i,t.Code=u,t.NoteRoot=d,t.TKRoot=s,t.Emphasis=c,t.Strong=f,t.Link=p,t.ListItem=m,t.InlineCode=g,t.Heading=h;var E=n(5),C=a(E),y=n(408),x=a(y),P=n(328),k=n(410)},408:function(e,t,n){var a=n(409);"string"==typeof a&&(a=[[e.id,a,""]]);n(340)(a,{});a.locals&&(e.exports=a.locals)},409:function(e,t,n){t=e.exports=n(339)(),t.push([e.id,"._1BD5gGOHp7L07wSNIiFtuJ,._1G_uk90_HC-G0Kg3ypWBfE,._1iIRk-vCjydbreUH5wYmsb,._2jt0kDNfkKBUXJIrZPQ6vP,._2vA9Fv7_BprK4mTnUjxmjO,._3-z2LH0GXphtxjuIZ-YGkm{margin-top:0;margin-bottom:1.7em}._2l1xEiMocah0FM40oX2Ok4{font-style:italic}._2HHESfbJM0yXxL44xkK-_E{font-weight:400}._-LFu3O-DQ48VJs3gktBgB{background:#f9f1b3;color:#555;text-decoration:none;font-weight:400;padding:1px 3px;margin:0 -3px}._-LFu3O-DQ48VJs3gktBgB:hover,.CpV7p95zDhsBQ-1QllMkm{background:#f5de1b;color:#000}._3-z2LH0GXphtxjuIZ-YGkm{line-height:1.6em}._1BD5gGOHp7L07wSNIiFtuJ,._2vA9Fv7_BprK4mTnUjxmjO{padding-left:1.5em}._1BD5gGOHp7L07wSNIiFtuJ>._3mqK_imVz2pmuFo4qp1ck2{list-style-type:square}._3mqK_imVz2pmuFo4qp1ck2>._3-z2LH0GXphtxjuIZ-YGkm{margin-bottom:.5em}._3zwAWp1UNPXpIZEfh1SeHx{font-size:10pt;padding:2px;margin:0 -2px;padding-bottom:0}._1G_uk90_HC-G0Kg3ypWBfE,._3zwAWp1UNPXpIZEfh1SeHx{font-family:Menlo,Monaco,monospace;background:#f9f9f9}._1G_uk90_HC-G0Kg3ypWBfE{color:#555;border-bottom:1px solid #c7c7c7;font-size:9pt;overflow:auto;padding:1.5em 0;padding-left:20px}._1TrPe8ukTbq6O2Upi785po{position:relative;margin-top:2em;margin-bottom:1em;text-transform:uppercase;font-weight:800}._3H8MnuBjFq3THNcKWdVQD3{letter-spacing:-1px;font-size:2rem}._3TDFHgVSrReu3101TyFoUr{letter-spacing:-1px;font-size:1.75rem}._3a6123WaQzUbYIEKV27Y22{letter-spacing:-1px;font-size:1.3rem}._2kdxUN4NgtJEGiCzgXNCXU{letter-spacing:-.5px;font-size:1rem;color:#666}._2odBDYK20ItUOV0qFIi5RL{font-size:.8rem}@media only screen and (min-width:600px){._3zwAWp1UNPXpIZEfh1SeHx{font-size:9pt}}",""]),t.locals={Root:"_2s_6m2ddItDLTaYNlQ3El",Paragraph:"_3-z2LH0GXphtxjuIZ-YGkm",OrderedList:"_2vA9Fv7_BprK4mTnUjxmjO",UnorderedList:"_1BD5gGOHp7L07wSNIiFtuJ",Code:"_1G_uk90_HC-G0Kg3ypWBfE",NoteRoot:"_2jt0kDNfkKBUXJIrZPQ6vP",TKRoot:"_1iIRk-vCjydbreUH5wYmsb",Emphasis:"_2l1xEiMocah0FM40oX2Ok4",Strong:"_2HHESfbJM0yXxL44xkK-_E",Link:"_-LFu3O-DQ48VJs3gktBgB",Link__hover:"CpV7p95zDhsBQ-1QllMkm",ListItem:"_3mqK_imVz2pmuFo4qp1ck2",InlineCode:"_3zwAWp1UNPXpIZEfh1SeHx",Heading:"_1TrPe8ukTbq6O2Upi785po",Heading__prop__6fa24d:"_3H8MnuBjFq3THNcKWdVQD3",Heading__prop__70ad44:"_3TDFHgVSrReu3101TyFoUr",Heading__prop__be9d2c:"_3a6123WaQzUbYIEKV27Y22",Heading__prop__f335cd:"_2kdxUN4NgtJEGiCzgXNCXU",Heading__prop__d5070c:"_2odBDYK20ItUOV0qFIi5RL"}},410:function(e,t,n){e.exports=n(401)},412:function(e,t,n){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function l(e){return e&&e.__esModule?e:{"default":e}}function r(e){var t=e.className,n=e.style;return d["default"].createElement(s.DocumentContext,{context:{metadata:m,model:g}},d["default"].cloneElement(d["default"].createElement(p.Root,null,d["default"].createElement(p.Heading,{level:3},"Content tree"),d["default"].createElement(p.Paragraph,null,"Content tree specifies what pages does the site have and how to navigate between\nthem. It should be specified in ",d["default"].createElement(p.InlineCode,null,"sitegen.config.js")," and exported under ",d["default"].createElement(p.InlineCode,null,"route"),"\nname."),d["default"].createElement(p.Paragraph,null,"The type of the content tree:"),d["default"].createElement(p.Code,null,"type ContentTree = Page | Collection\n"),d["default"].createElement(p.Heading,{level:4},"Pages"),d["default"].createElement(p.Paragraph,null,"The ",d["default"].createElement(p.InlineCode,null,"Page")," type represents pages of the site."),d["default"].createElement(p.Paragraph,null,"Sub pages can be specified using optional ",d["default"].createElement(p.InlineCode,null,"route")," key which is a mapping from\npath segments to remainings of the content tree."),d["default"].createElement(p.Paragraph,null,"The content of the page can be split from the main bundle by setting ",d["default"].createElement(p.InlineCode,null,"split: true"),". This is useful if a page contains a lot of custom JS code which specific\nfor the page."),d["default"].createElement(p.Code,null,"type Page = {\n  page: string,\n  route?: {\n    [pathSegment: string]: ContentTree\n  },\n  split?: boolean\n}\n"),d["default"].createElement(p.Heading,{level:4},"Collections"),d["default"].createElement(p.Paragraph,null,"The ",d["default"].createElement(p.InlineCode,null,"Collection")," type represents collections of related pages, such as blog\nposts for example."),d["default"].createElement(p.Paragraph,null,"The ",d["default"].createElement(p.InlineCode,null,"collection")," specifies pattern (using glob syntax) and optional pagination\nstrategy. By default all the pages in the collections are split from the main\nbundle."),d["default"].createElement(p.Code,null,"type Collection = {\n  page: string,\n  collection: {\n    pattern: string\n    paginate?: {size: number}\n  },\n  split?: boolean\n}\n"),d["default"].createElement(p.Heading,{level:4},"Examples"),d["default"].createElement(p.Paragraph,null,"The simplest example for a site consisting of a single page:"),d["default"].createElement(p.Code,null,"export let route = {page: './Site.js'}\n"),d["default"].createElement(p.Paragraph,null,"Site with a single chrome component and multiple pages:"),d["default"].createElement(p.Code,null,"export let route = {\n  page: './Site.js',\n  route: {\n    index: './Main.js',\n    docs: './Docs.md',\n    about: './About.md',\n  }\n}\n"),d["default"].createElement(p.Paragraph,null,"Site with a collection of blog posts:"),d["default"].createElement(p.Code,null,"export let route = {\n  page: './Site.js',\n  route: {\n    index: {\n      page: './Blog.js',\n      collection: {\n        pattern: './posts/*.md'\n      }\n    },\n    about: './About.js',\n  }\n}\n"),d["default"].createElement(p.Heading,{level:3},"Components"),d["default"].createElement(p.Paragraph,null,"As Sitegen allows you to use React component you can find on npm there's little\nwe can ship in its distribution. Though there are some components which are\nspecific to how Sitegen works."),d["default"].createElement(p.Heading,{level:4},"<","Link /",">"),d["default"].createElement(p.Paragraph,null,d["default"].createElement(p.InlineCode,null,"<Link />")," component is used to define navigation between pages. While standard\n",d["default"].createElement(p.InlineCode,null,"<a />")," is usable with Sitegen it reloads the browser page on transitions, use\n",d["default"].createElement(p.InlineCode,null,"<Link />")," to provide non-reloading page transitions:"),d["default"].createElement(p.Code,null,"import {Link} from 'sitegen'\n\n<Link href=\"/about\" />\n"),d["default"].createElement(p.Heading,{level:4},"<","Meta /",">"),d["default"].createElement(p.Paragraph,null,d["default"].createElement(p.InlineCode,null,"<Meta />")," component allows to specify page metadata such as title and others:"),d["default"].createElement(p.Code,null,"import {Meta} from 'sitegen'\n\n<Meta title=\"Main Page\" />\n"),d["default"].createElement(p.Paragraph,null,"The component is based of ",d["default"].createElement(p.Link,{href:"https://github.com/nfl/react-helmet",title:null},"React Helmet")," library, consult its docs for usage."),null,d["default"].createElement(p.Heading,{level:3},"Compiler"),d["default"].createElement(p.Heading,{level:3},"Guides"),d["default"].createElement(p.Heading,{level:4},"SASS/SCSS"),d["default"].createElement(p.Paragraph,null,"SASS/SCSS support can be provided via ",d["default"].createElement(p.Link,{href:"https://github.com/jtangelder/sass-loader",title:null},"sass-loader")," (which uses ",d["default"].createElement(p.Link,{href:"https://github.com/sass/libsass",title:null},"libsass"),")."),d["default"].createElement(p.Paragraph,null,"Install both libraries from npm:"),d["default"].createElement(p.Code,null,"% npm i install sass-loader libsass --save\n"),d["default"].createElement(p.Paragraph,null,"Then add the loader for corresponding file extensions in ",d["default"].createElement(p.InlineCode,null,"sitegen.config.js"),":"),d["default"].createElement(p.Code,null,"import {CSS, extractCSS, injectCSS} from 'sitegen/config'\n\nexport function configure({env}) {\n  let deployCSS = env.development ? injectCSS : extractCSS\n  let SASS = deployCSS(CSS, 'sass-loader'),\n\n  return {\n    globalLoaders: {\n      '**/*.scss': SASS,\n      '**/*.sass': SASS,\n    },\n  }\n}\n"),null,null,d["default"].createElement(p.Heading,{level:4},"LESS"),d["default"].createElement(p.Paragraph,null,"LESS support can be provided via ",d["default"].createElement(p.Link,{href:"https://github.com/webpack/less-loader",title:null},"less-loader"),"."),d["default"].createElement(p.Paragraph,null,"Install it from npm:"),d["default"].createElement(p.Code,null,"% npm i install less-loader --save\n"),d["default"].createElement(p.Paragraph,null,"Then add the loader for corresponding file extensions in ",d["default"].createElement(p.InlineCode,null,"sitegen.config.js"),":"),d["default"].createElement(p.Code,null,"import {CSS, extractCSS, injectCSS} from 'sitegen/config'\n\nexport function configure({env}) {\n  let deployCSS = env.development ? injectCSS : extractCSS\n\n  return {\n    globalLoaders: {\n      '**/*.less': deployCSS(CSS, 'less-loader'),\n    },\n  }\n}\n"),null,d["default"].createElement(p.Heading,{level:4},"CSS Modules"),d["default"].createElement(p.Paragraph,null,d["default"].createElement(p.Link,{href:"https://github.com/css-modules/css-modules",title:null},"CSS Modules")," is technique for writing modular CSS which scales well with the\napp size."),d["default"].createElement(p.Paragraph,null,"As CSS Modules are implemented by the built-in ",d["default"].createElement(p.Link,{href:"https://github.com/webpack/css-loader",title:null},"css-loader")," Webpack loader the\nonly thing we need is to enable processing for CSS modules in the\n",d["default"].createElement(p.InlineCode,null,"sitegen.config.js"),":"),d["default"].createElement(p.Code,null,"import {CSS, extractCSS, injectCSS} from 'sitegen/config';\n\nexport function configure({env}) {\n  let deployCSS = env.development ? injectCSS : extractCSS;\n  return {\n    globalLoaders: {\n      '**/*.mcss': deployCSS(CSS({modules: true})),\n    },\n  };\n}\n"),null,null,d["default"].createElement(p.Heading,{level:4},"PostCSS (Autoprefixer)"),d["default"].createElement(p.Paragraph,null,d["default"].createElement(p.Link,{href:"http://postcss.org/",title:null},"PostCSS")," is a popular framework for process CSS. It is the most famous for\n",d["default"].createElement(p.Link,{href:"https://github.com/postcss/autoprefixer",title:null},"Autoprefixer"),", a tool which automatically adds prefixes to CSS."),d["default"].createElement(p.Paragraph,null,"PostCSS is easy to use with Sitegen. You need to enable support for it via\n",d["default"].createElement(p.Link,{href:"https://github.com/postcss/postcss-loader",title:null},"postcss-loader"),"."),d["default"].createElement(p.Paragraph,null,"Install it from npm:"),d["default"].createElement(p.Code,null,"% npm i install postcss-loader autoprefixer --save\n"),d["default"].createElement(p.Paragraph,null,"Then add the loader for corresponding file extensions in ",d["default"].createElement(p.InlineCode,null,"sitegen.config.js"),":"),d["default"].createElement(p.Code,null,"import autoprefixer from 'autoprefixer'\nimport {CSS, extractCSS, injectCSS} from 'sitegen/config'\n\nexport function configure({env}) {\n  let deployCSS = env.development ? injectCSS : extractCSS\n\n  return {\n    globalLoaders: {\n      '**/*.css': deployCSS(CSS, 'postcss-loader'),\n    },\n\n    postcss() {\n      return [autoprefixer]\n    },\n  }\n}\n"),null,null,null),{className:t,style:n}))}Object.defineProperty(t,"__esModule",{value:!0}),t.model=t.metadata=void 0;var o=n(235),i=l(o);t["default"]=r;var u=n(5),d=l(u),s=n(399),c=n(406),f=a(c),p=(0,i["default"])({},s.components,f),m=t.metadata={},g=t.model={toc:[{value:"Content tree",depth:3},{value:"Pages",depth:4},{value:"Collections",depth:4},{value:"Examples",depth:4},{value:"Components",depth:3},{value:"<Link />",depth:4},{value:"<Meta />",depth:4},{value:"Compiler",depth:3},{value:"Guides",depth:3},{value:"SASS/SCSS",depth:4},{value:"LESS",depth:4},{value:"CSS Modules",depth:4},{value:"PostCSS (Autoprefixer)",depth:4}],title:null}}});