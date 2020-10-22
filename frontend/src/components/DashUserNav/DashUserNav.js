import React from 'react';
import classes from './DashUserNav.module.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import Image from '../../assets/images/3.jpeg'

const dashUserNav = props => (
  <nav>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black'}}>
        <img src={Image} width='130' height='130' className={classes.Image+' rounded-circle'} alt='logo'/>
        <h1 className={classes.H1 + " mx-2"}> BookGenics</h1>
      </Link>
      <h4 className={classes.TopNavTagLine+" text-center"}>AI POWERED <br/>GENRE CLASSIFIER</h4>
    </nav>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={"collapse navbar-collapse " + classes.SecondNav} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to='/dashboard'> Home </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/dashboard'>Predictor</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/booksadded'>Books Added</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/favorites' >Favorites</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to='/dashboard'>Account Settings</NavLink>
          </li>
          <li className="nav-item">
            <button className="btn btn-small btn-danger" onClick={props.logoutUser}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </nav>
);

dashUserNav.propTypes = {
  logoutUser: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actionCreators.logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(dashUserNav);