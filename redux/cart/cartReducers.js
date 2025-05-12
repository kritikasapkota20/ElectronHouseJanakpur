import { ADD_TO_CART, FETCH_CART_DATA, CLEAR_CART_DATA, DECREASE_CART_ITEM, DELETE_CART_ITEM, CART_UPDATE_STATE } from './cartTypes'

const initialState = {
  status: 'cart inactive',
  data: false
}

const initialCartState = {
  status: 'cart state neutral',
  stateData: false
}

const initialCartState1 = {
  status: 'cart state neutral',
  stateData: true
}



const fetchCartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "ADD_TO_CART":
      return {
        status: 'item  has been added to cart',
      }
    case FETCH_CART_DATA:
      return {
        status: 'items have been fetched from cart',
      }
    case CLEAR_CART_DATA:
      return {
        status: 'items have been cleared from cart',
      }
    case "DECREASE_CART_ITEM":
      return {
        status: 'item has been decreased from cart',
      }
    case DELETE_CART_ITEM:
      return {
        status: 'item has been deleted from cart',
      }
    //  case "UPDATE_CART":
    //   return{
    //       status:'cart has been updated',
    //       data :actions.payload 
    //   }
    default:
      return state
  }
}
const fetchCartStateReducer = (state = initialCartState, actions) => {
  switch (actions.type) {
    case CART_UPDATE_STATE:
      return {
        status: 'cart has been updated',
        stateData: actions.payload
      }
    default:
      return state
  }
}

const fetchCartStateReducer1 = (state = initialCartState1, actions) => {
  switch (actions.type) {
    case 'UPDATE_CART1':
      return {
        status: 'cart has been updated',
        stateData: actions.payload
      }
    default:
      return state
  }
}
const initialThemeState = {
  status: 'dark mode is turned on.',
  mode: true
}
const fetchDarkModeReducer = (state = initialThemeState, actions) => {
  switch (actions.type) {
    case 'FETCH_DARK_MODE':
      return {
        status: 'dark mode has been updated.',
        mode: actions.payload
      }
    default:
      return state
  }
}

export { fetchCartStateReducer, fetchCartReducer, fetchCartStateReducer1, fetchDarkModeReducer }
