import {awaitCallback} from './PromiseUtils';

function flattenArray(array) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result = result.concat(array[i]);
  }
  return result;
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

export async function flattenRoutes(route) {
  let childRoutes = await getChildRoutes(route);
  childRoutes = await Promise.all(childRoutes.map(flattenRoutes));
  childRoutes = flattenArray(childRoutes);
  childRoutes = childRoutes.map(childRoute => ({
    ...childRoute,
    path: pathConcat(route.path, childRoute.path)
  }));
  return [route].concat(childRoutes);
}
