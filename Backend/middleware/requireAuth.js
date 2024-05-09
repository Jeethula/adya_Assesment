const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if authHeader exists
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: No authorization header provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'mnmkjkbkjbkjbknjnl', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateToken;
