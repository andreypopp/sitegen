import React from 'react';
import Meta from './meta';

export default function Site({meta = Meta.rewind(), bundle, content = ''}) {
  return (
    <html {...meta.htmlAttributes.toComponent()}>
      <head>
        <meta charSet="utf8" />
        {meta.title.toComponent()}
      </head>
      <body>
        <div id="main" dangerouslySetInnerHTML={{__html: content}} />
        <script src={bundle.js} />
      </body>
    </html>
  );
}
