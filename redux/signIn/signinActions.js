import {
  FETCH_SIGNIN_REQUEST,
  FETCH_SIGNIN_SUCCESS,
  FETCH_SIGNIN_ERROR,
} from './signinTypes'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

export const fetch_usersignin_request = () => {
  return {
    type: FETCH_SIGNIN_REQUEST,
  }
}

export const fetch_usersignin_success = () => {
  return {
    type: FETCH_SIGNIN_SUCCESS,
  }
}

export const fetch_usersignin_error = err => {
  return {
    type: FETCH_SIGNIN_ERROR,
    payload: err,
  }
}

export const fetch_usersignin = userdata => {
  return dispatch => {
    try {
      dispatch(fetch_usersignin_request())
      fetch('https://beauty.dev/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) {
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
            dispatch(fetch_usersignin_error(data.message))
          } else {
            Cookies.set('user', JSON.stringify(data.currentUser))
            dispatch(fetch_usersignin_success())
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
              title: 'you are successfully logged in',
            })
          }
        })
        .catch(err => {
          dispatch(fetch_usersignin_error(err))
        })
    } catch (err) {
      dispatch(fetch_usersignin_error(err))
    }
  }
}
