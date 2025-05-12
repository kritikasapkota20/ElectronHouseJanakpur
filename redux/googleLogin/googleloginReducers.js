import {
  FETCH_GOOGLELOGIN_REQUEST,
  FETCH_GOOGLELOGIN_SUCCESS,
  FETCH_GOOGLELOGIN_ERROR,
} from './googleloginTypes'

const initialState = {
  success: false,
  status: 'user has not been logined yet with google',
}

const googleloginReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_GOOGLELOGIN_REQUEST:
      return {
        ...state,
      }
    case FETCH_GOOGLELOGIN_SUCCESS:
      return {
        success: true,
        status: actions.payload,
      }
    case FETCH_GOOGLELOGIN_ERROR:
      return {
        success: false,
        status: actions.payload,
      }
    default:
      return state
  }
}

export default googleloginReducers
