import jwt from 'jsonwebtoken';

function createJWTToken(userID, username, secretKey) {
  const token = jwt.sign(
    {
      user_id: userID,
      username,
    },
    secretKey,
    { expiresIn: '2h' }
  );

  return token;
}

function extractJWTToken(token, secretKey) {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
}

export { createJWTToken, extractJWTToken };
