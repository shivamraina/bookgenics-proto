import React, { Component } from 'react';
import SearchBook from '../SearchBook/SearchBook';
import FilterBook from '../FilterBook/FilterBook';

class BookUtils extends Component {
  render() {
    return (
      <React.Fragment>
        <SearchBook />
        <FilterBook />
      </React.Fragment>
    );
  }
};

export default BookUtils;