import React from 'react'
import makeDebug from 'debug';
import {render} from 'react-dom'
import {browserHistory, Router, match} from 'react-router'
import {AppContainer} from 'react-hot-loader';

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
        <AppContainer>
          <Router {...props} />
        </AppContainer>,
        document.getElementById('main'),
        () => debug('finishing'),
      );
    }
  });
}
