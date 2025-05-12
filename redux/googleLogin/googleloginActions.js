import {
  FETCH_GOOGLELOGIN_REQUEST,
  FETCH_GOOGLELOGIN_SUCCESS,
  FETCH_GOOGLELOGIN_ERROR,
} from './googleloginTypes'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export const fetch_googlelogin_request = () => {
  return {
    type: FETCH_GOOGLELOGIN_REQUEST,
  }
}

export const fetch_googlelogin_success = msg => {
  return {
    type: FETCH_GOOGLELOGIN_SUCCESS,
    payload: msg,
  }
}

export const fetch_googlelogin_error = err => {
  return {
    type: FETCH_GOOGLELOGIN_ERROR,
    payload: err,
  }
}

export const fetch_googlelogin = response => {
  return dispatch => {
    dispatch(fetch_googlelogin_request())
    fetch('https://shop.dev/api/user/googleLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: response.tokenId }),
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
        dispatch(fetch_googlelogin_success(response))
      })
      .catch(error => {
        dispatch(fetch_googlelogin_error(error))
        console.log(error)
      })
  }
}
