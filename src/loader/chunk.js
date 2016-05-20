/**
 * @copyright 2016-present, Sitegen team
 */

import {parseQuery} from 'loader-utils';
import {program, arrayExpression, stringLiteral, numericLiteral} from 'babel-types';
import generate from 'babel-generator';

const COLLECTION_CTX = require.resolve('../CollectionContext');

module.exports = function loadChunk(source) {
  this.cacheable();

  let query = parseQuery(this.query);
  let page = arrayExpression(query.chunk.map(renderItem));

  function renderItem(item) {
    let req = `${query.loader}!${item.filename}`;
    return expr`{
      item: require(${stringLiteral(req)}).default,
      path: ${stringLiteral(item.path)},
    }`;
  }

  return generate(program(stmt`
    var React = require('react');

    exports.default = function PageWithChunk(props) {
      var page = ${page};
      var Context = require(${stringLiteral(COLLECTION_CTX)}).default;
      var Component = require(${stringLiteral(this.resource)}).default;
      return React.createElement(Context, {
        Component: Component,
        pageNumber: ${numericLiteral(query.chunkNumber)},
        pageCount: ${numericLiteral(query.chunkCount)},
        page: page,
        props: props
      });
    };
  `)).code;
}
