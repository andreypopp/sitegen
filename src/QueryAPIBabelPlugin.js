import invariant from 'invariant';
import minimatch from 'minimatch';

export default function QueryAPIBabelPlugin({Plugin, types: t}) {

  function makeRegExpLiteral(re) {
    return {
      type: 'Literal',
      regex: {pattern: re.source, flags: ''}
    };
  }

  function makeSitegenAPICall(name, args) {
    let callee = t.memberExpression(
      t.identifier('Sitegen'),
      t.identifier('__internal')
    );
    callee = t.memberExpression(callee, t.identifier(name));
    return t.callExpression(callee, args);
  }

  function makeRequire(request) {
    return t.callExpression(t.identifier('require'), [t.literal(request)]);
  }

  function makeRequireContext(request, pattern) {
    let callee = t.memberExpression(
      t.identifier('require'),
      t.identifier('context'));
    return t.callExpression(callee, [
      t.literal(request),
      t.literal(true),
      makeRegExpLiteral(pattern),
    ]);
  }

  return new Plugin('sitegen-query-api', {
    visitor: {
      CallExpression(node) {

        if (isSitegenAPI('includePage', node)) {
          checkSitegenAPI('includePage', node);
          let request = node.arguments[0].value;
          let moduleNode = makeRequire(`page!${request}`);
          return makeSitegenAPICall('wrapPageModule', [moduleNode]);

        } else if (isSitegenAPI('includePages', node)) {
          checkSitegenAPI('includePages', node);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = makeRequireContext(`page!${directory}`, regexp);
          return makeSitegenAPICall('wrapPageContext', [contextNode]);

        } else if (isSitegenAPI('link', node)) {
          checkSitegenAPI('link', node);
          let request = node.arguments[0].value;
          let moduleNode = makeRequire(`page-link!${request}`);
          return makeSitegenAPICall('wrapPageLinkModule', [moduleNode]);

        } else if (isSitegenAPI('links', node)) {
          checkSitegenAPI('links', node);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = makeRequireContext(`page-link!${directory}`, regexp);
          return makeSitegenAPICall('wrapPageLinkContext', [contextNode]);

        } else if (isSitegenAPI('page', node)) {
          checkSitegenAPI('page', node);
          let request = node.arguments[0].value;
          let moduleNode = makeRequire(`page-meta!${request}`);
          return makeSitegenAPICall('wrapPageMetaModule', [moduleNode]);

        } else if (isSitegenAPI('pages', node)) {
          checkSitegenAPI('pages', node);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = makeRequireContext(`page-meta!${directory}`, regexp);
          return makeSitegenAPICall('wrapPageMetaContext', [contextNode]);
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
  pattern = new minimatch.Minimatch('./' + request.substring(directory.length + 1));
  let regexp = pattern.makeRe();
  return {directory, regexp};
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
