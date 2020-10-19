const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth');
const {Book,validateBook} = require('../models/book');
const {User} = require('../models/user');

router.get('/',auth,async (req,res)=>{
    const id = req.user._id;
    console.log(id);
    const userGenres = await User.findById(id).select({genresPreferred:1,_id:0});
    console.log(userGenres);
    const books = await Book.find({
        genres : { $in : userGenres.genresPreferred}
        // genres: userGenres.genresPreferred
    })
    // const books = await Book.find();
    res.send(books);
});


router.get('/:id',auth,async (req,res)=>{
    const id = req.params.id;
    
    //If invalid id pattern return 404
    if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

    //look book if no book return 404 resource not found
    let book = await Book.findById(id).populate('uploadedBy');
    if(!book) return res.status(404).send("The Book with the given id is not found!");

    res.send(book)
});

router.post('/',auth,async (req,res)=>{
    let result = validateBook(req.body);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const id = req.user._id;
    // console.log(id);
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        content : req.body.content,
        genres : req.body.genres,
        uploadedBy: id
    });
    // If the book has passed Joi test we'll still at test Database Level
    try{
        book  = await book.save();
        await book.populate('uploadedBy').execPopulate();
        res.send(book);
    }
    catch(ex){
        res.send(ex.message)
    }
    
});


router.put('/:id',auth,async (req,res)=>{
    const id = req.params.id;
    
    //If invalid id pattern return 404
    if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

    //look book if no book return 404 resource not found
    let book = await Book.findById(id);
    if(!book) return res.status(404).send("The Book with the given id is not found!");

    // Check if user is authorized to perform task-
    const userid = req.user._id;
    if(!req.user.isAdmin && userid != book.uploadedBy) return res.status(403).send('Access Denied');

    // otherwise validate body; if invalid return 400 bad request
    const {error} = validateBook(req.body)
    if(error){
        return res.status(400).send(result.error.details[0].message);
    }
    
    //next everything good update course and return updated course
    // First query and then Update (query has been done above)

    // console.log(book);
    // const id = req.user._id;
    book.set({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        genres : req.body.genres
    });
    // console.log(book);
    // If the book has passed Joi test we'll still test Database Level
    try{
        book  = await book.save();
        res.send(book); //actual book JSON object
    }
    catch(ex){
        res.send(ex.message)
    }
});


router.delete('/:id',auth,async (req,res)=>{
    const id = req.params.id;
    
    //If invalid id pattern return 404
    if (! id.match(/^[0-9a-fA-F]{24}$/)) return res.status(404).send("The id is invalid!");

    //look book if no book return 404 resource not found
    let book = await Book.findById(id);
    if(!book) return res.status(404).send("The Book with the given id is not found!");

    // Check if user is authorized to perform task-
    const userid = req.user._id;
    console.log(!req.user.isAdmin);
    console.log(userid != book.uploadedBy);
    if(!req.user.isAdmin && userid != book.uploadedBy) return res.status(403).send('Access Denied');

    //next everything good delete course and return deleted course ?? doubt
    // First query and then Delete (query has been done above)

    /*
    Ideally I should have used deleteOne function but that doesn't return the deleted object
    So, only option is to go in the database and remove.
    */

    book = await Book.findByIdAndRemove( id )
    res.send(book);
});






module.exports = router;