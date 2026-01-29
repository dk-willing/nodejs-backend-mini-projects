const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  username: {
    type: String,
    unique: [true, "A user with that username already exist"],
    required: [true, "A user must have a user name"],
  },
  email: {
    type: String,
    required: [true, "A user must provide an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A secure password is required"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords does not match",
    },
  },
  photo: String,
});

// This is how we encrypt our password
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (cp, up) {
  return bcrypt.compare(cp, up);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
