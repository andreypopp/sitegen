import './index.css';

import React from 'react';
import {routerShape} from 'react-router/lib/PropTypes';
import {Meta} from '../';
import GitHubCorner from './GitHubCorner';
import Favicon from './favicon.ico';
import TouchIcon from './sitegen-icon.png';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  NavBar, NavLink as NavLinkBase,
  Section, SectionHeader,
  Par, CodeBlock
} from './index.component.css';

class NavLink extends React.Component {

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

const APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE = {
  name: 'apple-mobile-web-app-status-bar-style',
  content: 'black',
};

const APPLE_MOBILE_WEB_APP_TITLE = {
  name: 'apple-mobile-web-app-title',
  content: 'Sitegen',
};

const APPLE_MOBILE_WEB_APP_CAPABLE = {
  name: 'apple-mobile-web-app-capable',
  content: 'yes',
};

const FAVICON = {
  rel: 'shortcut icon',
  href: Favicon,
};

const APPLE_TOUCH_ICON = {
  rel: 'apple-touch-icon',
  href: TouchIcon,
};

export default function Site({children}) {
  return (
    <Root>
      <Meta
        titleTemplate="%s | Sitegen"
        title="Main"
        link={[
          FAVICON,
          APPLE_TOUCH_ICON,
        ]}
        meta={[
          APPLE_MOBILE_WEB_APP_CAPABLE,
          APPLE_MOBILE_WEB_APP_TITLE,
          APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE,
        ]}
        />

      <Section decorated noWrap>
        <GitHubCorner project="andreypopp/sitegen" />
        <HeadingLine>Sitegen</HeadingLine>
        <SubHeadingLine>
          Static site generator
        </SubHeadingLine>
        <SubHeadingLine>
          based on React and Webpack
        </SubHeadingLine>
      </Section>

      <NavBar>
        <NavLink href="/">Overview</NavLink>
        <NavLink href="/tutorial">Tutorial</NavLink>
        <NavLink href="/docs">Docs</NavLink>
        <NavLink href="/community">Community</NavLink>
      </NavBar>

      {children}

      <Section decorated noWrap>
        <div style={{fontSize: '8pt', textAlign: 'center'}}>
          Made with <span style={{color: 'red'}}>❤</span> in St. Petersburg, Russia
        </div>
      </Section>
    </Root>
  );
}
