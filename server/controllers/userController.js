const User = require("../models/User");
// const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required !" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "User with the given email already exist!" });
  }

  //   if (!validator.isEmail(email)) {
  //     return res.status(400).json({ error: "Enter a valid email !" });
  //   }

  //   if (!validator.isStrongPassword(password)) {
  //     return res.status(400).json({
  //       error:
  //         "Password must be a strong password : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}",
  //     });
  //   }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    photo: req.file ? req.file : null,
  });

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photo: user.photo,
  });
};

// Login a user and generate a token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create a JWT token
    const token = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "45m" }
    );

    // Respond with user data and token
    res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
      },
      token, // Include the token in the response
    });
  } else {
    // Respond with an error if credentials are invalid
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Get user profile info
exports.getUserinfo = async (req, res) => {
  try {
    // Assuming req.user contains the user ID from the token
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Send the user's name and email as a response
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
};
