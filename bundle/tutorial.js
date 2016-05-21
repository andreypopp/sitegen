webpackJsonp([2],{

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


/***/ },

/***/ 410:
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
	  }, "Tutorial"), _react2.default.createElement(components.Paragraph, null, "The tutorial covers creation of a simple site using Sitegen."), _react2.default.createElement(components.Paragraph, null, "The site we are going to create is similar to the one you are looking at now.\nThe topics we are going to cover are:"), _react2.default.createElement(components.UnorderedList, null, _react2.default.createElement(components.ListItem, null, _react2.default.createElement(components.Paragraph, null, "Installing Sitegen and creating a new site.")), _react2.default.createElement(components.ListItem, null, _react2.default.createElement(components.Paragraph, null, "Writing pages with ", _react2.default.createElement(components.Link, {
	    "href": "https://daringfireball.net/projects/markdown/",
	    "title": null
	  }, "markdown"), " syntax")), _react2.default.createElement(components.ListItem, null, _react2.default.createElement(components.Paragraph, null, "Setting chrome components for pages which wraps content with some UI")), _react2.default.createElement(components.ListItem, null, _react2.default.createElement(components.Paragraph, null, "Links between pages")), _react2.default.createElement(components.ListItem, null, _react2.default.createElement(components.Paragraph, null, "Using ", _react2.default.createElement(components.Link, {
	    "href": "https://github.com/css-modules/css-modules",
	    "title": null
	  }, "CSS Modules"), " for styling"))), _react2.default.createElement(components.Paragraph, null, "The first step is to create a new npm package."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Creating a new site"), _react2.default.createElement(components.Paragraph, null, "Sitegen lets you build site the same way you build programs, with code. With\nJavaScript code in particular."), _react2.default.createElement(components.Paragraph, null, "The way you manage distribution, dependency management and the whole lifecycle\nof JavaScript code is through ", _react2.default.createElement(components.Link, {
	    "href": "https://www.npmjs.com",
	    "title": null
	  }, "npm"), "."), _react2.default.createElement(components.Paragraph, null, "Let's create a new npm package and set Sitegen and React as its dependencies:"), _react2.default.createElement(components.Code, null, "% mkdir site && cd site\n% npm init\n% npm install sitegen react react-dom --save\n"), _react2.default.createElement(components.Paragraph, null, "The ", _react2.default.createElement(components.InlineCode, null, "npm init"), " command will ask you a few questions about the package. Answer\nthem and at the end you will see a ", _react2.default.createElement(components.InlineCode, null, "package.json"), " file with basic package\nmetadata along with its dependency information."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Chrome"), _react2.default.createElement(components.Paragraph, null, "Chrome components is a special term for components which wrap content with a UI.\nTo state differently: the way your site looks is determined by chrome\ncomponents."), _react2.default.createElement(components.Paragraph, null, "Create a new file ", _react2.default.createElement(components.InlineCode, null, "index.js"), " and put the following contents there:"), _react2.default.createElement(components.Code, null, "import React from 'react'\nimport {Meta} from 'sitegen';\n\nexport default class Site extends React.Component {\n\n  render() {\n    let {children} = this.props\n    return (\n      <div>\n        <Meta title=\"Sitegen based site\" />\n        <div>\n          {children}\n        </div>\n      </div>\n    )\n  }\n}\n"), _react2.default.createElement(components.Paragraph, null, "As you can see this is just a regular React component which accepts a ", _react2.default.createElement(components.InlineCode, null, "children"), "\nprop and renders it."), _react2.default.createElement(components.Paragraph, null, "We used ", _react2.default.createElement(components.InlineCode, null, "<Sitegen.Meta />"), " component which allows us to set page wide metadata\nsuch as title, links, meta tags and others."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Content"), _react2.default.createElement(components.Paragraph, null, "Now create a directory and put a few markdown files there:"), _react2.default.createElement(components.Code, null, "% mkdir pages\n% echo '# Home' > pages/index.md\n% echo '# About' > pages/about.md\n"), _react2.default.createElement(components.Paragraph, null, "Those are simplest pages defined using markdown syntax."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Content tree"), _react2.default.createElement(components.Paragraph, null, "Now to have the site working we must define how our chrome components and\ncontent relate to each other."), _react2.default.createElement(components.Paragraph, null, "For that we need to configure the content tree of our site. It should be defined\nin ", _react2.default.createElement(components.InlineCode, null, "sitegen.config.js"), " file:"), _react2.default.createElement(components.Code, null, "export let route = {\n  page: './index.js',\n  collection: './pages/*.md',\n}\n"), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Development server"), _react2.default.createElement(components.Paragraph, null, "Now to serve our site:"), _react2.default.createElement(components.Code, null, "% ./node_modules/.bin/sitegen-serve\n"), _react2.default.createElement(components.Paragraph, null, "You can open ", _react2.default.createElement(components.InlineCode, null, "http://localhost:3000"), " in browser and browse through site's pages.\nTry to edit any of the content pages or the chrome component — changes should\nappear in browser as you save edits in your text editor."), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Navigation"), _react2.default.createElement(components.Paragraph, null, "We could use ", _react2.default.createElement(components.InlineCode, null, "<a />"), " DOM components to define navigation between our pages but\nthat's inefficient as we don't want browser to reload an entire page but just\nfetch the content for the next page and re-render it."), _react2.default.createElement(components.Paragraph, null, "Instead we could use ", _react2.default.createElement(components.InlineCode, null, "<Sitegen.Link />"), " component which is aware of the Sitegen\nrouting:"), _react2.default.createElement(components.Code, null, "import React from 'react'\nimport {Meta, Link} from 'sitegen';\n\nexport default class Site extends React.Component {\n\n  render() {\n    let {children} = this.props\n    return (\n      <div>\n        <Meta title=\"Sitegen based site\" />\n        <div>\n          <Link href=\"/pages/home\">Home</Link>\n          <Link href=\"/pages/about\">About</Link>\n        </div>\n        <div>\n          {children}\n        </div>\n      </div>\n    )\n  }\n}\n"), _react2.default.createElement(components.Paragraph, null, "As you can see using ", _react2.default.createElement(components.InlineCode, null, "<Sitegen.Link />"), " is as straightforward as using ", _react2.default.createElement(components.InlineCode, null, "<a />"), "\nDOM component. You check in browser that by clicking on the links it just\nrenders the corresponding page without reload."), _react2.default.createElement(components.Paragraph, null, "Now that's better but still suboptimal as we manually listed each page. Instead\nwe want to render such list automatically."), _react2.default.createElement(components.Paragraph, null, "Fortunately for us Sitegen passes ", _react2.default.createElement(components.InlineCode, null, "page"), " prop with the list of all pages'\nmetadata. We can use to render a page index:"), _react2.default.createElement(components.Code, null, "import React from 'react'\nimport {Meta, Link} from 'sitegen';\n\nexport default class Site extends React.Component {\n\n  render() {\n    let {children, page} = this.props\n    let index = page.map(item =>\n      <Link key={item.path} href={item.path}>\n        {item.meta.title || item.path}\n      </Link>\n    )\n    return (\n      <div>\n        <Meta title=\"Sitegen based site\" />\n        <div>\n          {index}\n        </div>\n        <div>\n          {children}\n        </div>\n      </div>\n    )\n  }\n}\n"), _react2.default.createElement(components.Paragraph, null, "That's it, check ", _react2.default.createElement(components.InlineCode, null, "http://localhost:3000"), " and see that the list of pages appears.\nYou can"), _react2.default.createElement(components.Heading, {
	    "level": 4
	  }, "Production build"), _react2.default.createElement(components.Paragraph, null, "Production build with Sitegen is simple:"), _react2.default.createElement(components.Code, null, "% ./node_modules/.bin/sitegen-build\n"), _react2.default.createElement(components.Paragraph, null, "The command above will build an entire site into ", _react2.default.createElement(components.InlineCode, null, "./build"), " directory. HTML files\nwill be pregenerated and assets are minified."), _react2.default.createElement(components.Paragraph, null, "The last step would be to deploy those files on some hosting (probably ", _react2.default.createElement(components.Link, {
	    "href": "https://pages.github.com/",
	    "title": null
	  }, "GitHub\nPages"), ")."), null, null, null, null), {
	    className: className,
	    style: style
	  }));
	}
	var metadata = exports.metadata = {};
	var model = exports.model = {
	  "toc": [{
	    "value": "Tutorial",
	    "depth": 3
	  }, {
	    "value": "Creating a new site",
	    "depth": 4
	  }, {
	    "value": "Chrome",
	    "depth": 4
	  }, {
	    "value": "Content",
	    "depth": 4
	  }, {
	    "value": "Content tree",
	    "depth": 4
	  }, {
	    "value": "Development server",
	    "depth": 4
	  }, {
	    "value": "Navigation",
	    "depth": 4
	  }, {
	    "value": "Production build",
	    "depth": 4
	  }],
	  "title": null
		};

/***/ }

});
//# sourceMappingURL=tutorial.js.map