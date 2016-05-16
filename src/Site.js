import React from 'react';

export default function Site({bundle, content = ''}) {
  return (
    <html>
      <head>
        <meta charSet="utf8" />
      </head>
      <body>
        <div id="main" dangerouslySetInnerHTML={{__html: content}} />
        <script src={bundle.js} />
      </body>
    </html>
  );
}
