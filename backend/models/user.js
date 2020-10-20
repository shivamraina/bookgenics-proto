const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');
const {genreSchema} = require('./genre');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },  
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  genresPreferred: {
    type: [genreSchema],
    validate: {
      validator : function(v){
        return v && v.length >0;
      }
    },
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id,  name: this.name, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;