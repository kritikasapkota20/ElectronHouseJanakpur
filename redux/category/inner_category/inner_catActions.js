import axios from 'axios'
import {
  FETCH_INNERCAT_REQUEST,
  FETCH_INNERCAT_DATA,
  FETCH_INNERCAT_ERROR,
} from './inner_catTypes'

// const fetch_innercat_request = () => {
//   return {
//     type: FETCH_INNERCAT_REQUEST,
//   }
// }

export const fetch_innercat_data = fetchedData => {
  return {
    type: FETCH_INNERCAT_DATA,
    payload: fetchedData,
  }
}

export const fetch_innercat_error = error => {
  return {
    type: FETCH_INNERCAT_ERROR,
    payload: error,
  }
}

export const fetch_innercat = () => {
  return async dispatch => {
    // dispatch(fetch_innercat_request())
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/inner_category/list`)
    dispatch(fetch_innercat_data(response.data))
    // fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/inner_category/list`, {
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     dispatch(fetch_innercat_data(data))
    //   })
    //   .catch(err => {
    //     dispatch(fetch_innercat_error(err))
    //     console.log(err)
    //   })
  }
}
