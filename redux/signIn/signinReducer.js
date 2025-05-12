import {
  FETCH_SIGNIN_REQUEST,
  FETCH_SIGNIN_SUCCESS,
  FETCH_SIGNIN_ERROR,
} from './signinTypes'

const initialState = {
  success: false,
  status: 'user has not been signed in yet',
}

const signinReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_SIGNIN_REQUEST:
      return {
        ...state,
      }
    case FETCH_SIGNIN_SUCCESS:
      return {
        success: true,
        status: 'user has been fetched and saved into cookies',
      }
    case FETCH_SIGNIN_ERROR:
      return {
        success: false,
        status: actions.payload,
      }
    default:
      return state
  }
}

export default signinReducer
