import { combineReducers } from 'redux'
import userReducer from './user/userReducers'
import signupReducer from './signUp/signupReducers'
import activateUserReducer from './activateUser/activateUserReducer'
import signinReducer from './signIn/signinReducer'
import forgetpassReducer from './fogetPass/forgetpassReducers'
import resetpassReducers from './resetPass/resetpassReducers'
import googleloginReducers from './googleLogin/googleloginReducers'
import facebookloginReducers from './fbLogin/fbloginReducers'
import logoutReducers from './logout/logoutReducers'
import fetchMainCatReducer from './category/main_category/root_catReducers'
import fetchSubCatReducer from './category/sub_category/sub_catReducers'
import fetchInnerCatReducer from './category/inner_category/inner_catReducers'
import fetchProductReviewCountReducer from './review/reviewReducers'
import { fetchCartStateReducer, fetchCartReducer, fetchCartStateReducer1, fetchDarkModeReducer } from './cart/cartReducers'
import fetchWishListReducer from './wishlist/wishlistReducers'

const rootReducer = combineReducers({
  user: userReducer,
  usersignup: signupReducer,
  usersignin: signinReducer,
  activateuser: activateUserReducer,
  forgetpassword: forgetpassReducer,
  resetpassword: resetpassReducers,
  googlelogin: googleloginReducers,
  facebooklogin: facebookloginReducers,
  logout: logoutReducers,
  rootCategory: fetchMainCatReducer,
  subCategory: fetchSubCatReducer,
  innerCategory: fetchInnerCatReducer,
  cart: fetchCartReducer,
  wishlistState: fetchWishListReducer,
  cartState: fetchCartStateReducer,
  cartState1: fetchCartStateReducer1,
  reviewCount: fetchProductReviewCountReducer,
  darkMode:fetchDarkModeReducer
})

export default rootReducer
