const crypto = require("crypto");

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
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
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
  passwordChanged: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

// This is how we encrypt our password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (cp, up) {
  return bcrypt.compare(cp, up);
};

userSchema.methods.changedPasswordAfter = function (JWTTokenIssuedAt) {
  if (this.passwordChanged) {
    const timeStamp = parseInt(this.passwordChanged.getTime() / 1000, 10);
    console.log(JWTTokenIssuedAt, timeStamp);
    return JWTTokenIssuedAt < timeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
