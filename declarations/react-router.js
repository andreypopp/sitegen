import React from 'react';

declare module 'react-router' {

  declare type RouterState = {
    location: ?mixed;
    routes: ?mixed;
    params: ?mixed;
    components: ?mixed;
  };

  declare type CancelSubscription = () => void;

  declare type TransitionManager = {
    listen(callback: (error: Error, state: RouterState) => void): CancelSubscription;
  };

  declare type MatchContext = {
    history: History;
    router: mixed;
    transitionManager: TransitionManager;
  };

  declare type History = mixed;

  declare type Location = mixed;

  declare var browserHistory: History;

  declare type Route = mixed;

  declare type MatchOptions = {
    routes: Route;
    history: History;
    location?: Location;
  };

  declare type MatchCallback = (
    err: ?Error,
    redirectLocation: ?mixed,
    props: {
      history: History;
      routes: Route;
      matchContext: MatchContext;
    }
  ) => void;

  declare function match(options: MatchOptions, callback: MatchCallback): void;

  declare class RouterContext extends React.Component {
    props: RouterState;
  }
}
