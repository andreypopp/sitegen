webpackJsonp([1],{

/***/ 397:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.model = exports.metadata = undefined;

	var _extends2 = __webpack_require__(235);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.default = Document;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _runtime = __webpack_require__(398);

	var _components = __webpack_require__(405);

	var customComponents = _interopRequireWildcard(_components);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var components = (0, _extends3.default)({}, _runtime.components, customComponents);
	function Document(_ref) {
	  var className = _ref.className;
	  var style = _ref.style;

	  return _react2.default.createElement(_runtime.DocumentContext, {
	    context: {
	      metadata: metadata,
	      model: model
	    }
	  }, _react2.default.cloneElement(_react2.default.createElement(components.Root, null, _react2.default.createElement(components.Heading, {
	    "level": 3
	  }, "Introduction & Motivation"), _react2.default.createElement(components.Paragraph, null, "Sitegen is a static site generator based on ", _react2.default.createElement(components.Link, {
	    "href": "https://webpack.github.io",
	    "title": null
	  }, "Webpack"), " and ", _react2.default.createElement(components.Link, {
	    "href": "https://reactjs.org",
	    "title": null
	  }, "React"), "."), _react2.default.createElement(components.Paragraph, null, "Sitegen's motivation is to provide a framework for content based sites with\n", _react2.default.createElement(components.Strong, null, "simple API"), " to take the advantage of React ", _react2.default.createElement(components.Strong, null, "component model"), " and rich\nWebpack ecosystem."), _react2.default.createElement(components.Paragraph, null, "The usage scenarious for Sitegen are ", _react2.default.createElement(components.Strong, null, "static sites"), ", ", _react2.default.createElement(components.Strong, null, "blogs"), ", ", _react2.default.createElement(components.Strong, null, "project\ndocumentation"), ", presentation ", _react2.default.createElement(components.Strong, null, "slide decks"), ", live ", _react2.default.createElement(components.Strong, null, "styleguides"), " and other\nsimilar content based sites."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Component model"), _react2.default.createElement(components.Paragraph, null, "Sitegen embraces ", _react2.default.createElement(components.Link, {
	    "href": "https://reactjs.org",
	    "title": null
	  }, "React"), " for its component model."), _react2.default.createElement(components.Paragraph, null, "Any element of Sitegen site is a React component. Be it a site design element or\na piece even content. The latter allows to Sitegen to host sites with dynamic\ncontent easily."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Flexible build pipeline"), _react2.default.createElement(components.Paragraph, null, _react2.default.createElement(components.Link, {
	    "href": "https://webpack.github.io",
	    "title": null
	  }, "Webpack"), " is at the core of Sitegen compiler."), _react2.default.createElement(components.Paragraph, null, "Every Webpack plugin or loader is automatically compatible with Sitegen site:\n", _react2.default.createElement(components.Strong, null, "code splitting"), ", support for ", _react2.default.createElement(components.Strong, null, "CSS preprocessors"), ", ", _react2.default.createElement(components.Strong, null, "optimizations"), ", ", _react2.default.createElement(components.Strong, null, "hot\nmodule reloading"), " and a multiple others."), _react2.default.createElement(components.Paragraph, null, "Sitegen comes with a sane configuration for Webpack out of the box. But it is\neasy to ", _react2.default.createElement(components.Strong, null, "override"), " parts of it or ", _react2.default.createElement(components.Strong, null, "extend"), " with new behaviours."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Rich & extensible markup"), _react2.default.createElement(components.Paragraph, null, "Sitegen has support for markdown syntax out of the box."), _react2.default.createElement(components.Paragraph, null, "Moreover the support is provided by ", _react2.default.createElement(components.Link, {
	    "href": "https://andreypopp.github.io/reactdown",
	    "title": null
	  }, "Reactdown"), " which allows to extend\nmarkdown syntax with arbitrary elements:"), _react2.default.createElement(components.Code, null, "..live-code-example\n\n  console.log('Hello, world!');\n"), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Simple API"), _react2.default.createElement(components.Paragraph, null, "Sitegen API is extremely simple. The most simple site takes 3 easy steps to\ntake."), _react2.default.createElement(components.Heading, {
	    "level": 5
	  }, "1. Define content tree"), _react2.default.createElement(components.Paragraph, null, "Content tree describes the structure of your site:"), _react2.default.createElement(components.Code, null, "export let route = {\n  page: './Site'\n}\n"), _react2.default.createElement(components.Heading, {
	    "level": 5
	  }, "2. Create React component"), _react2.default.createElement(components.Paragraph, null, "Page is rendered with a regular React component:"), _react2.default.createElement(components.Code, null, "export default function Site() {\n  return <div>Hello, world</div>\n}\n"), _react2.default.createElement(components.Heading, {
	    "level": 5
	  }, "3. Run dev server & iterate"), _react2.default.createElement(components.Paragraph, null, "Run development server with hot reloading & iterate on your site:"), _react2.default.createElement(components.Code, null, "% sitegen-serve\n"), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "What's next"), _react2.default.createElement(components.Paragraph, null, "Ready to start using Sitegen? Follow the link to the ", _react2.default.createElement(components.Link, {
	    "href": "/tutorial",
	    "title": null
	  }, "tutorial"), " and then\nconsult the ", _react2.default.createElement(components.Link, {
	    "href": "/docs",
	    "title": null
	  }, "documentation"), "."), null, null, null, null, null), {
	    className: className,
	    style: style
	  }));
	}
	var metadata = exports.metadata = {};
	var model = exports.model = {
	  "toc": [{
	    "value": "Introduction & Motivation",
	    "depth": 3
	  }, {
	    "value": "Component model",
	    "depth": 4
	  }, {
	    "value": "Flexible build pipeline",
	    "depth": 4
	  }, {
	    "value": "Rich & extensible markup",
	    "depth": 4
	  }, {
	    "value": "Simple API",
	    "depth": 4
	  }, {
	    "value": "1. Define content tree",
	    "depth": 5
	  }, {
	    "value": "2. Create React component",
	    "depth": 5
	  }, {
	    "value": "3. Run dev server & iterate",
	    "depth": 5
	  }, {
	    "value": "What's next",
	    "depth": 4
	  }],
	  "title": null
		};

