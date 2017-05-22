import { combineReducers } from 'redux'
import basket, * as fromBasket from './basket'
import products, * as fromProducts from './products'

export default combineReducers({
  basket,
  products
})

const getAddedIds = state => fromBasket.getAddedIds(state.basket)
const getQuantity = (state, id) => fromBasket.getQuantity(state.basket, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)
const getQuantityAfterDiscount = (state, id) => fromBasket.getQuantityAfterDiscount(state.basket, id)

export const getProductDiscount = (state, id) => fromProducts.getProductDiscount(state.products, id)

export const getTotalBeforeDiscount = state =>
      getAddedIds(state)
        .reduce((total, id) =>
          total + getProduct(state, id).price * getQuantity(state, id),
          0
        )
        .toFixed(2)

export const getTotalAfterDiscount = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantityAfterDiscount(state, id),
      0
    )
    .toFixed(2)

export const getDiscount = state =>
  (getTotalBeforeDiscount(state) - getTotalAfterDiscount(state))
    .toFixed(2)

export const getBasketProducts = state =>
  getAddedIds(state).map(id => ({
    ...getProduct(state, id),
    quantity: getQuantity(state, id)
  }))

export const getBasketDiscounts = state =>
  state.basket.discountById
    .filter(obj => Math.trunc(getQuantity(state, obj.id) / obj.get) !== 0)
    .map((obj) => ({
    ...getProduct(state, obj.id),
    value: (getProduct(state, obj.id).price * Math.trunc(getQuantity(state, obj.id) / obj.get)).toFixed(2)
  }))
