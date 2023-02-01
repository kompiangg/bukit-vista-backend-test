import jwt from 'jsonwebtoken';

export default function createJWTToken(userID, username, secretKey) {
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
