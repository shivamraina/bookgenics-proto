import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from '../layout/Navbar';
import axios from "axios";

class Dashboard extends Component {

  state = {
    loading: false,
    res: null,
    selectedFile: null
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onFileChange = event => { 
    this.setState({ selectedFile: event.target.files[0] });    
  };

  onSubmit = async (e) => {

    this.setState({loading: true});
    e.preventDefault();
    
    let formData = new FormData(); 
    formData.append( 
      "file", 
      this.state.selectedFile
    );

    try {
      let res = await axios.post('/api/prediction', formData);
      res = res.data.ans;
      this.setState({loading: false, res: res});
    }
    catch(ex) {
      this.setState({loading: false, res: ex.message});
    }
  }

  render() {
    const { user } = this.props.auth;
    let ans = <div></div>;

    if(this.state.loading) {
      ans = <div className='container'>
              <div className='d-flex justify-content-center p-2 m-3'>
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="mx-3">
                  <p>Please wait for some time.</p>
                </div>
              </div>
            </div>
    }

    if(!this.state.loading && this.state.res) {
      ans = <div className='container'>
              <div className='d-flex justify-content-center p-2 m-3'>
                <h2 className='h2'>Your Genres: </h2>
                <h2>{this.state.res}</h2>
              </div>
            </div>;
    }

    return (
      <React.Fragment>
        <Navbar>
          <button
              style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-danger rippler rippler-default"
          >
            Logout
          </button>
        </Navbar>
        <div className="container mt-4 mb-4">
          <div className="row mt-4 mb-4">
              <h4>
                <strong>Welcome,</strong> {user.name}
                <p className="flow-text grey-text text-darken-1">
                  You have logged in successfully.{" "} 👏
                </p>
              </h4>
          </div>
          <div className='container border border-success mt-3 p-3'>
            <div className='form-group'>
              <label htmlFor="userfile" className='lead'>Upload Your file in .txt format only</label>
            </div>
            <div className='form-group border p-3'>
              <input type="file" id='userfile' name="userfile" onChange={this.onFileChange} required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
          </div>
        </div>
        {ans}
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
