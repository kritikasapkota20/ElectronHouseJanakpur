import {
  FETCH_FBLOGIN_REQUEST,
  FETCH_FBLOGIN_SUCCESS,
  FETCH_FBLOGIN_ERROR,
} from './fbloginTypes'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export const fetch_fblogin_request = () => {
  return {
    type: FETCH_FBLOGIN_REQUEST,
  }
}

export const fetch_fblogin_success = msg => {
  return {
    type: FETCH_FBLOGIN_SUCCESS,
    payload: msg,
  }
}

export const fetch_fblogin_error = err => {
  return {
    type: FETCH_FBLOGIN_ERROR,
    payload: err,
  }
}

export const fetch_fblogin = response => {
  return dispatch => {
    dispatch(fetch_fblogin_request())
    fetch('https://shop.dev/api/user/facebookLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: response.accessToken,
        userID: response.userID,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response?.message) {
          Swal.fire({
            icon: 'success',
            title: 'Yayyy...',
            text: response.message,
            footer: '<a href="/signin">signin here</a>',
          })
        } else if (response?.error) {
          Swal.fire({
            icon: 'success',
            title: 'Yayyy...',
            text: response.error,
            footer: '<a href="/signin">signin here</a>',
          })
        }
        Cookies.set('user', JSON.stringify(response.user))
        dispatch(fetch_fblogin_success(response))
      })
      .catch(error => {
        dispatch(fetch_fblogin_error(error))
        console.log(error)
      })
  }
}
