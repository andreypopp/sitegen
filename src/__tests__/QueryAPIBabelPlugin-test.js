import assert                         from 'power-assert';
import {transform as babelTransform}  from 'babel';
import QueryAPIBabelPlugin            from '../QueryAPIBabelPlugin';

function transformMulti(code) {
  let res = babelTransform(code, {plugins: [QueryAPIBabelPlugin]})
  let lines = res.code.split('\n').filter(Boolean);
  return lines;
}

function transform(code) {
  let lines = transformMulti(code);
  return lines[lines.length - 1];
}

describe('QueryAPIBabelPlugin', function() {

  it('transforms Sitegen.includePage', function() {
    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.includePage("./page")'),
      'require("sitegen/internal").wrapPageModule(require("page!./page"));'
    );
    assert.equal(
      transform('import {includePage} from "sitegen";\nincludePage("./page")'),
      'require("sitegen/internal").wrapPageModule(require("page!./page"));'
    );
    assert.equal(
      transformMulti('import {includePage} from "sitegen";\n{includePage("./page")}')[3],
      '  require("sitegen/internal").wrapPageModule(require("page!./page"));'
    );
    assert.equal(
      transform('import {includePage as include} from "sitegen";\ninclude("./page")'),
      'require("sitegen/internal").wrapPageModule(require("page!./page"));'
    );

    assert.equal(
      transform('Sitegen.includePage("./page")'),
      'Sitegen.includePage("./page");'
    );
    assert.equal(
      transform('includePage("./page")'),
      'includePage("./page");'
    );

    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.includePage(x)');
    }, 'Invariant Violation: Sitegen.includePage(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.includePage("x", 1)');
    }, 'Invariant Violation: Sitegen.includePage(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.link', function() {
    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.link("./page")'),
      'require("sitegen/internal").wrapPageLinkModule(require("page-link!./page"));'
    );
    assert.equal(
      transform('import {link} from "sitegen";\nlink("./page")'),
      'require("sitegen/internal").wrapPageLinkModule(require("page-link!./page"));'
    );
    assert.equal(
      transform('import {link as l} from "sitegen";\nl("./page")'),
      'require("sitegen/internal").wrapPageLinkModule(require("page-link!./page"));'
    );

    assert.equal(
      transform('Sitegen.link("./page")'),
      'Sitegen.link("./page");'
    );
    assert.equal(
      transform('link("./page")'),
      'link("./page");'
    );

    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.link(x)');
    }, 'Invariant Violation: Sitegen.link(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.link("x", 1)');
    }, 'Invariant Violation: Sitegen.link(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.page', function() {
    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.page("./page")'),
      'require("sitegen/internal").wrapPageMetaModule(require("page-meta!./page"));'
    );
    assert.equal(
      transform('import {page} from "sitegen";\npage("./page")'),
      'require("sitegen/internal").wrapPageMetaModule(require("page-meta!./page"));'
    );
    assert.equal(
      transform('import {page as p} from "sitegen";\np("./page")'),
      'require("sitegen/internal").wrapPageMetaModule(require("page-meta!./page"));'
    );

    assert.equal(
      transform('Sitegen.page("./page")'),
      'Sitegen.page("./page");'
    );
    assert.equal(
      transform('page("./page")'),
      'page("./page");'
    );

    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.page(x)');
    }, 'Invariant Violation: Sitegen.page(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.page("x", 1)');
    }, 'Invariant Violation: Sitegen.page(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.includePages', function() {
    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.includePages("./page")'),
      'require("sitegen/internal").wrapPageContext(require.context("page!./page", true, /^(?:\\.\\/)$/));'
    );
    assert.equal(
      transform('import {includePages} from "sitegen";\nincludePages("./page")'),
      'require("sitegen/internal").wrapPageContext(require.context("page!./page", true, /^(?:\\.\\/)$/));'
    );
    assert.equal(
      transform('import {includePages as include} from "sitegen";\ninclude("./page")'),
      'require("sitegen/internal").wrapPageContext(require.context("page!./page", true, /^(?:\\.\\/)$/));'
    );

    assert.equal(
      transform('Sitegen.includePages("./page")'),
      'Sitegen.includePages("./page");'
    );
    assert.equal(
      transform('includePages("./page")'),
      'includePages("./page");'
    );

    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.includePages("./page/*.md")'),
      'require("sitegen/internal").wrapPageContext(require.context("page!./page", true, /^(?:\\.\\/(?!\\.)(?=.)[^\\/]*?\\.md)$/));'
    );

    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.includePages(x)');
    }, 'Invariant Violation: Sitegen.includePages(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.includePages("x", 1)');
    }, 'Invariant Violation: Sitegen.includePages(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.links', function() {
    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.links("./page")'),
      'require("sitegen/internal").wrapPageLinkContext(require.context("page-link!./page", true, /^(?:\\.\\/)$/));'
    );
    assert.equal(
      transform('import {links} from "sitegen";\nlinks("./page")'),
      'require("sitegen/internal").wrapPageLinkContext(require.context("page-link!./page", true, /^(?:\\.\\/)$/));'
    );
    assert.equal(
      transform('import {links as l} from "sitegen";\nl("./page")'),
      'require("sitegen/internal").wrapPageLinkContext(require.context("page-link!./page", true, /^(?:\\.\\/)$/));'
    );

    assert.equal(
      transform('Sitegen.links("./page")'),
      'Sitegen.links("./page");'
    );
    assert.equal(
      transform('links("./page")'),
      'links("./page");'
    );

    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.links("./page/*.md")'),
      'require("sitegen/internal").wrapPageLinkContext(require.context("page-link!./page", true, /^(?:\\.\\/(?!\\.)(?=.)[^\\/]*?\\.md)$/));'
    );

    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.links(x)');
    }, 'Invariant Violation: Sitegen.links(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.links("x", 1)');
    }, 'Invariant Violation: Sitegen.links(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.pages', function() {
    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.pages("./page")'),
      'require("sitegen/internal").wrapPageMetaContext(require.context("page-meta!./page", true, /^(?:\\.\\/)$/));'
    );
    assert.equal(
      transform('import {pages} from "sitegen";\npages("./page")'),
      'require("sitegen/internal").wrapPageMetaContext(require.context("page-meta!./page", true, /^(?:\\.\\/)$/));'
    );
    assert.equal(
      transform('import {pages as p} from "sitegen";\np("./page")'),
      'require("sitegen/internal").wrapPageMetaContext(require.context("page-meta!./page", true, /^(?:\\.\\/)$/));'
    );

    assert.equal(
      transform('Sitegen.pages("./page")'),
      'Sitegen.pages("./page");'
    );
    assert.equal(
      transform('pages("./page")'),
      'pages("./page");'
    );

    assert.equal(
      transform('import * as Sitegen from "sitegen";\nSitegen.pages("./page/*.md")'),
      'require("sitegen/internal").wrapPageMetaContext(require.context("page-meta!./page", true, /^(?:\\.\\/(?!\\.)(?=.)[^\\/]*?\\.md)$/));'
    );

    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.pages(x)');
    }, 'Invariant Violation: Sitegen.pages(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('import * as Sitegen from "sitegen";\nSitegen.pages("x", 1)');
    }, 'Invariant Violation: Sitegen.pages(...): only string literal argument is allowed');
  });

});
