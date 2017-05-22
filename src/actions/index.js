import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const receiveDiscounts = discounts => ({
  type: types.RECEIVE_DISCOUNTS,
  discounts: discounts
})

export const getAllDiscounts = () => dispatch => {
  shop.getDiscounts(discounts => {
    dispatch(receiveDiscounts(discounts))
  })
}

const addToBasketUnsafe = productId => ({
  type: types.ADD_TO_BASKET,
  productId
})

const addDiscountToBasket = discount => ({
  type: types.ADD_DISCOUNT_TO_BASKET,
  discount
})

export const addToBasket = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToBasketUnsafe(productId))
  }
  const discountInBasket = getState().basket.discountById.filter(function( obj ) { return obj.id === productId; })[0];
  if (getState().products.discountById[productId] && !discountInBasket) {
    dispatch(addDiscountToBasket(getState().products.discountById[productId]))
  }
}

export const checkout = products => (dispatch, getState) => {
  const { basket } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      basket
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, basket })
  })
}
