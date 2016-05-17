import React from 'react'
import makeDebug from 'debug';
import {render} from 'react-dom'
import {browserHistory, Router as RouterBase, match} from 'react-router'
import {AppContainer} from 'react-hot-loader';

makeDebug.enable(__DEBUG__);

let debug = makeDebug('sitegen:runtime:boot');

class Router extends React.Component {

  constructor(props) {
    super(props);
    this.state = {key: 0};
  }

  render() {
    return <RouterBase key={this.state.key} {...this.props} />;
  }

  componentWillReceiveProps({routes}) {
    if (this.props.routes !== routes) {
      this.setState({key: this.state.key + 1});
    }
  }
}

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
