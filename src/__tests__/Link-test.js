import assert from 'power-assert';
import React from 'react';
import {Link as BaseLink} from 'react-router';
import TestUtils from 'react/lib/ReactTestUtils';
import Link from '../Link';

function render(element) {
  let renderer = TestUtils.createRenderer();
  renderer.render(element);
  return renderer.getRenderOutput();
}

describe('Linke', function() {

  it('renders link with to and children props', function() {
    let page = {path: '/path', title: 'Title'};
    let element = render(<Link page={page} />);
    assert(element.type === BaseLink);
    assert(element.props.to === '/path');
    assert(element.props.children === 'Title');
  });

  it('allows to override `to` prop', function() {
    let page = {path: '/path', title: 'Title'};
    let element = render(<Link page={page} to="/another" />);
    assert(element.type === BaseLink);
    assert(element.props.to === '/another');
    assert(element.props.children === 'Title');
  });

  it('allows to override `children` prop', function() {
    let page = {path: '/path', title: 'Title'};
    let element = render(<Link page={page}>OK</Link>);
    assert(element.type === BaseLink);
    assert(element.props.to === '/path');
    assert(element.props.children === 'OK');
  });

});

