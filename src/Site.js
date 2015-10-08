import React, {PropTypes}     from 'react';
import RenderRoot             from './RenderRoot';
import {LinkRegistryPayload}  from './LinkRegistryPayload';

export default class Site extends React.Component {

  static propTypes = {
    children: PropTypes.node,

    jsBundlePath: PropTypes.string,

    cssBundlePath: PropTypes.string,

    title: PropTypes.string,

    meta: PropTypes.node,

    link: PropTypes.node,

    linkRegistry: PropTypes.object,
  };

  render() {
    let {
      children,
      title,
      meta,
      link,
      jsBundlePath,
      cssBundlePath,
      linkRegistry,
    } = this.props;
    return (
      <html>
        <head>
          <meta charSet="utf8" />
          {title && <title>{title}</title>}
          {meta}
          {link}
          <CSSBundle path={cssBundlePath} />
        </head>
        <body>
          <RenderRoot markup={children} />
          <LinkRegistryPayload linkRegistry={linkRegistry} />
          <JSBundle path={jsBundlePath} />
          <StartSite path={jsBundlePath} />
        </body>
      </html>
    );
  }
}

function JSBundle({path}) {
  if (!path) {
    return <noscript />;
  }
  return <script src={path} />;
}

function CSSBundle({path}) {
  if (!path) {
    return <noscript />;
  }
  return <link rel="stylesheet" href={path} />;
}

function StartSite({path}) {
  if (!path) {
    return <noscript />;
  }
  let __html = `SitegenSite.renderIntoDocument();`;
  return <script dangerouslySetInnerHTML={{__html}} />;
}
