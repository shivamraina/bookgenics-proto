import React from 'react';
import DashUserNav from './DashUserNav/DashUserNav';
import BookUtils from './BookUtils/BookUtils';
import BookDisplay from './BookDisplay/BookDisplay';

const Dashboard = props => (
  <React.Fragment>
    <DashUserNav />
    <BookUtils />
    <BookDisplay />
  </React.Fragment>
);

export default Dashboard;