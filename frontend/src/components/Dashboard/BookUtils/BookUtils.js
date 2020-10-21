import React, { Component } from 'react';
import SortBook from '../SortBook/SortBook';
import FilterBook from '../FilterBook/FilterBook';

class BookUtils extends Component {
  render() {
    return (
      <React.Fragment>
        <SortBook sorted={this.props.sorted}/>
        <FilterBook genres={this.props.genres} filtered={this.props.filtered} page_id={this.props.page_id}/>
      </React.Fragment>
    );
  }
};

export default BookUtils;