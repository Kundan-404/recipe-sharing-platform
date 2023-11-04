// server/controllers/authController.
const {User} = require('../Models/recipe_models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.login = (req, res, next) => {
  const token = jwt.sign({ user : req.user }, "SECRETKEY", { expiresIn: '1h' });
  // res.json({ message: 'Login successful', user: req.user, token: token });
  const decoded = jwt.verify(token, "SECRETKEY", (err, authData) =>{
    if(err){
      console.log("cant verify");
      res.sendStatus(403);
    }else{
      res.json({
        message :  "verified",
        authData,
        token : token
      })
    }
  });
  console.log(" Created Tokem "  + token)
};

exports.logout = (req, res, next) => {

  // jwt.verify(req.token, "SECRETKEY", (err, authData) =>{
  //   if(err){
  //     console.log("cant verify");
  //     res.sendStatus(403);
  //   }else{
  //     res.json({
  //       message :  "found token",
  //     })
  //   }
  // });
  
  res.json({ message: 'Logout successful' });
};

exports.signup = async (req, res) => {
  try{
  const { username, email, password, role } = req.body;
  const newUser = new User({ username, email, password, role });
  await newUser.save();
  const token = jwt.sign({ user: newUser }, "SECRETKEY", { expiresIn: '1h' });
  console.log("my Token")
  console.log(token);

  res.status(201).json({
    message: 'User created successfully',
    User: newUser,
    token : token
  });
} catch (error) {
  res.status(500).json({ message: error.msg });
  }
};
