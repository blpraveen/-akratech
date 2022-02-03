import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPen } from 'react-icons/fa';
import PropTypes from 'prop-types';
import UserSinglePageForm from './UserSinglePageForm';
import { updateUser as updateUserF } from '../actions/users';

export class UserSinglePageField extends Component {
  constructor(args) {
    super(args);
    this.state = {
      isUpdate: false,
    };
  }

  onUpdateButton = () => {
    this.setState({
      isUpdate: true,
    });
  };

  handleUpdateUser = updatedData => {
    const { updateUser, field, username } = this.props;
    updateUser(username, {
      [field]: updatedData,
    });

    this.setState({
      isUpdate: false,
    });
  };

  render() {
    const { data, isEditable } = this.props;
    const { isUpdate } = this.state;
    let renderField;
    if (isUpdate) {
      renderField = (
        <UserSinglePageForm
          data={data}
          handleUpdateUser={this.handleUpdateUser}/>
      );
    } else {
      renderField = (
        <span className="user-single__text">
          {data}
          {isEditable && (
            <a
              role="button"
              tabIndex={0}
              className="ml-2"
              onClick={this.onUpdateButton}
              onKeyDown={this.onUpdateButton}
            >
              <FaPen />
            </a>
          )}
        </span>
      );
    }

    return <div>{renderField}</div>;
  }
}

UserSinglePageField.propTypes = {
  updateUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateUser: (username, user) => dispatch(updateUserF(username, user)),
});

export default connect(null, mapDispatchToProps)(UserSinglePageField);
