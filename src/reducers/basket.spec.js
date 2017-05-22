import basket from './basket'

describe('reducers', () => {
  describe('basket', () => {
    const initialState = {
      addedIds: [],
      quantityById: {}
    }

    it('should provide the initial state', () => {
      expect(basket(undefined, {})).toEqual(initialState)
    })

    it('should handle CHECKOUT_REQUEST action', () => {
      expect(basket({}, { type: 'CHECKOUT_REQUEST' })).toEqual(initialState)
    })

    it('should handle CHECKOUT_FAILURE action', () => {
      expect(basket({}, { type: 'CHECKOUT_FAILURE', basket: 'basket state' })).toEqual('basket state')
    })

    it('should handle ADD_TO_BASKET action', () => {
      expect(basket(initialState, { type: 'ADD_TO_BASKET', productId: 1 })).toEqual({
        addedIds: [ 1 ],
        quantityById: { 1: 1 }
      })
    })

    describe('when product is already in basket', () => {
      it('should handle ADD_TO_BASKET action', () => {
        const state = {
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(basket(state, { type: 'ADD_TO_BASKET', productId: 2 })).toEqual({
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 }
        })
      })
    })
  })
})
