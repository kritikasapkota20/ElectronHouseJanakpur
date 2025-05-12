import {
  FETCH_ROOTCAT_REQUEST,
  FETCH_ROOTCAT_DATA,
  FETCH_ROOTCAT_ERROR,
} from './root_catTypes'

export const fetch_rootcat_request = () => {
  return {
    type: FETCH_ROOTCAT_REQUEST,
  }
}

export const fetch_rootcat_data = data => {
  return {
    type: FETCH_ROOTCAT_DATA,
    payload: data,
  }
}

export const fetch_rootcat_error = error => {
  return {
    type: FETCH_ROOTCAT_ERROR,
    payload: error,
  }
}

export const fetchRootcat = () => {
  return dispatch => {
    // dispatch(fetch_rootcat_request)
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/main_category/list`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        dispatch(fetch_rootcat_data(data))
        console.log(data);
      })
      .catch(err => {
        dispatch(fetch_rootcat_error(err))
        console.log(err)
      })
  }
}
