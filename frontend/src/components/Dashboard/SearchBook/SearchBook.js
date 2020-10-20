import React, { Component } from 'react';
import classes from './SearchBook.module.css';

class SearchBook extends Component {
  render() {
    return (
      <div>
        <div className={classes.Searchbar}>
          <input type="text" name="search" placeholder="Search Book by Name"/>
          <input type="button" value="Submit"/>
        </div>
      </div>
    );
  }
};

export default SearchBook;