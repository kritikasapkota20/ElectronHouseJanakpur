import {
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_ERROR,
} from './activateUserTypes'
import Swal from 'sweetalert2'

export const fetch_activateuser_request = () => {
  return {
    type: ACTIVATE_USER_REQUEST,
  }
}

export const fetch_activateuser_success = msg => {
  return {
    type: ACTIVATE_USER_SUCCESS,
    payload: msg,
  }
}

export const fetch_activateuser_error = err => {
  return {
    type: ACTIVATE_USER_ERROR,
    payload: err.message,
  }
}

export const fetch_activateuser = signup_token => {
  return dispatch => {
    try {
      dispatch(fetch_activateuser_request())
      fetch('https://beauty.dev/api/user/activate-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signup_token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            Swal.fire({
              icon: 'error',
              title: 'Opps...',
              text: data.error,
              footer: '<a href="/signup">signup again</a>',
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Yay...',
              text: data.message,
              footer: '<a href="/login">signin here</a>',
            })
          }

          dispatch(fetch_activateuser_success(data))
        })
        .catch(err => {
          dispatch(fetch_activateuser_error(err))
        })
    } catch (err) {
      dispatch(fetch_activateuser_error(err))
    }
  }
}
