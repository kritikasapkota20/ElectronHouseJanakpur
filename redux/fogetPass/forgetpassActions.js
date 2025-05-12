import {
  FETCH_FORGETPASS_REQUEST,
  FETCH_FORGETPASS_SUCCESS,
  FETCH_FORGETPASS_ERROR,
} from './forgetpassTypes'
import Swal from 'sweetalert2'

export const fetch_forgetpass_request = () => {
  return {
    type: FETCH_FORGETPASS_REQUEST,
  }
}

export const fetch_forgetpass_success = msg => {
  return {
    type: FETCH_FORGETPASS_SUCCESS,
    payload: msg,
  }
}

export const fetch_forgetpass_error = err => {
  return {
    type: FETCH_FORGETPASS_ERROR,
    payload: err,
  }
}

export const fetch_forgetpass = userdata => {
  return dispatch => {
    try {
      dispatch(fetch_forgetpass_request())
      fetch('https://shop.dev/api/user/forget-password', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            Swal.fire({
              icon: 'success',
              title: 'Yayyy...',
              text: data.message,
              footer: '<a href="/signin">signin here</a>',
            })
            dispatch(fetch_forgetpass_success(data.message))
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Opps...',
              text: data.error,
              footer: '<a href="/signin">signin here</a>',
            })
            dispatch(fetch_forgetpass_error(data.error))
          }
        })
        .catch(err => {
          dispatch(fetch_forgetpass_error(err))
        })
    } catch (err) {
      dispatch(fetch_forgetpass_error(err))
    }
  }
}
