import {
  SIGNUP_FETCH_REQUEST,
  SIGNUP_FETCH_SUCCESS,
  SIGNUP_FETCH_ERROR,
} from './signupTypes'

const initialState = {
  loading: true,
  status: [],
}

const signupReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SIGNUP_FETCH_REQUEST:
      return {
        ...state,
      }
    case SIGNUP_FETCH_SUCCESS:
      return {
        loading: false,
        status: actions.payload,
        success: true,
      }
    case SIGNUP_FETCH_ERROR:
      return {
        loading: false,
        status: actions.payload,
        success: false,
      }
    default:
      return state
  }
}

export default signupReducer
