import React, { useState }  from 'react';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDeleteUser as updateDeleteUserF } from '../actions/users';
import { addDeleteUser as addDeleteUserF } from '../actions/users';
import { nextUser as nextUserF } from '../actions/users';
import { markeDeleteUser as markeDeleteUserF } from '../actions/users';
import Moment from 'react-moment';
import moment from 'moment';



const UserDetail = props => {
  let { userData,updateDeleteUser,addDeleteUser,users,markeDeleteUser } = props;
  const [user, setUser] = useState(userData);

   function deleteUser(){
    const copy = Object.assign({}, user);
    const start = moment().add(0.2, 'minutes');
    copy.time = start;
    let index_match = 0;
    users.map((user1,index) => {
      if(user1.username == user.username){
        index_match = index;
      }
      
    });
    let next = {};
      if ( users.length == 1){
        next = {};
      } else if(users.length && index_match  < users.length -1){
        next = users[index_match+1];
      } else if (users.length  && index_match  ==  users.length -1 ){
        next = users[0];
      }  else {
        next = {};
      }
    markeDeleteUser(copy);
    addDeleteUser(copy);
    setUser(next);
   }
  return (
    <div className="container-wrapper">
      <div className="detail-container d-flex justify-content-center align-items-center ">
      <div className="img-thumbnail img-circle flex-fill d-flex justify-content-center align-items-center flex-column">
      <div className="img-wrapper">
      <img src={user.image} alt="user" className="mr-2 img" />
      </div>
      <div className="button-wrapper text-center">
          <button className="btn btn-info  btn-lg" onClick={() => deleteUser()}>Delete</button>
      </div>
    </div>
    </div>
    </div>
  );
};

UserDetail.propTypes = {
  userData: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  updateDeleteUser: PropTypes.func.isRequired,
  addDeleteUser:PropTypes.func.isRequired,
  markeDeleteUser:PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  updateDeleteUser: (user) => dispatch(updateDeleteUserF(user)),
  addDeleteUser: (user) => dispatch(addDeleteUserF(user)),
  markeDeleteUser: (user) => dispatch(markeDeleteUserF(user)),
});

export default connect(null, mapDispatchToProps)(UserDetail);
