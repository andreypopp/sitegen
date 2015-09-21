export function awaitCallback(func, ...args) {
  return new Promise(function(resolve, reject) {
    args.push(function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
    func.apply(null, args);
  });
}

export function mapSequential(array, func) {
  let promise = Promise.resolve();
  array.forEach(item => promise = promise.then(func(item)));
  return promise;
}