/***/ },

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(399);


/***/ },

/***/ 399:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DocumentContext = exports.directives = exports.components = undefined;

	var _components2 = __webpack_require__(400);

	var _components = _interopRequireWildcard(_components2);

	var _directives2 = __webpack_require__(401);

	var _directives = _interopRequireWildcard(_directives2);

	var _DocumentContext2 = __webpack_require__(404);

	var _DocumentContext3 = _interopRequireDefault(_DocumentContext2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.components = _components; /**
	                                   * Reactdown runtime.
	                                   *
	                                   * Runtime contains all modules which are by default imported by compiled
	                                   * Reactdown documents. This allows easier configuration when you need bundle
	                                   * them separately.
	                                   *
	                                   * @copyright 2016-present, Reactdown team
	                                   */

	exports.directives = _directives;
	exports.DocumentContext = _DocumentContext3.default;


/***/ },

/***/ 400:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UnorderedList = exports.OrderedList = exports.ListItem = exports.Link = exports.Code = exports.Blockquote = exports.TableCell = exports.TableHeaderCell = exports.TableRow = exports.TableHead = exports.TableBody = exports.Table = exports.Rule = exports.InlineCode = exports.Strong = exports.Emphasis = exports.Break = exports.Image = exports.Strikethrough = exports.Paragraph = exports.Root = undefined;
	exports.HTML = HTML;
	exports.Heading = Heading;
	exports.Unknown = Unknown;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
	                                                                                                                                                                                                                              * @copyright 2016-present, Reactdown team
	                                                                                                                                                                                                                              * 
	                                                                                                                                                                                                                              */

	var Root = exports.Root = 'div';
	var Paragraph = exports.Paragraph = 'p';
	var Strikethrough = exports.Strikethrough = 'del';
	var Image = exports.Image = 'img';
	var Break = exports.Break = 'br';
	var Emphasis = exports.Emphasis = 'em';
	var Strong = exports.Strong = 'strong';
	var InlineCode = exports.InlineCode = 'code';
	var Rule = exports.Rule = 'hr';
	var Table = exports.Table = 'table';
	var TableBody = exports.TableBody = 'tbody';
	var TableHead = exports.TableHead = 'thead';
	var TableRow = exports.TableRow = 'tr';
	var TableHeaderCell = exports.TableHeaderCell = 'th';
	var TableCell = exports.TableCell = 'td';
	var Blockquote = exports.Blockquote = 'blockquote';
	var Code = exports.Code = 'code';
	var Link = exports.Link = 'a';
	var ListItem = exports.ListItem = 'li';
	var OrderedList = exports.OrderedList = 'ol';
	var UnorderedList = exports.UnorderedList = 'ul';

	function HTML(_ref) {
	  var html = _ref.html;

	  return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: html } });
	}

	function Heading(_ref2) {
	  var level = _ref2.level;

	  var props = _objectWithoutProperties(_ref2, ['level']);

	  var Component = 'h' + Math.min(level, 6);
	  return _react2.default.createElement(Component, props);
	}

	var unknownStyle = {
	  root: {
	    color: '#5F0101',
	    background: 'rgb(255, 231, 231)',
	    fontWeight: 'bold',
	    fontFamily: 'monospace'
	  },
	  heading: {
	    background: '#FF7575',
	    padding: 5
	  },
	  report: {
	    padding: 10,
	    margin: 0
	  }
	};

	function Unknown(_ref3) {
	  var children = _ref3.children;

	  return _react2.default.createElement(
	    'div',
	    { style: unknownStyle.root },
	    _react2.default.createElement(
	      'div',
	      { style: unknownStyle.heading },
	      'Unknown node found:'
	    ),
	    _react2.default.createElement(
	      'pre',
	      { style: unknownStyle.report },
	      _react2.default.createElement(
	        'code',
	        null,
	        children
	      )
	    )
	  );
	}


