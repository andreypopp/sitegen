import minimatch from 'minimatch';

export default function QueryAPIBabelPlugin({Plugin, types: t}) {

  let requireSitegenAPIImpl = t.callExpression(
    t.identifier('require'),
    [t.literal('sitegen/internal')]);

  function makeRegExpLiteral(re) {
    return {
      type: 'Literal',
      regex: {pattern: re.source, flags: ''}
    };
  }

  function makeSitegenAPICall(name, args) {
    let callee = t.memberExpression(
      requireSitegenAPIImpl,
      t.identifier(name));
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

      CallExpression(node, parent, scope, file) {

        if (!file.isSitegenAPI) {
          file.isSitegenAPI = makeSitegenAPIRecognizer(file);
        }

        if (file.isSitegenAPI('includePage', node, scope)) {
          checkSitegenAPI('includePage', node, file);
          let request = node.arguments[0].value;
          let moduleNode = makeRequire(`page!${request}`);
          return makeSitegenAPICall('wrapPageModule', [moduleNode]);

        } else if (file.isSitegenAPI('includePages', node, scope)) {
          checkSitegenAPI('includePages', node, file);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = makeRequireContext(`page!${directory}`, regexp);
          return makeSitegenAPICall('wrapPageContext', [contextNode]);

        } else if (file.isSitegenAPI('link', node, scope)) {
          checkSitegenAPI('link', node, file);
          let request = node.arguments[0].value;
          let moduleNode = makeRequire(`page-link!${request}`);
          return makeSitegenAPICall('wrapPageLinkModule', [moduleNode]);

        } else if (file.isSitegenAPI('links', node, scope)) {
          checkSitegenAPI('links', node, file);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = makeRequireContext(`page-link!${directory}`, regexp);
          return makeSitegenAPICall('wrapPageLinkContext', [contextNode]);

        } else if (file.isSitegenAPI('page', node, scope)) {
          checkSitegenAPI('page', node, file);
          let request = node.arguments[0].value;
          let moduleNode = makeRequire(`page-meta!${request}`);
          return makeSitegenAPICall('wrapPageMetaModule', [moduleNode]);

        } else if (file.isSitegenAPI('pages', node, scope)) {
          checkSitegenAPI('pages', node, file);
          let request = node.arguments[0].value;
          let {directory, regexp} = parseRequest(request);
          let contextNode = makeRequireContext(`page-meta!${directory}`, regexp);
          return makeSitegenAPICall('wrapPageMetaContext', [contextNode]);
        }
      }
    }
  });
}

function makeSitegenAPIRecognizer(file) {

  let namespaceBinding = null;
  let moduleBindings = {};
  let nameMapping = {};

  for (let i = 0; i < file.metadata.modules.imports.length; i++) {
    let imp = file.metadata.modules.imports[i];
    if (imp.source !== 'sitegen') {
      continue;
    }
    for (let j = 0; j < imp.specifiers.length; j++) {
      let specifier = imp.specifiers[j];
      if (specifier.kind === 'namespace') {
        namespaceBinding = file.scope.getOwnBinding(specifier.local);
      } else if (specifier.kind === 'named') {
        moduleBindings[specifier.local] = file.scope.getOwnBinding(specifier.local);
        nameMapping[specifier.imported] = specifier.local;
      }
    }
  }

  let moduleHasSitegenAPI = (
    namespaceBinding !== null ||
    Object.keys(moduleBindings).length > 0
  );

  return function isSitegenAPI(name, node, scope) {
    if (!moduleHasSitegenAPI) {
      return false;
    }
    if (node.type !== 'CallExpression') {
      return false;
    }
    let callee = node.callee;
    if (callee.type === 'MemberExpression') {
      if (callee.object.type !== 'Identifier' || callee.property.type !== 'Identifier') {
        return false;
      }
      if (scope.getBinding(callee.object.name) !== namespaceBinding) {
        return false;
      }
      if (callee.property.name !== name) {
        return false;
      }
    } else if (callee.type === 'Identifier') {
      name = nameMapping[name];
      if (callee.name !== name) {
        return false;
      }
      if (scope.getBinding(callee.name) !== moduleBindings[callee.name]) {
        return false;
      }
    }
    return true;
  };
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

function checkSitegenAPI(name, node, file) {
  if (node.arguments.length !== 1) {
    throw file.errorWithNode(node, `Sitegen.${name}(...): only single argument is allowed`);
  }
  if (node.arguments[0].type !== 'Literal') {
    throw file.errorWithNode(node, `Sitegen.${name}(...): only string literal argument is allowed`);
  }
  if (node.arguments[0].type !== 'Literal') {
    throw file.errorWithNode(node, `Sitegen.${name}(...): only string literal argument is allowed`);
  }
  if (typeof node.arguments[0].type !== 'string') {
    throw file.errorWithNode(node, `Sitegen.${name}(...): only string literal argument is allowed`);
  }
}
