const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('x-access-token');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token.' });
    }
  }
  
  module.exports = verifyToken;