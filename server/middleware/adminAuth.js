module.exports = (req, res, next) => {
  // Check if user is an admin
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
};
