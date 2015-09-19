import React from 'react';
import RenderRoot from './RenderRoot';

function scoped(source) {
  return `(function() { ${source} })();`;
}

export default class Site extends React.Component {

  render() {
    let {children, head, jsBundlePath, cssBundlePath} = this.props;
    return (
      <html>
        <head>
          <meta charSet="utf8" />
          {cssBundlePath && <link rel="stylesheet" href={cssBundlePath} />}
          {head}
        </head>
        <body>
          <RenderRoot markup={children} />
          {jsBundlePath && <script src={jsBundlePath} />}
          {jsBundlePath &&
            <script>
              SitegenSite.renderIntoDocument();
            </script>}
        </body>
      </html>
    );
  }
}
