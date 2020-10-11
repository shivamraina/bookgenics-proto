import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Navbar from '../layout/Navbar';

function myFunctionKeyShow(){
    let x = document.getElementById("password");
    if (x.type === "password"){
        x.type = "text";
    } else{
        x.type = "password";
    }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Navbar>
          <Link to='/register'>
            <button className="btn btn-outline-success my-2 my-sm-0">Register</button>
          </Link>
        </Navbar>
        <div className="container border mt-4  mb-4">
          <div className="row mt-4 mb-4">
            <div className="col s8 offset-s2">
              <Link to="/"><span>Back To Home</span></Link>
              <div className="text-center">
                <h3>
                  <strong>Login</strong>
                </h3>
              </div>
              <form>
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
                  <button type="submit" className="btn btn-primary mt-2" onClick={this.onSubmit}>Submit</button>
              </form>
              <p className="grey-text text-darken-1 text-center">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
