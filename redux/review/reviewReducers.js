import { FETCH_PRODUCT_REVIEW_COUNT } from './reviewTypes'

const initialState = {
    status: 'no reviews yet',
    stateData: false,
}

const fetchProductReviewCountReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_PRODUCT_REVIEW_COUNT:
            return {
                status: 'reviews in action',
                stateData: actions.payload,
            }
        default:
            return state
    }
}

export default fetchProductReviewCountReducer
