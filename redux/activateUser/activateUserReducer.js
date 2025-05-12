import {
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_ERROR,
} from './activateUserTypes'
const initialState = {
  loading: true,
  status: 'user is being activated now',
}

const activateUserReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ACTIVATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACTIVATE_USER_SUCCESS:
      return {
        status: actions.payload,
        loading: false,
      }

    case ACTIVATE_USER_ERROR:
      return {
        status: actions.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default activateUserReducer
