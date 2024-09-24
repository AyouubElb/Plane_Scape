const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    minlength: [3, "First Name must be at least 3 characters long"],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(v);
      },
      message:
        "Password must contain at least one uppercase letter and one special character",
    },
  },
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
