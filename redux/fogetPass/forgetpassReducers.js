import {
  FETCH_FORGETPASS_REQUEST,
  FETCH_FORGETPASS_SUCCESS,
  FETCH_FORGETPASS_ERROR,
} from './forgetpassTypes'

const initialState = {
  loading: true,
  status: 'forget password is not activated',
}

const forgetpassReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_FORGETPASS_REQUEST:
      return {
        ...state,
      }
    case FETCH_FORGETPASS_SUCCESS:
      return {
        loading: false,
        status: actions.payload,
      }
    case FETCH_FORGETPASS_ERROR:
      return {
        loading: false,
        status: actions.payload,
      }
    default:
      return state
  }
}

export default forgetpassReducer
