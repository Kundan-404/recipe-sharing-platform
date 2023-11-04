const bcrypt = require('bcrypt');
const {User} = require('../Models/recipe_models'); // Assuming this is your User model
const jwt = require('jsonwebtoken');

const authenticateUser =  async (req, res, next) => {
  console.log("Reached Success");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.user = user; // Attach user to request object for further processing, if needed
    
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

const validateInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required' });
  }

  // Add additional input validation logic as needed

  next(); // Proceed to the next middleware/controller
};

const tokenVerification = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token not found' });
  }
  console.log( "found token: " +token + "\n");
  req.token = token;
  

  jwt.verify(req.token, "SECRETKEY", (err, authData) =>{
    if(err){
      console.log("cant verify");
      res.sendStatus(403);
    }else{
      next();
    }
  });
};




module.exports = {authenticateUser,
                  validateInput,
                  tokenVerification,
                  };
