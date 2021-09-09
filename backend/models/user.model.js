const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 8,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minLength: 8,
  },
  preferred_name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
});

const userModule = mongoose.model("user", userSchema);
module.exports = userModule;
