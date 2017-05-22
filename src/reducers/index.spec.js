import { getTotal, getBasketProducts } from './index'

describe('selectors', () => {
  describe('getTotal', () => {
    it('should return price total', () => {
      const state = {
        basket: {
          addedIds: [ 1, 2, 3 ],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 1.99
            },
            2: {
              id: 1,
              price: 4.99
            },
            3: {
              id: 1,
              price: 9.99
            }
          }
        }
      }
      expect(getTotal(state)).toBe('27.93')
    })
  })

  describe('getBasketProducts', () => {
    it('should return products with quantity', () => {
      const state = {
        basket: {
          addedIds: [ 1, 2, 3 ],
          quantityById: {
            1: 4,
            2: 2,
            3: 1
          }
        },
        products: {
          byId: {
            1: {
              id: 1,
              price: 1.99
            },
            2: {
              id: 1,
              price: 4.99
            },
            3: {
              id: 1,
              price: 9.99
            }
          }
        }
      }

      expect(getBasketProducts(state)).toEqual([
        {
          id: 1,
          price: 1.99,
          quantity: 4
        },
        {
          id: 1,
          price: 4.99,
          quantity: 2
        },
        {
          id: 1,
          price: 9.99,
          quantity: 1
        }
      ])
    })
  })
})
