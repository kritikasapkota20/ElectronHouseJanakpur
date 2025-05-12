import {
  FETCH_SUBCAT_REQUEST,
  FETCH_SUBCAT_DATA,
  FETCH_SUBCAT_ERROR,
} from './sub_catTypes'

const initialState = {
  loading: false,
  status: 'sub-categories is not fetched yet',
  data: null,
}

const fetchSubCatReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_SUBCAT_REQUEST:
      return {
        ...state,
      }
    case FETCH_SUBCAT_DATA:
      return {
        loading: true,
        status: 'sub categories have been fetched successfully.',
        data: actions.payload,
      }
    case FETCH_SUBCAT_ERROR:
      return {
        loading: false,
        status: actions.payload,
        data: null,
      }
    default:
      return state
  }
}

export default fetchSubCatReducer
