import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import filterUsers from '../selectors/users';
import CompHeader from './Header';
import User from './User';
import UserDetail from './UserDetail';
import Loading from './Loading';
import { addDeleteUser as addDeleteUserF } from '../actions/users';

export class Dashboard extends Component {


  renderUsers = () => {
    
    const { isLoading } = this.props;
    let { users,deletedUser } = this.props;
    const { filterText } = this.props;
    const {count } = users.length
    if (isLoading) {
      return '';
    }
    users = users.map((user,index,users) => {
      const firstName = user.firstName.replace(
        filterText,
        `<span class="hl">${filterText}</span>`
      );
      const lastName = user.lastName.replace( 
        filterText,
        `<span class="hl">${filterText}</span>`
      );
      const userData = {
        firstName,
        lastName,
        image: user.image,
        username: user.username,
        cell: user.cell
      };
      if(user.time){
        userData.time = user.time;
      } else {
        userData.time = null;
        console.log('asdas');
      }
      if(deletedUser){
        let duser = deletedUser.filter(u2 => user.username === u2.username);
        if(duser.length){
          userData.time = duser[0].time
          users[index] = user;
        }

      }
      if(user){
        return <User key={user.username} userData={userData} />;
      }
      
    });
    
    return users;
  };

  renderUser = () => {
    
    const { isLoading } = this.props;
    let { user,users } = this.props;
    if (isLoading) {
      return '';
    }

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
    if(Object.keys(user).length != 0){
     return <UserDetail  users={users}  userData={user}  />;
    }
  };

  render() {
    const { isLoading } = this.props;
    return (
      <div>
      <CompHeader />
        {isLoading ? ( <Loading />): (
          
        <div className="container">
          <div className="row users pt-5 pre-scrollable ">
          <div className="col-md-4">{this.renderUsers()}</div>
          <div className="col-md-8">
          {this.renderUser()}
          </div>
          </div>
        </div>
        )}
       
      </div>
    );
  }
}

Dashboard.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  deletedUser: PropTypes.arrayOf(PropTypes.object),
  filterText: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  addDeleteUser:PropTypes.func.isRequired,
  
};

Dashboard.defaultProps = {
  users: [],
  filterText: '',
};

const mapStateToProps = state => ({
  users: filterUsers(state.users, state.filters),
  user: state.user,
  deletedUser: state.deletedUser,
  filterText: state.filters.text,
  isLoading: state.usersAreLoading,
});

const mapDispatchToProps = dispatch => ({
  addDeleteUser: (user) => dispatch(addDeleteUserF(user)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
