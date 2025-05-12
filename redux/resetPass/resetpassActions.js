import {
  FETCH_RESETPASS_REQUEST,
  FETCH_RESETPASS_SUCCESS,
  FETCH_RESETPASS_ERROR,
} from './resetpassTypes'
import Swal from 'sweetalert2'

export const fetch_resetpass_request = () => {
  return {
    type: FETCH_RESETPASS_REQUEST,
  }
}

export const fetch_resetpass_success = msg => {
  return {
    type: FETCH_RESETPASS_SUCCESS,
    payload: msg,
  }
}

export const fetch_resetpass_error = err => {
  return {
    type: FETCH_RESETPASS_ERROR,
    payload: err,
  }
}

export const fetch_resetpass = userdata => {
  return dispatch => {
    dispatch(fetch_resetpass_request())
    fetch('https://shop.dev/api/user/reset-password', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdata),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Opps...',
            text: data.error,
            footer: '<a href="/signin">signin here</a>',
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Yayyy...',
            text: data.message,
            footer: '<a href="/signin">signin here</a>',
          })
        }
        fetch_resetpass_success(data)
      })
      .catch(err => {
        fetch_resetpass_error(err)
      })
  }
}
