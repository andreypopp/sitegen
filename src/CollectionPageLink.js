/**
 * @copyright 2016-present, Sitegen team
 */

import React from 'react';
import {Link} from 'react-router';
import {contextTypes} from './CollectionContext';

export default class CollectionPageLink extends React.Component {

  static defaultProps = {
    toPage: 1,
  };

  static contextTypes = contextTypes;

  render() {
    let {toPage} = this.props;
    let {page} = this.context;
    let nextPageNumber = page.collection.pageNumber + toPage;
    if (nextPageNumber < 1 || nextPageNumber > page.collection.pageCount) {
      return null;
    }
    let to = nextPageNumber === 1
      ? page.createPath()
      : page.createPath('@page', nextPageNumber);
    return <Link {...this.props} to={to} />;
  }
}
