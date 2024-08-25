// Middleware that does nothing and simply passes the request to the next middleware

const bypass = (req, res, next) => {
  next(); // Call the next middleware in the stack
};

module.exports = bypass;
