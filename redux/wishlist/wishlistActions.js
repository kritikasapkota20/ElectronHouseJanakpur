import { UPDATE_WISHLIST_STATE } from "./wishlistTypes";

export const toUpdateWishlistState = (stateData) => {
    return {
        type: UPDATE_WISHLIST_STATE,
        payload:stateData
    }
}

export const fetchUpdateWishlistState = (stateData) => { 
    return dispatch => {
            dispatch(toUpdateWishlistState(!stateData))
    }
}
