// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./Models/recipe_models').User;
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport configuration (assuming you're using local strategy)
// require('./')(passport);

// Routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoute');
const userRoutes = require('./routes/userRoute');
app.get('/', (req, res) => {
  const newUser = new User({
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'securepassword123',
    role: 'regular',
  });

  console.log(newUser);
});

app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});