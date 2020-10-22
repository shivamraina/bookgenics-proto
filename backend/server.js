// Importing Libs
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const config = require('config');

// Initialising App
const app = express();

// Fetching Routes
const genre = require('./routes/genres/genre');
const login = require('./routes/user/login');
const register = require('./routes/user/register');
const prediction = require('./routes/predictor/prediction');
const books = require('./routes/books/books');

if(!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);    
}

if(!config.get('mongoURI')) {
  console.log('FATAL ERROR: mongoURI is not defined');
  process.exit(1);    
}

// Getting MongoCloud Db URI
let db = config.get('mongoURI');
// Connecting to MongoDB
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err));

// Setting Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

// Using the Routes
app.use('/api/genres', genre);
app.use('/api/user/login', login);
app.use('/api/user/register', register);
app.use('/api/prediction', prediction);
app.use('/api/books', books);

// Starting Server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started at port = ${port}`));