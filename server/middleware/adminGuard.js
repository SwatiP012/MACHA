/**
 * Middleware to ensure the user has admin privileges
 */
const adminGuard = (req, res, next) => {
  try {
    // req.user is set by the authenticate middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if the user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    // User is an admin, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Admin guard error:', error);
    res.status(500).json({
      success: false,
      message: 'Authorization error',
      error: error.message
    });
  }
};

module.exports = adminGuard;
