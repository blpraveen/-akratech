import React, {Component} from 'react';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSelectedUser as updateSelectedUser, updateUser,undoDeleteUser,updateDeleteUser,setUsersCount,removeTimerUser} from '../actions/users';
import moment from 'moment';

export class User extends Component {
  

  constructor(args) {
    super(args);
    this.state = {
      timeleft: null,
      timerStart:null,
      duration:null,
      showUndo:false,
      suser:null,
    };
  }

   selectUser (usera) {

    const { updateSelectedUser, user,removeTimerUser} = this.props;
    const { timerStart } = this.state;
    this.setState({suser :usera, })
    updateSelectedUser(usera);
    removeTimerUser(usera);
    
  }
  
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const { userData,user } = this.props;
    if(prevProps != this.props) {
      if(userData.time && !this.state.timerStart && user.username != userData.username) {
        this.startTimer();
      }
       if(this.props.userTimer && this.props.userTimer.username == userData.username && this.state.showUndo){
        this.resetTimer();
      }
      console.log(this.props.userTimer,this.props.userData,'1asd',this.state.showUndo );
      if( this.props.userTimer.username != this.props.userData.username && !this.state.showUndo ) {
        console.log('1asd');
        this.startTimer();
      }
     
    }
   
  }
  startTimer(){
    const { userData,user } = this.props;
    if(userData.time){
      var startTime =userData.time;
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
              this.deleteUser()
          }}, interval);
          this.setState({timerStart:sInterval});

          this.setState({showUndo:true});   
      
    }
  }
  resetTimer(){
    const { timerStart } = this.state;
     clearInterval(timerStart);
     this.setState({timeleft:''});
     this.setState({showUndo:false});
  }
  deleteUser(){
    const { userData,updateDeleteUser,user_counts,setUsersCount } = this.props;
    const { timerStart } = this.state;
    clearInterval(timerStart);
    this.setState({showUndo:false});
    this.setState({timeleft:''});
    updateDeleteUser(userData);
    setUsersCount(user_counts-1);
  }
  unDoDelete(){
    const { userData,undoDeleteUser } = this.props;
    const { timerStart } = this.state;
    
    userData.time = null;
    const copy = Object.assign({}, userData);
    copy.time = null;
    clearInterval(timerStart);
    this.setState({showUndo:false});
    this.setState({timeleft:''});
    updateUser(copy.username,copy);
    this.setState({timerStart:null});
    undoDeleteUser(copy);
  }
  render() {
    const { userData } = this.props;
    const { timeleft,showUndo } = this.state;
  return (
      <div className="user p-3"  role="button" onClick={()=>this.selectUser(userData)}>
        <div>
          <img src={userData.image} alt="user" className="mr-2 img" />
        </div>
        <div className="user__text">
          <h5 className="text-capitalize font-weight-bold">
            {Parser(userData.lastName)}, {Parser(userData.firstName)} {timeleft} { showUndo ? ( <button className="btn btn-info" onClick={() => this.unDoDelete()}>Undo</button>):''}
          </h5>
          <p>Cell: {userData.cell}</p>
        </div>
      </div>
  );
  }
};

User.propTypes = {
  userData: PropTypes.object.isRequired,
  updateSelectedUser: PropTypes.func.isRequired,
  updateDeleteUser:PropTypes.func.isRequired,
  user_counts:PropTypes.number.isRequired,
  setUsersCount:PropTypes.func.isRequired,
  deletedUser: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  userTimer:PropTypes.object
};



const mapStateToProps = state => ({
  user_counts: state.usersCount,
  deletedUser: state.deletedUser,
  user: state.user,
  userTimer:state.userTimer
});


const mapDispatchToProps = dispatch => ({
  updateSelectedUser: (user) => dispatch(updateSelectedUser(user)),
  updateDeleteUser:(user) => dispatch(updateDeleteUser(user)),
  updateUser : (username,user) => dispatch(updateUser(username,user)),
  undoDeleteUser : (user) => dispatch(undoDeleteUser(user)),
  setUsersCount : (count) => dispatch(setUsersCount(count)),
  removeTimerUser: (user) => dispatch(removeTimerUser(user))

});

export default connect(mapStateToProps,mapDispatchToProps)(User);