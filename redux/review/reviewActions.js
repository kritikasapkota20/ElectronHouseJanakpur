import {
    FETCH_PRODUCT_REVIEW_COUNT
} from './reviewTypes'


export const fetchProductReviewCount = data => {
    return {
        type: FETCH_PRODUCT_REVIEW_COUNT,
        payload: data,
    }
}



export const productReviewCount = (productId) => {
    return dispatch => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_review/get_review_count/${productId}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                dispatch(fetchProductReviewCount(data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}
