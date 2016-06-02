/**
 * @copyright 2016-present, Sitegen team
 */

import {parseQuery} from 'loader-utils';
import {program} from 'babel-types';
import {expr} from 'babel-plugin-ast-literal/api';
import generate from 'babel-generator';

const COLLECTION_CTX = require.resolve('../CollectionContext');

module.exports = function chunkLoader(_source) {
  this.cacheable();

  let query = parseQuery(this.query);

  function renderItem(item) {
    let req = `${query.loader}!${item.filename}`;
    return expr`{
      item: require(${req}).default,
      path: ${item.path},
    }`;
  }

  return generate(program(stmt`
    var React = require('react');

    exports.default = function PageWithChunk(props) {
      var page = ${query.chunk.map(renderItem)};
      var Context = require(${COLLECTION_CTX}).default;
      var Component = require(${this.resource}).default;
      return React.createElement(Context, {
        Component: Component,
        pageNumber: ${query.chunkNumber},
        pageCount: ${query.chunkCount},
        page: page,
        props: props
      });
    };
  `)).code;
};
