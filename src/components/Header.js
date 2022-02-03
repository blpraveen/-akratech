import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import {
  setOrderBy as setOrderByF,
  setText as setTextF,
} from '../actions/filters';

export class Header extends Component {
  handleOrderByClick = orderBy => {
    const { setOrderBy } = this.props;
    setOrderBy(orderBy);
  };

  handleSetText = event => {
    const { setText } = this.props;
    const text = event.target.value;
    setText(text);
  };

  render() {
    const { user_counts } = this.props;
    return (
      <header className="header">
        <div className="container text-center py-4">
          <h1>Demo User</h1>
            <span className="all_count"> {user_counts} </span>
          <div>
           
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user_counts: PropTypes.number.isRequired,
};

Header.defaultProps = {
  orderBy: undefined,
};

const mapStateToProps = state => ({
  user_counts: state.usersCount,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
