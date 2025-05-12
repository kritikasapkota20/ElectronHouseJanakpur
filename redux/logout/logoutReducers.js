import {
  FETCH_LOGOUT_REQUEST,
  FETCH_LOGOUT_SUCCESS,
  FETCH_LOGOUT_ERROR,
} from './logoutTypes'

const initialState = {
  success: false,
  status: 'user has not been logged out yet',
}

const logoutReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_LOGOUT_REQUEST:
      return {
        ...state,
      }
    case FETCH_LOGOUT_SUCCESS:
      return {
        success: true,
        status: actions.payload,
      }
    case FETCH_LOGOUT_ERROR:
      return {
        success: false,
        status: actions.payload,
      }
    default:
      return state
  }
}

export default logoutReducers
