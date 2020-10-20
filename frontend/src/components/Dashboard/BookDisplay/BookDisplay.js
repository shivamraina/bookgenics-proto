import React, { Component } from 'react';
import classes from './BookDisplay.module.css';

class BookDisplay extends Component {

  state = {
    loading: true,
  };

  render() {

    return (
      <React.Fragment>
      <div className={classes.BookContainer}>
        <div className="card" style={{width: '60rem', marginBottom: '1rem'}}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card" style={{width: '60rem', marginBottom: '1rem'}}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div className="card" style={{width: '60rem', marginBottom: '1rem'}}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <nav aria-label="...">
        <ul className="pagination justify-content-center">
        <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item active" aria-current="page">
            <span className="page-link">
              1
              <span className="sr-only">(current)</span>
            </span>
          </li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
        </nav>
      </div>
      </React.Fragment>
    );
  }
};

export default BookDisplay;