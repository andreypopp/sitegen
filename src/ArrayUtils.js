import identity from 'empty/functionThatReturnsArgument';

/**
 * Filter `array` for dups by key provided by `keyFunc`.
 */
export function uniqueBy(array, keyFunc = identity) {
  let seen = {};
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    let key = keyFunc(item);
    if (!seen[key]) {
      seen[key] = true;
      result.push(item);
    }
  }
  return result;
}
