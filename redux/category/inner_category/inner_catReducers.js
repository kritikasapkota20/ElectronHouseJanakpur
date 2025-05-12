import {
  FETCH_INNERCAT_REQUEST,
  FETCH_INNERCAT_DATA,
  FETCH_INNERCAT_ERROR,
} from './inner_catTypes'

const initialState = {
  loading: false,
  status: 'inner-categories have not been fetched yet',
  data: null,
}

const fetchInnerCatReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_INNERCAT_REQUEST:
      return {
        ...state,
      }
    case FETCH_INNERCAT_DATA:
      return {
        loading: true,
        status: 'inner-categories have been fetched',
        data: actions.payload,
      }
    case FETCH_INNERCAT_ERROR:
      return {
        loading: false,
        status: actions.payload,
        data: null,
      }
    default:
      return state
  }
}

export default fetchInnerCatReducer
