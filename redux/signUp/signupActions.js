import {
  SIGNUP_FETCH_REQUEST,
  SIGNUP_FETCH_SUCCESS,
  SIGNUP_FETCH_ERROR,
} from './signupTypes'
import Swal from 'sweetalert2'

export const fetchsignuprequest = () => {
  return {
    type: SIGNUP_FETCH_REQUEST,
  }
}

export const fetchsignupsuccess = msg => {
  return {
    type: SIGNUP_FETCH_SUCCESS,
    payload: [msg],
  }
}

export const fetchsignuperror = err => {
  return {
    type: SIGNUP_FETCH_ERROR,
    payload: err,
  }
}

export const signup_action = userdata => {
  return dispatch => {
    try {
      dispatch(fetchsignuprequest)

      fetch('https://beauty.dev/api/user/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      })
        .then(res => res.json())
        .then(data => {
          if (data.errors) {
            dispatch(fetchsignuperror(data.errors))
          } else {
            dispatch(fetchsignupsuccess(data))
            Swal.fire({
              icon: 'success',
              title: 'yayy...',
              text: data.message,
              footer: '<a href="https://gmail.com">check your mail</a>',
            })
          }
        })
        .catch(err => {
          dispatch(fetchsignuperror(err))
        })
    } catch (err) {
      dispatch(fetchsignuperror(err))
    }
  }
}
