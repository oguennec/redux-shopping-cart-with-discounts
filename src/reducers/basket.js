
import {
  ADD_TO_BASKET,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  ADD_DISCOUNT_TO_BASKET,
} from '../constants/ActionTypes'

const initialState = {
  addedIds: [],
  quantityById: {},
  discountById: []
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

const discountById = (state = initialState.discountById, action) => {
  switch (action.type) {
    case ADD_DISCOUNT_TO_BASKET:
      if (state.map(i => i.id).indexOf(action.discount.id) !== -1) {
        return state
      }
      return [ ...state,
        action.discount
      ]
    default:
      return state
  }
}

export const getQuantityAfterDiscount = (state, productId) => {
  let discount = state.discountById.filter(obj => obj.id === productId)[0]; 
    if (discount) {
      let div = Math.trunc(state.quantityById[discount.id] / discount.get)
      let rem = state.quantityById[productId] % discount.get
      return div * discount.pay + rem || 0
    }
    return state.quantityById[productId] || 0
}

export const getAddedIds = state => state.addedIds

const basket = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.basket
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action),
        discountById: discountById(state.discountById, action)
      }
  }
}

export default basket
