import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';  

class FilterBook extends Component {

  state = {
    filterName:'',
    filterAuthor:'',
    filterUploader:'',
    filterGenres:[]
  };

  filterHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        ...this.state
      }
      const res = await axios.post('/api/books/filter/'+this.props.page_id, obj);
      this.props.filtered(res.data);
    }
    catch(ex) {
      alert(ex.response.data);
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  onSelect = (selectedList, selectedItem) => {
    this.setState({filterGenres: selectedList});
  }
  
  onRemove = (selectedList, removedItem) => {
    this.setState({filterGenres: selectedList});
  }

  render() {

    return (
      <div className='mt-3 p-2' style={{border: '1px solid black'}}>
        <h3><b>Filter Books</b></h3> 
        <form >
        <div className="form-group">
            <Multiselect style={{
                    multiselectContainer: {
                      backgroundColor: 'white'
                    }
                }}
                options={this.props.genres}
                onSelect={this.onSelect}
                onRemove={this.onRemove}
                displayValue="name"
                placeholder="Book Genre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="filterName" className='sr-only'>Title</label>
            <input type="text" 
                    className="form-control" 
                    id="filterName"
                    placeholder="Title" 
                    onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="filterAuthor" className='sr-only'>Author</label>
            <input type="text" 
                    className="form-control" 
                    id="filterAuthor"
                    placeholder="Author" 
                    onChange={this.onChange}/>
          </div>
          
          <div className="form-group">
            <label htmlFor="filterUploader" className='sr-only'>Uploaded By</label>
            <input type="text" 
                    className="form-control" 
                    id="filterUploader"
                    placeholder="Uploaded By" 
                    onChange={this.onChange}/>
          </div>
        </form>
        <button type="submit" className="btn btn-primary" onClick={this.filterHandler}>Filter</button>
      </div>
    );
  }
};

export default FilterBook;