import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Navbar from '../layout/Navbar';

function myFunctionKeyShow(){
    let x = document.getElementById("password");
    if (x.type === "password"){
        x.type = "text";
    } else{
        x.type = "password";
    }
}

function myFunctionKeyShow2(){
    let x = document.getElementById("confirmPassword");
    if (x.type === "password"){
        x.type = "text";
    } else{
        x.type = "password";
    }
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Navbar>
          <Link to='/login'>
            <button className="btn btn-outline-success my-2 my-sm-0">Login</button>
          </Link>
        </Navbar>
        <div className="container border mt-4 mb-4">
          <div className="row mt-4 mb-4">
            <div className="col s8 offset-s2">
              <Link to="/"><span>Back To Home</span></Link>
              <div className="text-center">
                <h3>
                  <strong>Register</strong>
                </h3>
              </div>
              <form >
                  <div className="form-group">
                      <label htmlFor="Name">Full Name</label>
                      <input type="text" 
                          className="form-control" id="name" 
                          onChange={this.onChange}
                          value={this.state.name}
                          error={errors.name}
                          required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" 
                          className="form-control" id="email" 
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          aria-describedby="emailHelp" required/>
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" 
                          className="form-control" 
                          onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password" required/>
                  </div>
                  <div align="left">
                      <input id="keyShow"
                          type="checkbox"
                          onClick={(e)=> {myFunctionKeyShow(e)}}
                          /> &nbsp;<font size="3" face="Comic Sans">See Password</font>
                  </div>
                  <div className="form-group mt-2">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input type="password" 
                          className="form-control" 
                          onChange={this.onChange}
                          value={this.state.confirmPassword}
                          error={errors.confirmPassword}
                          id="confirmPassword" required/>
                  </div>
                  <div align="left">
                      <input id="keyShow2"
                          type="checkbox"
                          onClick={(e)=> {myFunctionKeyShow2(e)}}
                          /> &nbsp;<font size="3" face="Comic Sans">See Confirm Password</font>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2" onClick={this.onSubmit}>Submit</button>
              </form>
              <p className="grey-text text-darken-1 text-center">Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
