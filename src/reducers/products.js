import { combineReducers } from 'redux'
import { RECEIVE_DISCOUNTS, RECEIVE_PRODUCTS, ADD_TO_BASKET } from '../constants/ActionTypes'

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const discountById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DISCOUNTS:
      return {
        ...state,
        ...action.discounts.reduce((obj, discount) => {
          obj[discount.id] = discount
          return obj
        }, {})
      }
    default:
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds,
  discountById
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))

export const getProductDiscount = (state, id) =>
  state.discountById[id]

export const getVisibleProductDiscounts = (state) =>
  state.discountById
