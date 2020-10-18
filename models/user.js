const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');
const {genreSchema} = require('./genre')

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
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id,  name: this.name, isAdmin: this.isAdmin ,email:this.email}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateRegisterInput(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        genresPreferred: Joi.array().items(Joi.object({
            _id: Joi.objectId().required(),
            name: Joi.valid('others','thriller','drama','romance','abstract','inspirational','fantasy','children stories',
		'children','tragedy','horror','classics','action','comedy','crime').required()
        })).min(1).required()
    });
    return schema.validate(user);
}


module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.validateRegisterInput = validateRegisterInput;




