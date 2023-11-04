const bcrypt = require('bcrypt');
const { User } = require('../Models/recipe_models');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  console.log("Reached Success");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'User Not Found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    req.user = user; // Attach user to request object for further processing, if needed

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const validateInput = (req, res, next) => {
  const { email, password } = req.body;

  // Check for email format using a regular expression
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Check for a minimum password length
  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  // Check for password complexity
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Password should contain at least one uppercase letter, one lowercase letter, one special character, and one number' });
  }

  

  next(); // next middleware/controller
};

const tokenVerification = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token not found' });
  }
  console.log( "found token: " +token + "\n");
  req.token = token;

  jwt.verify(req.token, "SECRETKEY", (err, authData) => {
    if (err) {
      console.log("cant verify");
      res.sendStatus(403);
    } else {
      next();
    }
  });
};

module.exports = {
  authenticateUser,
  validateInput,
  tokenVerification,
};
