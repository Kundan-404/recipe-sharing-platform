// server/middleware/validationMiddleware.js
exports.validateInput = (req, res, next) => {
  // Add your input validation logic here
  // For example, you can use a library like express-validator

  const { title, ingredients, steps } = req.body;

  if (!title || !ingredients || !steps) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!Array.isArray(ingredients) || !Array.isArray(steps)) {
    return res.status(400).json({ message: 'Ingredients and steps must be arrays' });
  }

  next(); // Continue with the next middleware or route handler
};
