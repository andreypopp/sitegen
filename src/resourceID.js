import Crypto from 'crypto';

export default function resourceID(resource) {
  let hash = Crypto.createHash('sha256');
  hash.update(resource);
  return hash.digest('hex');
}
