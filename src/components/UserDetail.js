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
      timeleft: null,
      timerStart:null,
      duration:null,
      showUndo:false,

    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
   if(prevProps.user != this.props.user) {
     this.setState({user:this.props.user});
     if(this.props.user.time){
      this.setState({showUndo:true});
     } else {
      this.setState({showUndo:false});
     }
     
   }
    
   
  }
  componentDidMount() {
  
    // Changing the state after 2 sec
    // from the time when the component
    // is rendered
    if(this.props.user){
      this.setState({user:this.props.user});
      this.setState({showUndo:false});
    }
    
  }

  deleteUserPermannet(){
    const { userData,updateDeleteUser,user_counts,setUsersCount } = this.props;
    const { timerStart } = this.state;
    clearInterval(timerStart);
    this.setState({showUndo:false});
    this.setState({timeleft:''});
    updateDeleteUser(userData);
    setUsersCount(user_counts-1);
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
    this.setState({user:copy});
    var startTime =copy.time;
    var currentTime  =  moment();
    var time = startTime.diff(currentTime,'seconds');
    var duration = moment.duration(time, 'seconds');
    var interval = 1000;
    var sInterval = setInterval(() => {
      let dur = null;
      if(this.state.duration){
        dur = moment.duration(this.state.duration.asSeconds() - 1, 'seconds');
      } else {
        dur = moment.duration(duration.asSeconds() - 1, 'seconds');
      } 
      if(this.state.duration === null ){
        this.setState({timeleft:dur.format('H[h]:mm[m]:ss[s]'),duration:dur});
      } else if(this.state.duration && this.state.duration.asSeconds() > 0){
          this.setState({timeleft:dur.format('H[h]:mm[m]:ss[s]'),duration:dur})
      } else {
            this.deleteUserPermannet()
        }}, interval);
        this.setState({timerStart:sInterval});
        this.setState({showUndo: true});
   }

   render() {
    const { deleteUser } = this.props;
    const { user,showUndo
     } = this.state;
  return (

    <div className="container-wrapper">
      <div className="detail-container d-flex justify-content-center align-items-center ">
      <div className="img-thumbnail img-circle flex-fill d-flex justify-content-center align-items-center flex-column">
      <div className="img-wrapper">
      <img src={user.image} alt="user" className="mr-2 img" />
      </div>
      <div className="button-wrapper text-center">
          {!showUndo? (<button className="btn btn-info  btn-lg" onClick={() => this.deleteUser()}>Delete</button>) : ''}
      </div>

      <div className="button-wrapper text-center">
       { showUndo? (   <div>{this.state.timeleft} <button className="btn btn-info" onClick={() => this.unDoDelete()}>Undo</button></div>) : ''}
     
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
