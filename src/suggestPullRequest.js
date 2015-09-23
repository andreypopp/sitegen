import {homepage} from '../package.json';

export default function suggestPullRequest(feature) {
  throw new Error(
    `${feature} is not implemented, send a pull request at ${homepage}`
  );
}
