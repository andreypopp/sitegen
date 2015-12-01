import {homepage, bugs} from '../package.json';

export default function suggestPullRequest(feature) {
  throw new Error(
    `${feature} is not implemented, send a pull request at ${homepage}.`
  );
}

export default function suggestIssue(message) {
  if (message[message.length - 1] !== '.') {
    message = message + '.';
  }
  throw new Error(
    `${message} THIS IS A BUG, please file an issue at ${bugs.url}.`
  );
}

