import {awaitCallback} from './PromiseUtils';

function flattenArray(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result = result.concat(array[i]);
  }
  return result;
}

async function loadRouteKey(route) {
  if (route.getKey) {
    let key = await awaitCallback(route.getKey);
    return {...route, key};
  } else {
    return route;
  }
}

export function pathConcat(a, b) {
  if (!a) {
    return b;
  }
  if (!b) {
    return a;
  }
  return (a + '/' + b).replace(/\/+/g, '/');
}

export async function getIndexRoute(route) {
  if (route.indexRoute) {
    return route.indexRoute;
  } else if (route.getIndexRoute) {
    return awaitCallback(route.getIndexRoute, null);
  } else {
    return undefined;
  }
}

export async function getChildRoutes(route) {
  if (route.childRoutes) {
    return route.childRoutes;
  } else if (route.getChildRoutes) {
    return awaitCallback(route.getChildRoutes, null);
  } else {
    return [];
  }
}

export async function collectRoutes(route) {
  let routes = [route];

  let indexRoute = await getIndexRoute(route);
  if (indexRoute) {
    indexRoute = {...indexRoute, path: route.path};
    routes.push(indexRoute);
  }

  let childRoutes = await getChildRoutes(route);
  if (childRoutes.length > 0) {
    childRoutes = await Promise.all(childRoutes.map(collectRoutes));
    childRoutes = flattenArray(childRoutes);
    childRoutes = childRoutes.map(childRoute => ({
      ...childRoute,
      path: pathConcat(route.path, childRoute.path)
    }));
    routes = routes.concat(childRoutes);
  }
  return await Promise.all(routes.map(loadRouteKey));
}
