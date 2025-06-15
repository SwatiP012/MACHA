/**
 * Standardizes MongoDB error handling across the application
 * @param {Error} err - The error from MongoDB operation
 * @returns {Object} - Formatted error response
 */
const handleMongoError = (err) => {
  console.error('MongoDB error:', err);
  
  // Error responses
  const errorResponse = {
    message: 'Database error occurred',
    status: 500,
  };

  // Handle duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    errorResponse.message = `The ${field} is already in use`;
    errorResponse.status = 400;
    errorResponse.field = field;
  } 
  // Handle validation errors
  else if (err.name === 'ValidationError') {
    const errors = {};
    Object.keys(err.errors).forEach(key => {
      errors[key] = err.errors[key].message;
    });
    
    errorResponse.message = 'Validation error';
    errorResponse.status = 400;
    errorResponse.errors = errors;
  } 
  // Handle cast errors (invalid ID format etc.)
  else if (err.name === 'CastError') {
    errorResponse.message = `Invalid ${err.path}: ${err.value}`;
    errorResponse.status = 400;
  }

  return errorResponse;
};

module.exports = handleMongoError;
