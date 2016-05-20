/**
 * @copyright 2016-present, Sitegen team
 */

import evalAsModule from 'eval-as-module';
import {program, stringLiteral} from 'babel-types';
import generate from 'babel-generator';
import {renderRoute, validate, forEach} from '../route';

const BOOT_MODULE = require.resolve('../boot');
const META_MODULE = require.resolve('../meta');
const SITE_MODULE = require.resolve('../Site');

module.exports = function bootLoader(source) {
  this.cacheable();

  let compiler = this._compiler;
  let cb = this.async();
  let fs = compiler.inputFileSystem;

  let {route} = evalAsModule(source, this.resource).exports;
  route = validate(route, {basedir: this.context});

  // traverse route tree and set watchers on collections
  // TODO: make sure we stay consistent with what renderRoute(..) does
  forEach(route, route => {
    if (route.collection) {
      this.addContextDependency(route.collection.page.directory);
    }
  });

  let split = compiler.options.env === 'production' ? undefined : false;

  renderRoute(route, {fs, split}).then(route =>
    generate(program(stmt`
      var makeDebug = require('debug');
      var React = require('react');
      var boot = require("${stringLiteral(BOOT_MODULE)}").boot;

      var debug = makeDebug('sitegen:runtime:route');

      exports.route = ${route};
      exports.Meta = require("${stringLiteral(META_MODULE)}").default;
      exports.Site = require("${stringLiteral(SITE_MODULE)}").default;
      exports.React = React;

      if (typeof window !== 'undefined') {
        if (module.hot) {
          module.hot.accept();
        }
        boot(exports.route);
      }
    `)).code
  ).then(code => cb(null, code), err => cb(err));
};
