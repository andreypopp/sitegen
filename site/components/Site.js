import React from 'react';
import {Meta} from '../../';
import GitHubCorner from './GitHubCorner';
import Favicon from '../img/favicon.ico';
import TouchIcon from '../img/sitegen-icon.png';
import {
  Root, ContentWrapper,
  HeadingLine, SubHeadingLine,
  Section, UIText,
  Heart
} from './Site.rcss';
import {Link} from './Theme.rcss';
import {NavBar, NavLink} from './NavBar';
import {StickyRoot, StickyDest} from './Sticky';

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

const VIEWPORT = {
  name: 'viewport',
  content: 'width=device-width, initial-scale=1, user-scalable=no',
};

const FAVICON = {
  rel: 'shortcut icon',
  href: Favicon,
};

const APPLE_TOUCH_ICON = {
  rel: 'apple-touch-icon',
  href: TouchIcon,
};

function Footer() {
  return (
    <Section decorated noMargin center>
      <UIText small uppercase>
        Made with <Heart>❤</Heart> in Saint Petersburg
      </UIText>
    </Section>
  );
}

function ToC({toc}) {
  let minDepth = Math.min.apply(Math, toc.map(item => item.depth));
  toc = toc.map(item => ({...item, depth: item.depth - minDepth}));
  return (
    <div>
      {toc.map(item => <ToCItem key={item.name} {...item} />)}
    </div>
  );
}

function ToCItem({name, title, depth}) {
  let href = '#' + name;
  return (
    <div style={{paddingLeft: depth * 10}}>
      <Link href={href}>{title}</Link>
    </div>
  );
}

export default function Site({children, routes}) {
  let {model} = routes[routes.length - 1].meta;
  let toc = <ToC toc={model.toc} />;
  return (
    <StickyRoot>
      <Root>
        <Meta
          titleTemplate="%s | Sitegen"
          title="Main"
          link={[
            FAVICON,
            APPLE_TOUCH_ICON,
          ]}
          meta={[
            VIEWPORT,
            APPLE_MOBILE_WEB_APP_CAPABLE,
            APPLE_MOBILE_WEB_APP_TITLE,
            APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE,
          ]}
          />

        <Section decorated noMargin>
          <GitHubCorner project="andreypopp/sitegen" />
          <ContentWrapper>
            <HeadingLine>Sitegen</HeadingLine>
            <SubHeadingLine>
              Static site generator
            </SubHeadingLine>
            <SubHeadingLine>
              based on React and Webpack
            </SubHeadingLine>
          </ContentWrapper>
        </Section>

        <NavBar toc={toc}>
          <NavLink href="/">Main</NavLink>
          <NavLink href="/tutorial">Tutorial</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/community">Community</NavLink>
        </NavBar>

        <ContentWrapper style={{marginTop: 20, marginBottom: 20}}>
          {toc}
          {children}
        </ContentWrapper>

        <Footer />

        <StickyDest />
      </Root>
    </StickyRoot>
  );
}
