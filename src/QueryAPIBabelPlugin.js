import invariant from 'invariant';
import minimatch from 'minimatch';

export default function QueryAPIBabelPlugin({Plugin, types: t}) {

  function makeRegExpNode(re) {
    return t.newExpression(t.identifier('RegExp'), [t.literal(re.source)]);
  }

  function makeSitegenInternalCallExpression(name, args) {
    let callee = t.memberExpression(
      t.identifier('Sitegen'),
      t.identifier('__internal')
    );
    callee = t.memberExpression(callee, t.identifier(name));
    return t.callExpression(callee, args);
  }

  return new Plugin("sitegen-query-api", {
    visitor: {
      CallExpression(node, parent) {

        if (isSitegenAPI('requirePage', node)) {
          checkSitegenAPI('requirePage', node);
          let request = node.arguments[0].value;
          return t.callExpression(
            t.identifier('require'),
            [t.literal(`page!${request}`)]
          );

        } else if (isSitegenAPI('requirePageList', node)) {
          checkSitegenAPI('requirePageList', node);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          return t.callExpression(
            t.identifier('require.context'),
            [
              t.literal(`page!${directory}`),
              t.literal(true),
              makeRegExpNode(regexp)
            ]
          );

        } else if (isSitegenAPI('getLink', node)) {
          checkSitegenAPI('getLink', node);
          let request = node.arguments[0].value;
          return t.callExpression(
            t.identifier('require'),
            [t.literal(`page-link!${request}`)]
          );

        } else if (isSitegenAPI('getLinkList', node)) {
          checkSitegenAPI('getLinkList', node);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = t.callExpression(
            t.identifier('require.context'),
            [
              t.literal(`page-link!${directory}`),
              t.literal(true),
              makeRegExpNode(regexp)
            ]
          );
          return makeSitegenInternalCallExpression(
            'makeLinkListFromContext',
            [contextNode]);

        } else if (isSitegenAPI('getMeta', node)) {
          checkSitegenAPI('getMeta', node);
          let request = node.arguments[0].value;
          return t.callExpression(
            t.identifier('require'),
            [t.literal(`page-meta!${request}`)]
          );

        } else if (isSitegenAPI('getMetaList', node)) {
          checkSitegenAPI('getMetaList', node);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = t.callExpression(
            t.identifier('require.context'),
            [
              t.literal(`page-meta!${directory}`),
              t.literal(true),
              makeRegExpNode(regexp)
            ]
          );
          return makeSitegenInternalCallExpression(
            'makeMetaListFromContext',
            [contextNode]);
        }
      }
    }
  });
}

function parseRequest(request) {
  let pattern = new minimatch.Minimatch(request);
  let directory = [];
  for (let i = 0; i < pattern.set[0].length; i++) {
    if (typeof pattern.set[0][i] === 'string') {
      directory.push(pattern.set[0][i]);
    } else {
      break;
    }
  }
  if (directory.length > 1) {
    directory = directory.join('/');
  }
  pattern = new minimatch.Minimatch(request.substring(directory.length + 1));
  return {directory, regexp: pattern.makeRe()};
}

function isSitegenAPI(name, node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'Sitegen' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === name
  );
}

function checkSitegenAPI(name, node) {
  invariant(
    node.arguments.length === 1,
    'Sitegen.%s(...): only single argument is allowed', name
  );
  invariant(
    node.arguments[0].type === 'Literal',
    'Sitegen.%s(...): only string literal argument is allowed', name
  );
  invariant(
    node.arguments[0].type === 'Literal',
    'Sitegen.%s(...): only string literal argument is allowed', name
  );
  invariant(
    typeof node.arguments[0].type === 'string',
    'Sitegen.%s(...): only string literal argument is allowed', name
  );
}
