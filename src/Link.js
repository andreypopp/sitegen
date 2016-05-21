/**
 * @copyright 2016-present, Sitegen team
 */

import React from 'react';
import {routerShape} from 'react-router/lib/PropTypes';

export default class Link extends React.Component {

  static contextTypes = {router: routerShape};

  static defaultProps = {
    Component: 'a',
  };

  render() {
    let {
      Component,
      className, activeClassName,
      style, activeStyle,
      ...props
    } = this.props;
    let href = this.href;
    let {router} = this.context;
    let external = isExternal(href);
    let active = !external && href && router.isActive({pathname: href}, true);
    if (active && activeClassName) {
      className = (className || '') + ' ' + activeClassName;
    }
    if (active && activeStyle) {
      style = {...style, activeStyle};
    }
    return (
      <Component
        {...props}
        href={href}
        active={active}
        style={style}
        className={className}
        onClick={!external && this.onClick}
        />
    );
  }

  get href() {
    let {href} = this.props;
    if (
        href &&
        (typeof __webpack_public_path__ !== 'undefined') &&
        !isExternal(href)
    ) {
      href = join(__webpack_public_path__, href);
    }
    return href;
  }

  onClick = (event) => {
    let allowTransition = true;

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      allowTransition = false;
    }

    // If target prop is set (e.g. to "_blank") let browser handle link.
    /* istanbul ignore if: untestable with Karma */
    if (this.props.target) {
      if (!allowTransition) {
        event.preventDefault();
      }

      return;
    }

    event.preventDefault();

    if (allowTransition) {
      let href = this.href;

      if (href) {
        this.context.router.push({pathname: href});
      }
    }
  };
}

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function isExternal(href) {
  return /^(https?|mailto):/.exec(href);
}

function join(...segments) {
  return normalize(segments.join('/'));
}

function normalize(href) {
  return href.replace(new RegExp('/+', 'g'),  '/');
}
