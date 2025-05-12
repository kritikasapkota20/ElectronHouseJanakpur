import {
  FETCH_LOGOUT_REQUEST,
  FETCH_LOGOUT_SUCCESS,
  FETCH_LOGOUT_ERROR,
} from './logoutTypes'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

export const fetch_logout_request = () => {
  return {
    type: FETCH_LOGOUT_REQUEST,
  }
}

export const fetch_logout_success = msg => {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    payload: msg,
  }
}

export const fetch_logout_error = err => {
  return {
    type: FETCH_LOGOUT_ERROR,
    payload: err,
  }
}

export const fetch_logout = () => {
  return dispatch => {
    dispatch(fetch_logout_request())
    fetch('https://shop.dev/api/user/signout', {
      method: 'post',
    })
      .then(res => res.json())
      .then(data => {
        Cookies.remove('user')
        dispatch(fetch_logout_success(data.message))
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })

        Toast.fire({
          icon: 'success',
          title: data.message,
        })
      })
      .catch(err => {
        dispatch(fetch_logout_error(err))
      })
  }
}
