import React from 'react';
import {Gateway} from 'react-gateway';
import {routerShape} from 'react-router/lib/PropTypes';
import {topTop, calculateScrollY} from 'react-track/lib/tracking-formulas';
import {TrackDocument, TrackedDiv} from 'react-track';

import {
  NavBar as NavBarBase,
  NavLink as NavLinkBase,
  NavBarWrapper
} from './NavBar.component.css';
import {Section, SubHeadingLine} from './index.component.css';

export function StickyNavBar({children}) {
  return (
    <TrackDocument formulas={[topTop]}>
      {topTop =>
        <TrackedDiv formulas={[calculateScrollY, topTop]}>
          {(scrollY, top) => (
            <NavBar sticky={top > 0 && scrollY >= 0}>
              {children}
            </NavBar>
          )}
        </TrackedDiv>}
    </TrackDocument>
  );
}

export function NavBar({sticky, children}) {
  let nav = (
    <NavBarWrapper>
      {children}
    </NavBarWrapper>
  );
  return (
    <div>
      {sticky &&
        <Gateway into="fixedTop">
          <NavBarBase sticky>
            {nav}
          </NavBarBase>
        </Gateway>}
      <NavBarBase>
        {nav}
      </NavBarBase>
    </div>
  );
}

export class NavLink extends React.Component {

  static contextTypes = {router: routerShape};

  render() {
    let {href, ...props} = this.props;
    let {router} = this.context;
    let selected = href && router.isActive({pathname: href}, true);
    return (
      <NavLinkBase
        {...props}
        href={href}
        selected={selected}
        onClick={this.onClick}
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

