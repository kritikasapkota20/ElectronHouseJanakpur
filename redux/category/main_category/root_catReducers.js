import {
  FETCH_ROOTCAT_REQUEST,
  FETCH_ROOTCAT_DATA,
  FETCH_ROOTCAT_ERROR,
} from './root_catTypes'

const initialState = {
  loading: false,
  status: 'root_categories is not fetched yet',
  data: null,
}

const fetchMainCatReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_ROOTCAT_REQUEST:
      return {
        ...state,
      }
    case FETCH_ROOTCAT_DATA:
      return {
        loading: true,
        status: 'main category have been fetched',
        data: actions.payload,
      }
    case FETCH_ROOTCAT_ERROR:
      return {
        loading: false,
        status: actions.payload,
        data: null,
      }
    default:
      return state
  }
}

export default fetchMainCatReducer
