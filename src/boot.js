import React from 'react'
import {render} from 'react-dom'
import {browserHistory, Router, match} from 'react-router'

export function boot(routes) {
  match({routes, history: browserHistory}, (err, redirectLocation, props) => {
    if (err) {
      throw err;
    }
    render(
      <Router {...props} />,
      document.getElementById('main')
    );
  });
}
