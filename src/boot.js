import React from 'react'
import makeDebug from 'debug';
import {render} from 'react-dom'
import {browserHistory, Router, match} from 'react-router'

makeDebug.enable(__DEBUG__);

let debug = makeDebug('sitegen:runtime:boot');

export function boot(routes) {
  debug('matching');
  match({routes, history: browserHistory}, (err, redirectLocation, props) => {
    if (err) {
      throw err;
    } else {
      debug('mounting');
      render(
        <Router {...props} />,
        document.getElementById('main'),
        () => debug('finishing'),
      );
    }
  });
}
