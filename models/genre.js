const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
        lowercase: true,
        enum: ['others','thriller','drama','romance','abstract','inspirational','fantasy','children stories','children'
        ,'tragedy','horror','classics','action','comedy','crime']
	}
});


const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
		name: Joi.valid('others','thriller','drama','romance','abstract','inspirational','fantasy','children stories',
		'children','tragedy','horror','classics','action','comedy','crime').required()
	});
	return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
module.exports.validateGenre = validateGenre;