/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.meta = exports.ref = undefined;

	var _ref2 = __webpack_require__(402);

	var _ref3 = _interopRequireDefault(_ref2);

	var _meta2 = __webpack_require__(403);

	var _meta3 = _interopRequireDefault(_meta2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.ref = _ref3.default; /**
	                              * @copyright 2016-present, Reactdown team
	                              */

	exports.meta = _meta3.default;


/***/ },

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * @copyright 2016-present, Reactdown Team
	                                                                                                                                                                                                                                                                   * 
	                                                                                                                                                                                                                                                                   */

	exports.default = ref;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var refStyle = {
	  root: {
	    height: 0,
	    width: 0,
	    top: '-1em',
	    visibility: 'hidden',
	    position: 'relative'
	  }
	};

	function ref(_ref) {
	  var line = _ref.line;
	  var name = _ref.name;
	  var style = _ref.style;

	  return _react2.default.createElement(
	    'div',
	    { style: _extends({}, refStyle.root, style) },
	    _react2.default.createElement(
	      'a',
	      { name: name || line },
	      '#'
	    )
	  );
	}


/***/ },

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; /**
	                    * @copyright 2016-present, Reactdown Team
	                    * 
	                    */

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _DocumentContext = __webpack_require__(404);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var metaStyle = {
	  root: {
	    color: '#444',
	    background: 'rgb(226, 226, 226)',
	    fontWeight: 'bold',
	    fontFamily: 'monospace'
	  },
	  heading: {
	    background: 'rgb(175, 175, 175)',
	    padding: 5
	  },
	  report: {
	    padding: 10,
	    margin: 0
	  }
	};

	var meta = (_temp = _class = function (_React$Component) {
	  _inherits(meta, _React$Component);

	  function meta() {
	    _classCallCheck(this, meta);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(meta).apply(this, arguments));
	  }

	  _createClass(meta, [{
	    key: 'render',
	    value: function render() {
	      var metadata = JSON.stringify(this.context.reactdown.metadata, null, 2);
	      return _react2.default.createElement(
	        'div',
	        { style: metaStyle.root },
	        _react2.default.createElement(
	          'div',
	          { style: metaStyle.heading },
	          'Document metadata:'
	        ),
	        _react2.default.createElement(
	          'pre',
	          { style: metaStyle.report },
	          _react2.default.createElement(
	            'code',
	            null,
	            metadata
	          )
	        )
	      );
	    }
	  }]);

	  return meta;
	}(_react2.default.Component), _class.contextTypes = _DocumentContext.contextTypes, _temp);
	exports.default = meta;


/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = exports.contextTypes = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp; /**
	                    * @copyright 2016-present, Reactdown Team
	                    * 
	                    */

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var contextTypes = exports.contextTypes = {
	  reactdown: _react2.default.PropTypes.object
	};

	var DocumentContext = (_temp = _class = function (_React$Component) {
	  _inherits(DocumentContext, _React$Component);

	  function DocumentContext() {
	    _classCallCheck(this, DocumentContext);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DocumentContext).apply(this, arguments));
	  }

	  _createClass(DocumentContext, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { reactdown: this.props.context };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      return _react2.default.Children.only(children);
	    }
	  }]);

	  return DocumentContext;
	}(_react2.default.Component), _class.childContextTypes = contextTypes, _temp);
	exports.default = DocumentContext;


