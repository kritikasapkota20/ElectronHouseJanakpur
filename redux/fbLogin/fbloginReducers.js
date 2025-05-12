import {
  FETCH_FBLOGIN_REQUEST,
  FETCH_FBLOGIN_SUCCESS,
  FETCH_FBLOGIN_ERROR,
} from './fbloginTypes'

const initialState = {
  success: false,
  status: 'user has not been logined yet with facebook',
}

const facebookloginReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_FBLOGIN_REQUEST:
      return {
        ...state,
      }
    case FETCH_FBLOGIN_SUCCESS:
      return {
        success: true,
        status: actions.payload,
      }
    case FETCH_FBLOGIN_ERROR:
      return {
        success: false,
        status: actions.payload,
      }
    default:
      return state
  }
}

export default facebookloginReducers
