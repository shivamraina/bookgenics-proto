const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const {User} = require('./user');
const {genreSchema} = require('./genre')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  author: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 200,
  },
  genres: {
    type: [genreSchema],
    validate: {
      validator : function(v){
        return v && v.length >0;
      }
    },
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    // default: "5f8ac029aef785531c871b29",
    required: true
  }
});


const Book = mongoose.model('Book', bookSchema);

module.exports.Book = Book;
module.exports.bookSchema = bookSchema;