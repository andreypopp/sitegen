import React, {PropTypes} from 'react';
import RenderRoot         from './RenderRoot';

export default class Site extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    head: PropTypes.node,
    jsBundlePath: PropTypes.string,
    cssBundlePath: PropTypes.string,
  };

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
