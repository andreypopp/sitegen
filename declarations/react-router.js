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
    history: mixed;
    router: mixed;
    transitionManager: TransitionManager;
  };
}
