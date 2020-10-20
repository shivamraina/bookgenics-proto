import React, { Component } from 'react';
import classes from './DashUserNav.module.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actionCreators from '../../../store/actions/index';

class DashUserNav extends Component {

  render() {
    return (
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h1>BookGenics</h1>
          <h4 className={classes.TopNavTagLine}>AI POWERED GENRE CLASSIFIER</h4>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={"collapse navbar-collapse " + classes.SecondNav} id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href='#'>Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Predictor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Books Added</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Favourites</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href='#'>Account Settings</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-small btn-danger" onClick={this.props.logoutUser}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>
      </nav>
    );
  }
};

DashUserNav.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actionCreators.logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(DashUserNav);