export const usersAreLoading = (state = false, action) => {
  switch (action.type) {
    case 'USERS_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
};

export const users = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.users;
    case 'UPDATE_USER':
      return state.map(user => {
        if (user.username === action.username) {
          return {
            ...user,
            ...action.updatedData,
          };
        }
        return user;
      });
    case 'DELETE_USER' :
      return state.filter(user => {
        if (user.username != action.updatedData.username) {
          return true        
        }
        return false;
      });

    case 'MARK_DELETE_USER' :
    
      return state.filter(user => {
        if (user.username == action.updatedData.username) {
          return {
            ...user,
            ...action.updatedData,
          };       
        }
        return user;
      });
      
    default:
      return state;
  }
};

export const usersCount = (state = 0, action) => {
  
  switch (action.type) {
    case 'SET_USERS_COUNT': {
        return action.users_count;
    }
    default:
        return state;
  }
};


export const user = (state = {}, action) => {
  
  switch (action.type) {
    case 'SET_USER': {
        return action.user;
    }
    default:
        return state;
  }
};


export const deletedUser = (state = [], action) => {
  
  switch (action.type) {
    case 'SET_DELETE_USER': {
      state.push(action.updatedData);
      return state
    }
    case 'UNDO_USER': {
      return state.map(user => {
        if (user.username != action.username) {
          return user;  
        }
        return user;
      });
    }
    default:
        return state;
  }
};