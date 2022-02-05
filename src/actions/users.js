export const usersAreLoading = bool => ({
  type: 'USERS_ARE_LOADING',
  isLoading: bool,
});

export const setUsers = users => ({
  type: 'SET_USERS',
  users,
});

export const updateSelectedUser = user => ({
  type: 'SET_USER',
  user,
})
export const setUsersCount = users_count => ({
  type: 'SET_USERS_COUNT',
  users_count,
});

export const startSetUsers = url => async dispatch => {
  dispatch(usersAreLoading(true));

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = await data.results;
    const users = await results.map(user => ({
      username: user.login.username,
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      address: `${user.location.street}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`,
      dob: user.dob,
      cell: user.cell,
      image: user.picture.large,
    }));
    await dispatch(usersAreLoading(false));
    await dispatch(setUsers(users));
    await dispatch(setUsersCount(users.length));
    console.log(users[0]);
    await dispatch(updateSelectedUser(users[0]))
  } catch (e) {
    console.error(e);
  }
};

export const updateUser = (username, updatedData) => ({
  type: 'UPDATE_USER',
  username,
  updatedData,
});


export const undoDeleteUser = ( updatedData) => ({
  type: 'UNDO_USER',
  updatedData,
});



export const updateDeleteUser = (updatedData) => ({
  type: 'DELETE_USER',
  updatedData,
});


export const addDeleteUser = (updatedData) => ({
  type: 'SET_DELETE_USER',
  updatedData,
});


export const markeDeleteUser = (updatedData) => ({
  type: 'MARK_DELETE_USER',
  updatedData,
});

export const   removeTimerUser =  (updatedData) => ({
  type: 'REMOVE_TIMER',
  updatedData,
});










