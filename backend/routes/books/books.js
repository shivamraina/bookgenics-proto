const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { Book } = require('../../models/book');
const { User } = require('../../models/user');
const validateBookInput = require('../../validation/validateBookInput'); 
const { request } = require('express');

router.get('/', auth, async (req,res) => {
  try {
    const id = req.user._id;
    const userGenres = await User.findById(id).select({genresPreferred:1,_id:0});
    console.log(userGenres);
    const books = await Book.find({
      genres: { $in: userGenres.genresPreferred}
    }).populate('uploadedBy','name -_id');
    res.send(books);
  }
  catch(ex) {
    res.send(ex);
  }
});

router.post('/filter', auth, async (req,res) => {
  try {
    const criteria={}
    if(req.body.filterName && req.body.filterName.length) criteria.title = {$regex:new RegExp(req.body.filterName, "i")};
    if(req.body.filterAuthor && req.body.filterAuthor.length) criteria.author = {$regex:new RegExp(req.body.filterAuthor, "i")};

    if(req.body.filterUploader && req.body.filterUploader.length){
      const users = await User.find({name: {$regex:new RegExp(req.body.filterUploader, "i")} })
      criteria.uploadedBy = { $in: users};
    }

    if(req.body.filterGenres && req.body.filterGenres.length) {
      criteria.genres = { $in: req.body.filterGenres};
    }
    
    const books = await Book.find(criteria)
    res.send(books);
  }
  catch(ex) {
    res.send(ex.message);
  }
});

router.get('/:id', auth, async (req,res) => {
  
  const id = req.params.id;
  //If invalid id pattern return 404
  if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");
  
  try {
    //look book if no book return 404 resource not found
    let book = await Book.findById(id).populate('uploadedBy','name -_id');
    if(!book) return res.status(404).send("The Book with the given id is not found!");
    res.send(book);
  }
  catch(ex) {
    res.send(ex);
  }

});






router.post('/', auth, async (req,res) => {
  const { error } = validateBookInput(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  try{
    const id = req.user._id;
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        content : req.body.content,
        genres : req.body.genres,
        uploadedBy: id
    });

    await book.save();
    await book.populate('uploadedBy').execPopulate();
    res.send('OK');
  }
  catch(ex){
    res.send(ex);
  }

});


router.put('/:id', auth, async (req,res) => {
    const id = req.params.id;
    
    if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

    try {
      //look book if no book return 404 resource not found
      let book = await Book.findById(id);
      if(!book) return res.status(404).send("The Book with the given id is not found!");

      // Check if user is authorized to perform task-
      const userid = req.user._id;
      if(!req.user.isAdmin && userid !== book.uploadedBy) return res.status(403).send('Access Denied');

      // otherwise validate body; if invalid return 400 bad request
      const {error} = validateBookInput(req.body);
      if(error) return res.status(400).send(error.details[0].message);

      //next everything good update course and return updated course
      // First query and then Update (query has been done above)

      book.set({
          title: req.body.title,
          author: req.body.author,
          content: req.body.content,
          genres : req.body.genres
      });

      // If the book has passed Joi test we'll still test Database Level
      await book.save();
      res.send('OK'); //actual book JSON object
    }
    catch(ex){
      res.send(ex);
    }
});


router.delete('/:id',auth,async (req,res)=>{
    
  const id = req.params.id;  
  //If invalid id pattern return 404
  if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

  try {
    //look book if no book return 404 resource not found
    let book = await Book.findById(id);
    if(!book) return res.status(404).send("The Book with the given id is not found!");

    // Check if user is authorized to perform task-
    const userid = req.user._id;
    if(!req.user.isAdmin && userid != book.uploadedBy) return res.status(403).send('Access Denied');

    await Book.deleteOne({_id: id });
    res.send('OK');
  }
  catch(ex) {
    res.send(ex);
  }
});


module.exports = router;