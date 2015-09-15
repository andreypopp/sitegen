import React from 'react';
import RenderRoot from './RenderRoot';

function scoped(source) {
  return `(function() { ${source} })();`;
}

export default class Site extends React.Component {

  render() {
    let {children, head} = this.props;
    return (
      <html>
        <head>
          <meta charSet="utf8" />
          {head}
        </head>
        <body>
          <RenderRoot markup={children} />
          <script dangerouslySetInnerHTML={{__html: this.constructor.prepare}} />
          <script src="/_bootstrap.js" />
          <script dangerouslySetInnerHTML={{__html: this.constructor.finish}} />
        </body>
      </html>
    );
  }

  static prepare = scoped(`
    window.module = {exports: {}};
  `);

  static finish = scoped(`
    module.exports.renderIntoDocument();
  `);
}
