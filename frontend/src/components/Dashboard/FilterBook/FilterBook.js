import React, { Component } from 'react';
import classes from './FilterBook.module.css';
import { Multiselect } from 'multiselect-react-dropdown';

class FilterBook extends Component {

  state = {
    options: [
      {name: 'Action', id: 1},
      {name: 'Adventure', id: 2},
      {name: 'Fantasy', id: 3},
      {name: 'Mystery', id: 4},
      {name: 'Novel', id: 5},
      {name: 'Suspense', id: 6},
      {name: 'Fiction', id: 7}
    ]
  };
 
  onSelect(selectedList, selectedItem) {
    console.log("ONSELECT");
  }
  
  onRemove(selectedList, removedItem) {
    console.log("ONRemove");
  }

  render() {
    return (
      <div className={classes.Multiselect}>
        <Multiselect style={{
                multiselectContainer: {
                  width: '100%',
                  border: '1px solid black',
                  backgroundColor: 'white'
                }
            }}
            options={this.state.options}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
            displayValue="name"
        />
        <input type="button" value="Filter" style={{marginTop: '10px'}}/>
      </div>
    );
  }
};

export default FilterBook;