/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Heading = exports.ListItem = exports.Link = exports.Code = exports.Strong = exports.Emphasis = exports.InlineCode = exports.UnorderedList = exports.OrderedList = exports.Paragraph = undefined;

	var _objectWithoutProperties2 = __webpack_require__(273);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	exports.Root = Root;

	var _componentsComponent = __webpack_require__(406);

	Object.defineProperty(exports, 'Paragraph', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.Paragraph;
	  }
	});
	Object.defineProperty(exports, 'OrderedList', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.OrderedList;
	  }
	});
	Object.defineProperty(exports, 'UnorderedList', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.UnorderedList;
	  }
	});
	Object.defineProperty(exports, 'InlineCode', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.InlineCode;
	  }
	});
	Object.defineProperty(exports, 'Emphasis', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.Emphasis;
	  }
	});
	Object.defineProperty(exports, 'Strong', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.Strong;
	  }
	});
	Object.defineProperty(exports, 'Code', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.Code;
	  }
	});
	Object.defineProperty(exports, 'Link', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.Link;
	  }
	});
	Object.defineProperty(exports, 'ListItem', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.ListItem;
	  }
	});
	Object.defineProperty(exports, 'Heading', {
	  enumerable: true,
	  get: function get() {
	    return _componentsComponent.Heading;
	  }
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _DocumentContext = __webpack_require__(404);

	var _reactHelmet = __webpack_require__(329);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @copyright 2016-present, Reactdown team
	 */

	function Root(_ref, _ref2) {
	  var children = _ref.children;
	  var props = (0, _objectWithoutProperties3.default)(_ref, ['children']);
	  var _ref2$reactdown = _ref2.reactdown;
	  var model = _ref2$reactdown.model;
	  var metadata = _ref2$reactdown.metadata;

	  return _react2.default.createElement(
	    _componentsComponent.Root,
	    null,
	    _react2.default.createElement(_reactHelmet2.default, { title: metadata.title || model.title }),
	    children
	  );
	}
	Root.contextTypes = _DocumentContext.contextTypes;

/***/ },

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(235);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(273);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	exports.Root = Root;
	exports.Paragraph = Paragraph;
	exports.OrderedList = OrderedList;
	exports.UnorderedList = UnorderedList;
	exports.Code = Code;
	exports.NoteRoot = NoteRoot;
	exports.TKRoot = TKRoot;
	exports.Emphasis = Emphasis;
	exports.Strong = Strong;
	exports.Link = Link;
	exports.ListItem = ListItem;
	exports.InlineCode = InlineCode;
	exports.Heading = Heading;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _componentsComponent = __webpack_require__(407);

	var _componentsComponent2 = _interopRequireDefault(_componentsComponent);

	var _lib = __webpack_require__(328);

	var _components = __webpack_require__(409);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Root(_ref) {
	  var _ref$variant = _ref.variant;
	  var variant = _ref$variant === undefined ? {} : _ref$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref, ["variant"]);

	  var className = _componentsComponent2.default.Root;
	  return _react2.default.createElement("div", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function Paragraph(_ref2) {
	  var _ref2$variant = _ref2.variant;
	  var variant = _ref2$variant === undefined ? {} : _ref2$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref2, ["variant"]);

	  var className = _componentsComponent2.default.Paragraph;
	  return _react2.default.createElement("p", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function OrderedList(_ref3) {
	  var _ref3$variant = _ref3.variant;
	  var variant = _ref3$variant === undefined ? {} : _ref3$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref3, ["variant"]);

	  var className = _componentsComponent2.default.OrderedList;
	  return _react2.default.createElement("ol", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function UnorderedList(_ref4) {
	  var _ref4$variant = _ref4.variant;
	  var variant = _ref4$variant === undefined ? {} : _ref4$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref4, ["variant"]);

	  var className = _componentsComponent2.default.UnorderedList;
	  return _react2.default.createElement("ul", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function Code(_ref5) {
	  var _ref5$variant = _ref5.variant;
	  var variant = _ref5$variant === undefined ? {} : _ref5$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref5, ["variant"]);

	  var className = _componentsComponent2.default.Code;
	  return _react2.default.createElement("pre", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function NoteRoot(_ref6) {
	  var _ref6$variant = _ref6.variant;
	  var variant = _ref6$variant === undefined ? {} : _ref6$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref6, ["variant"]);

	  var className = _componentsComponent2.default.NoteRoot;
	  return _react2.default.createElement("div", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function TKRoot(_ref7) {
	  var _ref7$variant = _ref7.variant;
	  var variant = _ref7$variant === undefined ? {} : _ref7$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref7, ["variant"]);

	  var className = _componentsComponent2.default.TKRoot;
	  return _react2.default.createElement("div", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function Emphasis(_ref8) {
	  var _ref8$variant = _ref8.variant;
	  var variant = _ref8$variant === undefined ? {} : _ref8$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref8, ["variant"]);

	  var className = _componentsComponent2.default.Emphasis;
	  return _react2.default.createElement("em", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function Strong(_ref9) {
	  var _ref9$variant = _ref9.variant;
	  var variant = _ref9$variant === undefined ? {} : _ref9$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref9, ["variant"]);

	  var className = _componentsComponent2.default.Strong;
	  return _react2.default.createElement("strong", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function Link(_ref10) {
	  var _ref10$variant = _ref10.variant;
	  var variant = _ref10$variant === undefined ? {} : _ref10$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref10, ["variant"]);

	  var className = _componentsComponent2.default.Link + (variant.hover ? ' ' + _componentsComponent2.default.Link__hover : '');
	  return _react2.default.createElement(_lib.Link, (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function ListItem(_ref11) {
	  var _ref11$variant = _ref11.variant;
	  var variant = _ref11$variant === undefined ? {} : _ref11$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref11, ["variant"]);

	  var className = _componentsComponent2.default.ListItem;
	  return _react2.default.createElement("li", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function InlineCode(_ref12) {
	  var _ref12$variant = _ref12.variant;
	  var variant = _ref12$variant === undefined ? {} : _ref12$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref12, ["variant"]);

	  var className = _componentsComponent2.default.InlineCode;
	  return _react2.default.createElement("code", (0, _extends3.default)({}, props, { className: className
	  }));
	}
	function Heading(_ref13) {
	  var _ref13$variant = _ref13.variant;
	  var variant = _ref13$variant === undefined ? {} : _ref13$variant;
	  var props = (0, _objectWithoutProperties3.default)(_ref13, ["variant"]);

	  var className = _componentsComponent2.default.Heading + (props.level == 1 ? ' ' + _componentsComponent2.default.Heading__prop__6fa24d : '') + (props.level == 2 ? ' ' + _componentsComponent2.default.Heading__prop__70ad44 : '') + (props.level == 3 ? ' ' + _componentsComponent2.default.Heading__prop__be9d2c : '') + (props.level >= 4 ? ' ' + _componentsComponent2.default.Heading__prop__f335cd : '') + (props.level >= 5 ? ' ' + _componentsComponent2.default.Heading__prop__d5070c : '');
	  return _react2.default.createElement(_components.Heading, (0, _extends3.default)({}, props, { className: className
	  }));
		}

/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(408);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(340)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.store/css-loader@0.23.1/_/index.js?modules!./../node_modules/.store/react-css-components@0.6.4/_/webpack.js?css!./components.component.css", function() {
				var newContent = require("!!./../node_modules/.store/css-loader@0.23.1/_/index.js?modules!./../node_modules/.store/react-css-components@0.6.4/_/webpack.js?css!./components.component.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(339)();
	// imports


	// module
	exports.push([module.id, "._3V-vWI_pKhjgD20Pbky8mB {}\n\n._13qM6ZOIcYN-7Zt2XhUo7s,._2Bm09dnXJbjRkRMohcz7BE,._3ILHFYPi3fKVu2yoAJxsnw,._3CVf16R67oinxNeugvfQbe,._257I87mREsHpw3oDwdRk3C,._2PJi3UaFy_jj4iQPr3HIF4 {\n\n    margin-top: 0em;\n\n    margin-bottom: 1.7em\n}\n\n.SlSGFn7AcKWUGt_FN4OSR {\n\n    font-style: italic\n}\n\n._10LLyjlTmbzGgF-qUbyNS0 {\n\n    font-weight: 400\n}\n\n._1feUKbtL6o2BY7LHFu309r {\n\n    background: #F9F1B3;\n\n    color: #555;\n\n    text-decoration: none;\n\n    font-weight: 400;\n\n    padding: 1px 3px;\n\n    margin: 0 -3px\n}\n._1feUKbtL6o2BY7LHFu309r:hover,._1E6qd1tG3NSee6ZQUyGSrL {\n\n    background: #F5DE1B;\n\n    color: #000\n}\n\n._13qM6ZOIcYN-7Zt2XhUo7s {\n\n    line-height: 1.6em\n}\n\n._2Bm09dnXJbjRkRMohcz7BE {\n\n    padding-left: 1.5em\n}\n\n._3ILHFYPi3fKVu2yoAJxsnw {\n\n    padding-left: 1.5em\n}\n\n._3ILHFYPi3fKVu2yoAJxsnw > ._2yZ4M3izZKx12GYTtxBYh5 {\n\n    list-style-type: square\n}\n\n._2yZ4M3izZKx12GYTtxBYh5 {}\n\n._2yZ4M3izZKx12GYTtxBYh5 > ._13qM6ZOIcYN-7Zt2XhUo7s {\n\n    margin-bottom: 0.5em\n}\n\n._-KSKYmcpT9LB-CBp4nhd {\n\n    font-family: Menlo, Monaco, monospace;\n\n    font-size: 9pt;\n\n    padding: 2px 2px;\n\n    margin: 0 -2px;\n\n    padding-bottom: 0px;\n\n    background: #F9F9F9\n}\n\n._3CVf16R67oinxNeugvfQbe {\n\n    background: #F9F9F9;\n\n    color: #555;\n\n    border-bottom: 1px solid #C7C7C7;\n\n    font-family: Menlo, Monaco, monospace;\n\n    font-size: 9pt;\n\n    padding: 1.5em 0;\n\n    padding-left: 20px\n}\n\n._3PKS-hrCne3h65WEtfYapu {\n\n    position: relative;\n\n    margin-top: 2em;\n\n    margin-bottom: 1em;\n\n    text-transform: uppercase;\n\n    font-weight: 800\n}\n\n._1ekSETpVXskmLdn8hYGGp2 {\n\n    letter-spacing: -1px;\n\n    font-size: 2rem\n}\n\n._3PKhAlNFNzQ7PPHtUMLezb {\n\n    letter-spacing: -1px;\n\n    font-size: 1.75rem\n}\n\n.huCueFxdph6FlJE0XW1e3 {\n\n    letter-spacing: -1px;\n\n    font-size: 1.3rem\n}\n\n.Y-A9qvk6mnHJK1hkwHmLx {\n\n    letter-spacing: -0.5px;\n\n    font-size: 1rem;\n\n    color: #666\n}\n\n._2rb1A_weJxwX-fE9dIdNyU {\n\n    font-size: 0.8rem\n}\n", ""]);

	// exports
	exports.locals = {
		"Root": "_3V-vWI_pKhjgD20Pbky8mB",
		"Paragraph": "_13qM6ZOIcYN-7Zt2XhUo7s",
		"OrderedList": "_2Bm09dnXJbjRkRMohcz7BE",
		"UnorderedList": "_3ILHFYPi3fKVu2yoAJxsnw",
		"Code": "_3CVf16R67oinxNeugvfQbe",
		"NoteRoot": "_257I87mREsHpw3oDwdRk3C",
		"TKRoot": "_2PJi3UaFy_jj4iQPr3HIF4",
		"Emphasis": "SlSGFn7AcKWUGt_FN4OSR",
		"Strong": "_10LLyjlTmbzGgF-qUbyNS0",
		"Link": "_1feUKbtL6o2BY7LHFu309r",
		"Link__hover": "_1E6qd1tG3NSee6ZQUyGSrL",
		"ListItem": "_2yZ4M3izZKx12GYTtxBYh5",
		"InlineCode": "_-KSKYmcpT9LB-CBp4nhd",
		"Heading": "_3PKS-hrCne3h65WEtfYapu",
		"Heading__prop__6fa24d": "_1ekSETpVXskmLdn8hYGGp2",
		"Heading__prop__70ad44": "_3PKhAlNFNzQ7PPHtUMLezb",
		"Heading__prop__be9d2c": "huCueFxdph6FlJE0XW1e3",
		"Heading__prop__f335cd": "Y-A9qvk6mnHJK1hkwHmLx",
		"Heading__prop__d5070c": "_2rb1A_weJxwX-fE9dIdNyU"
	};

/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(400);


/***/ }

});
//# sourceMappingURL=bundle1.js.map