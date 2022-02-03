import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import UserSinglePageFieldC from './UserSinglePageField';

export const UserSinglePage = props => {
  const { user, history } = props;
  const dob = moment(user.dob).format('Do MMMM, YYYY');

  return (
    <div className="container">
      <div className="px-lg-6 mt-6 mb-4">
        <div className="row user-single p-3">
          <div className="pr-3">
            <img src={user.image} alt="user" />
          </div>
          <div className="user-single__details">
            <h2 className="text-capitalize font-weight-bold">
              {user.firstName} {user.lastName}
            </h2>
            <div className="user-single__details__field">
              <div className="font-weight-bold pr-2">Email:</div>
              <UserSinglePageFieldC
                data={user.email}
                field="email"
                username={user.username}
                isEditable/>
            </div>
            <div className="user-single__details__field">
              <div className="font-weight-bold pr-2">Cell:</div>
              <UserSinglePageFieldC
                data={user.cell}
                field="cell"
                username={user.username}
                isEditable/>
            </div>
            <div className="user-single__details__field text-capitalize">
              <div className="font-weight-bold pr-2">Address:</div>
              <UserSinglePageFieldC
                data={user.address}
                field="address"
                username={user.username}
                isEditable/>
            </div>
            <div className="user-single__details__field">
              <div className="font-weight-bold pr-2">Day of birth:</div>
              <UserSinglePageFieldC
                data={dob}
                field="dob"
                username={user.username}
                isEditable={false}/>
            </div>
            <Button
              color="success"
              className="mt-3"
              onClick={() => history.push('/')}>
              Back to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

UserSinglePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.users.find(user => user.username === props.match.params.username),
});

export default connect(mapStateToProps)(UserSinglePage);
