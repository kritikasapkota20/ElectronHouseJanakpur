import { UPDATE_WISHLIST_STATE, ADD_TO_WISHLIST } from './wishlistTypes'

const initialState = {
  status: 'wishlist in neutral',
  stateData: false,
}

const fetchWishListReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case UPDATE_WISHLIST_STATE:
      return {
        status: 'wishlist in action',
        stateData: actions.payload,
      }
     case ADD_TO_WISHLIST:
      return {
        status:'added to wishlist',
        stateData: actions.payload
      } 
    default:
      return state
  }
}

export default fetchWishListReducer
