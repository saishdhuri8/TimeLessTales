import jwt from "jsonwebtoken";

export function generateToken(userId) {
  const token = jwt.sign(
    { userId: userId }, 
    'tester', 
    { expiresIn: '1h' }
  );
  return token;
}


export function isTokenValid(token) {
  try {
    const decoded = jwt.verify(token, 'tester');
    return decoded; 
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return false;
  }
}
