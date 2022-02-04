import React, {Component} from 'react';
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



export class UserDetail extends Component {
  
  constructor(args) {
    super(args);
    this.state = {
      user: {},

    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
   if(prevProps.user != this.props.user) {
     this.setState({user:this.props.user});
   }
    
   
  }
  componentDidMount() {
  
    // Changing the state after 2 sec
    // from the time when the component
    // is rendered
    if(this.props.user){
      this.setState({user:this.props.user});
    }
    
  }
    deleteUser(){
      let { userData,updateDeleteUser,addDeleteUser,users,markeDeleteUser } = this.props;
    const copy = Object.assign({}, this.state.user);
    const start = moment().add(2, 'minutes');
    copy.time = start;
    let index_match = 0;
    users.map((user1,index) => {
      if(user1.username == this.state.user.username){
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
    this.setState({user:next});
   }

   render() {
    const { deleteUser } = this.props;
    const { user } = this.state;
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
   }
};

UserDetail.propTypes = {
  userData: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  updateDeleteUser: PropTypes.func.isRequired,
  addDeleteUser:PropTypes.func.isRequired,
  markeDeleteUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateDeleteUser: (user) => dispatch(updateDeleteUserF(user)),
  addDeleteUser: (user) => dispatch(addDeleteUserF(user)),
  markeDeleteUser: (user) => dispatch(markeDeleteUserF(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
