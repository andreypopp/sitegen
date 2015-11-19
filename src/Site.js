import React, {PropTypes}     from 'react';
import RenderRoot             from './RenderRoot';
import LinkRegistry           from './LinkRegistry';
import PageRegistry           from './PageRegistry';

export default class Site extends React.Component {

  static propTypes = {
    children: PropTypes.node,

    jsBundlePath: PropTypes.string,

    cssBundlePath: PropTypes.string,

    title: PropTypes.string,

    meta: PropTypes.node,

    link: PropTypes.node,

    linkRegistry: PropTypes.object,

    pageRegistry: PropTypes.object,
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
      pageRegistry,
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
          <LinkRegistry.Render registry={linkRegistry} />
          <PageRegistry.Render registry={pageRegistry} />
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
  let __html = `
    SitegenSite.renderIntoDocument().then(
      function() { /* OK */ },
      function(err) { throw err; }
    );
  `;
  return <script dangerouslySetInnerHTML={{__html}} />;
}
