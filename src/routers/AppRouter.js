import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startSetUsers } from '../actions/users';
import Dashboard from '../components/Dashboard';
import UserSinglePage from '../components/UserSinglePage';
import PageNotFoundC from '../components/PageNotFound';
import Footer from '../components/Footer';

class AppRouter extends Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData('https://randomuser.me/api/?results=2&nat=us');
  }

  render() {
    return (
      <BrowserRouter>
          <Dashboard/>
          <Footer />
      </BrowserRouter>
    );
  }
}

AppRouter.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(startSetUsers(url)),
  fetchData: url => dispatch(startSetUsers(url)),
});

export default connect(null, mapDispatchToProps)(AppRouter);
