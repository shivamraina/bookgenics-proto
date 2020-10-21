import React, { Component } from 'react';
import classes from './BookDisplay.module.css';
import axios from 'axios';
import {connect} from 'react-redux';

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}


class BookDisplay extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.setState({books: this.props.books});
  }

  compare = (book1, book2) => {
    if(this.props.asc) {
      return new Date(book1.date.substring(0,10)) - new Date(book2.date.substring(0,10));
    }
    else {
      return new Date(book2.date.substring(0,10)) - new Date(book1.date.substring(0,10));
    }
  }

  favourites = async (id, e) => {
    e.persist();
    try {
      await axios.post('/api/books/favorites', {id:id});
      const el = document.getElementById(e.target.id);
      if(el.className === 'far fa-heart'){
        el.className = 'fas fa-heart'
      } else {
        el.className = 'far fa-heart';
      }   
    }
    catch(ex) {
      alert(ex.response.data);
    } 
  }

  render() {
    let screen;
    if(this.props.notfound) {
      screen = <h1 className="text-center mt-5 mx-5">Sorry, No Books Found...</h1>
    }
    else {
      screen = (
        this.props.books.sort(this.compare)
                        .map(book => (
                          <div className='col-sm-12 col-md-6' key={book._id}>
                          <div className={"card "+classes.Card}>
                            <div className="card-body">
                              
                              <div className='row'>
                                <h5 className="card-title col-10" style={{
                                    fontFamily:'verdana',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: 'blue'
                                  }}>
                                  <b>
                                    {book.title}
                                  </b>
                                </h5>
                                <div className="col-2 pl-4">
                                  <i 
                                    id = {book._id+"#"}
                                    className = {book.liked?'fas fa-heart':'far fa-heart'}
                                    style={{color:'red'}} 
                                    onClick={(e) => this.favourites(book._id, e)} ></i>
                                </div>
                              </div>
                              
                              <p className="card-text"><b style={{color:'red'}}>Author: </b><b>{titleCase(book.author)}</b></p>
                              
                              <p className="card-text"><b style={{color:'red'}}>Uploaded By: </b><b>{book.uploadedBy.name}</b></p>
                              
                              <p className="card-text" style={{color:'green'}}>
                                <b style={{color:'red'}}>Genres: </b>
                                {book.genres.map(genre => (
                                  <span key={genre._id} className="mx-1"><b>{titleCase(genre.name)}</b></span>
                                ))}
                              </p>
                              <div>
                                {(this.props.auth.isAdmin || book.uploadedBy._id === this.props.auth.user._id)?<i className="fas fa-pencil-alt"></i>:null}
                                <span className="d-flex flex-row-reverse card-text" style={{color:'blue'}}>Uploaded On: {book.date.substring(0,10)}</span>  
                              </div>
                            </div>
                            </div>
                          </div>
                        )
                      )
      );
    }

    return (
      <div className='row'>
        {screen}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(BookDisplay);