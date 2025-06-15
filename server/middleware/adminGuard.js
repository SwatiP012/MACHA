/**
 * Middleware to ensure that only admin users can access certain routes
 */
const adminGuard = (req, res, next) => {
  // User object is attached by the auth middleware that should run before this
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin privileges required to access this resource' 
    });
  }
  
  // User is authenticated and is an admin
  next();
};

module.exports = adminGuard;
