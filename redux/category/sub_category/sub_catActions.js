import {
  FETCH_SUBCAT_REQUEST,
  FETCH_SUBCAT_DATA,
  FETCH_SUBCAT_ERROR,
} from './sub_catTypes'

export const fetch_subcat_request = () => {
  return {
    type: FETCH_SUBCAT_REQUEST,
  }
}

export const fetch_subcat_data = data => {
  return {
    type: FETCH_SUBCAT_DATA,
    payload: data,
  }
}

export const fetch_subcat_error = error => {
  return {
    type: FETCH_SUBCAT_ERROR,
    payload: error,
  }
}

export const fetch_subcat = () => {
  return dispatch => {
    dispatch(fetch_subcat_request())
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/sub_category/list`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetch_subcat_data(data))
      })
      .catch(err => {
        dispatch(fetch_subcat_error(err))
        console.log(err)
      })
  }
}
