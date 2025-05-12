import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from './userTypes'

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  }
}

export const fetchUserSucess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  }
}

export const fetchUserFailed = error => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  }
}

export const fetchUser = () => {
  return dispatch => {
    dispatch(fetchUserRequest())
    try {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        //set cookie
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          dispatch(fetchUserSucess(data))
        })
        .catch(err => {
          const msg = err.message
          dispatch(fetchUserFailed(msg))
        })
    } catch (err) {
      const msg = err.message
      dispatch(fetchUserFailed(msg))
    }
  }
}
