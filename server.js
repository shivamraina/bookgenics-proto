const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const bodyParser = require("body-parser");
const config = require('config');
const app = express();
const spawn = require('child_process').spawn;
const fileUpload = require('express-fileupload');
const { StringDecoder } = require('string_decoder');

const login = require('./routes/user/login');
const register = require('./routes/user/register');

mongoose.connect('mongodb://localhost/bookgenics', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to Database'))
        .catch(err => console.log(err));

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);    
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use('/api/user/login', login);
app.use('/api/user/register', register);

app.post('/api/prediction', async (req, res) => {

  const myFile = req.files.file;
  const decoder = new StringDecoder('utf8');
  const content = Buffer.from(myFile.data);

  const py = spawn('python', ['predictor.py']);
  
  var ans;
  py.stdout.on('data', data => {
    ans = data.toString();
  });
  
  py.stdout.on('end', () => {
    res.json({'ans':ans});
  });

  py.stdin.write(JSON.stringify(decoder.write(content)));
  py.stdin.end();
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started at port = ${port}`));