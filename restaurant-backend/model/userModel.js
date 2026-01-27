const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must provide a password'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Please provide a valid password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
  },
});

// Password encryption
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // this makes sure that the functions run only when the password field is actually modified or newly created

  this.password = await bcrypt.hash(this.password, 16);

  this.passwordConfirm = undefined;
});

// Password confirmation function
userSchema.methods.confirmPassword = async function (
  enteredPassword,
  userPassword,
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
