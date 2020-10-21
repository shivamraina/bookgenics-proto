import React, { Component } from 'react';

class SortBook extends Component {

  render() {
    return (
      <div className="container mt-3" style={{backgroundColor:'gray'}}>
        <h3><b>Sort Books</b></h3> 
        <input type="radio" id="sortasc" name="sort" value="asc" defaultChecked onClick={this.props.sorted}></input>
        <label htmlFor="sortasc">&nbsp;<b>Latest to Oldest</b></label>
        <br/>
        <input type="radio" id="sortdesc" name="sort" value="desc" onClick={this.props.sorted}></input>
        <label htmlFor="sortdesc">&nbsp;<b>Oldest to Latest</b></label>
        <br />
      </div>
    );
  }
};

export default SortBook;