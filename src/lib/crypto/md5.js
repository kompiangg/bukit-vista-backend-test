import crypto from 'crypto';

function md5Hash(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

export { md5Hash };
