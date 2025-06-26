const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, authorization denied'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired, please login again'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    // If token has 'role: restaurant', attach decoded directly (for restaurant owner)
    if (decoded.role === 'restaurant' && decoded._id) {
      req.user = decoded;
      return next();
    }

    // Otherwise, treat as normal user
    if (decoded.id) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user not found'
        });
      }
      req.user = user;
      return next();
    }

    // If neither, unauthorized
    return res.status(401).json({
      success: false,
      message: 'Token payload invalid'
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

module.exports = authenticate;