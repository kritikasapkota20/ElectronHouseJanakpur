import {
  FETCH_RESETPASS_REQUEST,
  FETCH_RESETPASS_SUCCESS,
  FETCH_RESETPASS_ERROR,
} from './resetpassTypes'

const initialState = {
  loading: true,
  status: 'password has not been reset',
}

const resetpassReducers = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_RESETPASS_REQUEST:
      return {
        ...state,
      }
    case FETCH_RESETPASS_SUCCESS:
      return {
        loading: false,
        status: actions.payload,
      }
    case FETCH_RESETPASS_ERROR:
      return {
        loading: false,
        status: actions.payload,
      }
    default:
      return state
  }
}

export default resetpassReducers
