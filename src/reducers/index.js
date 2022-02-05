import { combineReducers } from 'redux';
import { users, usersAreLoading,usersCount,user,deletedUser,userTimer} from './users';
import { filters } from './filters';

export default combineReducers({
  users,
  user,
  usersAreLoading,
  usersCount,
  deletedUser,
  filters,
  userTimer
});
