import {parse} from 'babylon';
import traverse from 'babel-traverse';
import generate from 'babel-generator';
import * as types from 'babel-types';

module.exports = function meta(source) {
  this.cacheable();

  let found = null;

  traverse(parse(source), {
    enter(path) {
      if (types.isAssignmentExpression(path.node) && isExportsMeta(path.node.left)) {
        found = path.node.right;
      }
    }
  });

  if (found) {
    return `exports.default = ${generate(found).code};`;
  } else {
    return `exports.default = {}`;
  }
}

function isExportsMeta(node) {
  return (
    types.isMemberExpression(node) &&
    types.isIdentifier(node.object) &&
    node.object.name === 'exports' &&
    types.isIdentifier(node.property) &&
    node.property.name === 'meta'
  );
}
