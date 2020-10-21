import React, { Component } from 'react';
import classes from './DashUserNav.module.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import * as actionCreators from '../../../store/actions/index';
import Image from '../../../assets/images/3.jpeg'

class DashUserNav extends Component {

  render() {
    return (
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to='/dashboard' style={{ textDecoration: 'none', color: 'black'}}>
            <img src={Image} width='130' height='130' className={classes.Image+' rounded-circle'}/>
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
                <a className="nav-link" href="#">Predictor</a>
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


{/* <nav>     
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to='/dashboard' style={{ textDecoration: 'none', color: 'white', marginTop: '0px'}}>
            <img src={Image} width='130' height='130' className={classes.Image+' rounded-circle'}/>
            <h1 className={classes.H1 + " mx-2"}> BookGenics</h1>
          </Link>
          <h4 className={classes.TopNavTagLine+" text-center"}>AI POWERED <br/>GENRE CLASSIFIER</h4>
        </nav>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="d-flex navbar-toggler-icon mr-auto"></span>
          </button>
          <div className='collapse navbar-collapse' id="navbarSupportedContent">
              <nav className={classes.Shift} style={{paddingBottom: 0, marginBottom: 0}}>
                <ul className="mr-auto">
                  {console.log(this.props.history)}
                  <li><Link to='/dashboard'>Home</Link></li>
                  <li><Link to='/dashboard'>Predictor</Link></li>
                  <li><Link to='/dashboard'>Favourites</Link></li>
                  <li><Link to='/dashboard'>Books Added</Link></li>
                  <li><Link to='/dashboard'>Books Added</Link></li>
                  <button className="btn btn-danger mr-auto" onClick={this.props.logoutUser}>Logout</button>
                </ul>
              </nav>  
          </div>
        </nav>
      </nav> */}