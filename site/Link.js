import React from 'react';
import {routerShape} from 'react-router/lib/PropTypes';

export default class Link extends React.Component {

  static contextTypes = {router: routerShape};

  static defaultProps = {
    Component: 'a',
  };

  render() {
    let {href, Component, ...props} = this.props;
    let {router} = this.context;
    let external = isExternal(href);
    let active = !external && href && router.isActive({pathname: href}, true);
    return (
      <Component
        {...props}
        href={href}
        active={active}
        onClick={!external && this.onClick}
        />
    );
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
      const {href} = this.props;

      if (href) {
        this.context.router.push({pathname: href});
      }
    }
  };
}


function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

function isExternal(href) {
  return /^(https?|mailto):/.exec(href);
}
