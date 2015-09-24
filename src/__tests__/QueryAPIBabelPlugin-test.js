import assert                         from 'power-assert';
import {transform as babelTransform}  from 'babel';
import QueryAPIBabelPlugin            from '../QueryAPIBabelPlugin';

function transform(code) {
  let res = babelTransform(code, {plugins: [QueryAPIBabelPlugin]})
  return res.code.split('\n').filter(Boolean);
}

describe('QueryAPIBabelPlugin', function() {

  it('transforms Sitegen.includePage', function() {
    assert.equal(
      transform('Sitegen.includePage("./page")')[1],
      'Sitegen.__internal.wrapPageModule(require("page!./page"));'
    );
    assert.throws(function() {
      transform('Sitegen.includePage(x)');
    }, 'Invariant Violation: Sitegen.includePage(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.includePage("x", 1)');
    }, 'Invariant Violation: Sitegen.includePage(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.link', function() {
    assert.equal(
      transform('Sitegen.link("./page")')[1],
      'Sitegen.__internal.wrapPageLinkModule(require("page-link!./page"));'
    );
    assert.throws(function() {
      transform('Sitegen.link(x)');
    }, 'Invariant Violation: Sitegen.link(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.link("x", 1)');
    }, 'Invariant Violation: Sitegen.link(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.page', function() {
    assert.equal(
      transform('Sitegen.page("./page")')[1],
      'Sitegen.__internal.wrapPageMetaModule(require("page-meta!./page"));'
    );
    assert.throws(function() {
      transform('Sitegen.page(x)');
    }, 'Invariant Violation: Sitegen.page(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.page("x", 1)');
    }, 'Invariant Violation: Sitegen.page(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.includePages', function() {
    assert.equal(
      transform('Sitegen.includePages("./page")')[1],
      'Sitegen.__internal.wrapPageContext(require.context("page!./page", true, new RegExp(".+")));'
    );
    assert.equal(
      transform('Sitegen.includePages("./page/*.md")')[1],
      'Sitegen.__internal.wrapPageContext(require.context("page!./page", true, new RegExp("^(?:(?!\\\\.)(?=.)[^\\\\/]*?\\\\.md)$")));'
    );

    assert.throws(function() {
      transform('Sitegen.includePages(x)');
    }, 'Invariant Violation: Sitegen.includePages(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.includePages("x", 1)');
    }, 'Invariant Violation: Sitegen.includePages(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.links', function() {
    assert.equal(
      transform('Sitegen.links("./page")')[1],
      'Sitegen.__internal.wrapPageLinkContext(require.context("page-link!./page", true, new RegExp(".+")));'
    );
    assert.equal(
      transform('Sitegen.links("./page/*.md")')[1],
      'Sitegen.__internal.wrapPageLinkContext(require.context("page-link!./page", true, new RegExp("^(?:(?!\\\\.)(?=.)[^\\\\/]*?\\\\.md)$")));'
    );

    assert.throws(function() {
      transform('Sitegen.links(x)');
    }, 'Invariant Violation: Sitegen.links(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.links("x", 1)');
    }, 'Invariant Violation: Sitegen.links(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.pages', function() {
    assert.equal(
      transform('Sitegen.pages("./page")')[1],
      'Sitegen.__internal.wrapPageMetaContext(require.context("page-meta!./page", true, new RegExp(".+")));'
    );
    assert.equal(
      transform('Sitegen.pages("./page/*.md")')[1],
      'Sitegen.__internal.wrapPageMetaContext(require.context("page-meta!./page", true, new RegExp("^(?:(?!\\\\.)(?=.)[^\\\\/]*?\\\\.md)$")));'
    );

    assert.throws(function() {
      transform('Sitegen.pages(x)');
    }, 'Invariant Violation: Sitegen.pages(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.pages("x", 1)');
    }, 'Invariant Violation: Sitegen.pages(...): only string literal argument is allowed');
  });

});
