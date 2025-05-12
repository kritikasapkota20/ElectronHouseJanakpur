import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
} from './userTypes'

const initialState = {
  loading: false,
  User: '',
  error: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        User: action.payload,
      }
    case FETCH_USER_ERROR:
      return {
        loading: false,
        User: '',
      }

    default:
      return state
  }
}

export default userReducer
