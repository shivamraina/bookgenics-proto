import React, {Component} from 'react';
import DashUserNav from '../DashUserNav/DashUserNav';
import BookUtils from '../BookUtils/BookUtils';
import BookDisplay from '../BookDisplay/BookDisplay';
import axios from 'axios';

class BooksAdded extends Component {
  
  state = {
    loading: false,
    books: [],
    notfound: false, 
    asc: false, 
    genres: []
  }

  async componentDidMount() {
    this.setState({loading: true});
    try {
      const res = await axios.get('/api/genres');
      const res2 = await axios.get('/api/books/added/me');
      if(res2.data.length === 0) {
        this.setState({loading: false, books: res2.data, notfound: true, genres: res.data});  
      }
      else this.setState({loading: false, books: res2.data, genres: res.data});
    }
    catch(ex) {
      alert(ex.response.data);
      this.setState({loading: false})
    }
  }

  filterBooksHandler = (books) => {
    if(books.length === 0) {
      this.setState({notfound: true});
    }
    else
      this.setState({books: books, notfound: false});
  }

  sortBooksHandler = () => {
    this.setState({asc:!this.state.asc});
  }
  
  render() {
    let screen;
    if(this.state.loading) {
      screen = <h1 className="text-center mt-5">Loading...</h1>;
    }

    else {
      screen = (
        <div className='container' style={{maxWidth:'100%'}}>
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <BookUtils genres={this.state.genres} 
                          page_id='3'
                          filtered={(books) => this.filterBooksHandler(books)}
                          sorted={this.sortBooksHandler}/>
              </div>
              <div className="col-sm-12 col-md-8 mt-3"  style={{height:'550px', overflow: 'auto'}}>
                <BookDisplay books={this.state.books} notfound={this.state.notfound} asc={this.state.asc}/>
              </div>
            </div>
          </div>
        );
    }
    return (
      <React.Fragment>
        <DashUserNav />
        {screen}
      </React.Fragment>
    );
  }
}

export default BooksAdded;