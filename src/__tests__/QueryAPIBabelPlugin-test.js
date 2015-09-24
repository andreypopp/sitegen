import assert                         from 'power-assert';
import {transform as babelTransform}  from 'babel';
import QueryAPIBabelPlugin            from '../QueryAPIBabelPlugin';

function transform(code) {
  let res = babelTransform(code, {plugins: [QueryAPIBabelPlugin]})
  return res.code.split('\n').filter(Boolean);
}

describe('QueryAPIBabelPlugin', function() {

  it('transforms Sitegen.requirePage', function() {
    assert.equal(
      transform('Sitegen.requirePage("./page")')[1],
      'Sitegen.__internal.wrapPageModule(require("page!./page"));'
    );
    assert.throws(function() {
      transform('Sitegen.requirePage(x)');
    }, 'Invariant Violation: Sitegen.requirePage(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.requirePage("x", 1)');
    }, 'Invariant Violation: Sitegen.requirePage(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.getLink', function() {
    assert.equal(
      transform('Sitegen.getLink("./page")')[1],
      'Sitegen.__internal.wrapPageLinkModule(require("page-link!./page"));'
    );
    assert.throws(function() {
      transform('Sitegen.getLink(x)');
    }, 'Invariant Violation: Sitegen.getLink(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.getLink("x", 1)');
    }, 'Invariant Violation: Sitegen.getLink(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.getMeta', function() {
    assert.equal(
      transform('Sitegen.getMeta("./page")')[1],
      'Sitegen.__internal.wrapPageMetaModule(require("page-meta!./page"));'
    );
    assert.throws(function() {
      transform('Sitegen.getMeta(x)');
    }, 'Invariant Violation: Sitegen.getMeta(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.getMeta("x", 1)');
    }, 'Invariant Violation: Sitegen.getMeta(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.requirePageList', function() {
    assert.equal(
      transform('Sitegen.requirePageList("./page")')[1],
      'Sitegen.__internal.wrapPageContext(require.context("page!./page", true, new RegExp(".+")));'
    );
    assert.equal(
      transform('Sitegen.requirePageList("./page/*.md")')[1],
      'Sitegen.__internal.wrapPageContext(require.context("page!./page", true, new RegExp("^(?:(?!\\\\.)(?=.)[^\\\\/]*?\\\\.md)$")));'
    );

    assert.throws(function() {
      transform('Sitegen.requirePageList(x)');
    }, 'Invariant Violation: Sitegen.requirePageList(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.requirePageList("x", 1)');
    }, 'Invariant Violation: Sitegen.requirePageList(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.getLinkList', function() {
    assert.equal(
      transform('Sitegen.getLinkList("./page")')[1],
      'Sitegen.__internal.wrapPageLinkContext(require.context("page-link!./page", true, new RegExp(".+")));'
    );
    assert.equal(
      transform('Sitegen.getLinkList("./page/*.md")')[1],
      'Sitegen.__internal.wrapPageLinkContext(require.context("page-link!./page", true, new RegExp("^(?:(?!\\\\.)(?=.)[^\\\\/]*?\\\\.md)$")));'
    );

    assert.throws(function() {
      transform('Sitegen.getLinkList(x)');
    }, 'Invariant Violation: Sitegen.getLinkList(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.getLinkList("x", 1)');
    }, 'Invariant Violation: Sitegen.getLinkList(...): only string literal argument is allowed');
  });

  it('transforms Sitegen.getMetaList', function() {
    assert.equal(
      transform('Sitegen.getMetaList("./page")')[1],
      'Sitegen.__internal.wrapPageMetaContext(require.context("page-meta!./page", true, new RegExp(".+")));'
    );
    assert.equal(
      transform('Sitegen.getMetaList("./page/*.md")')[1],
      'Sitegen.__internal.wrapPageMetaContext(require.context("page-meta!./page", true, new RegExp("^(?:(?!\\\\.)(?=.)[^\\\\/]*?\\\\.md)$")));'
    );

    assert.throws(function() {
      transform('Sitegen.getMetaList(x)');
    }, 'Invariant Violation: Sitegen.getMetaList(...): only string literal argument is allowed');
    assert.throws(function() {
      transform('Sitegen.getMetaList("x", 1)');
    }, 'Invariant Violation: Sitegen.getMetaList(...): only string literal argument is allowed');
  });

});
