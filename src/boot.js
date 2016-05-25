/**
 * @copyright 2016-present, Sitegen team
 */

import debug from 'debug';
debug.enable(__DEBUG__);

import invariant from 'invariant';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory as history, match} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import Router from './Router';

const HOST_ELEMENT = 'main';

/**
 * Boot sitegen application.
 */
export function boot(routes) {
  match({routes, history}, (err, redirect, props) => {
    if (err) {
      throw err;
    } else if (redirect) {
      invariant(false, 'Redirects are not supported');
    } else {
      render(
        <AppContainer>
          <Router {...props} />
        </AppContainer>,
        document.getElementById(HOST_ELEMENT)
      );
    }
  });
}
