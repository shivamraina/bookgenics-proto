const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose');
const {User} = require('./user');

mongoose.connect('mongodb://localhost/bookgenics', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to Database'))
        .catch(err => console.log(err));

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
        minlength: 3, //make it 300 
        // lowercase: true
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
        ref: 'User',
        // default: "5f8ac029aef785531c871b29",
        required: true
    }
});


const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        author: Joi.string().min(3).max(100).required(),
        content: Joi.string().min(3).required(), //make it 300
        genres: Joi.array().items(Joi.object({
            _id: Joi.objectId().required(),
            name: Joi.valid('others','thriller','drama','romance','abstract','inspirational','fantasy','children stories',
		'children','tragedy','horror','classics','action','comedy','crime').required()
        })).min(1).required()
    });
    const result = schema.validate(book);
    return result;
}


module.exports.Book = Book;
module.exports.bookSchema = bookSchema;
module.exports.validateBook = validateBook;

