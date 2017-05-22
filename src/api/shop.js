/**
 * Mocking client-server processing
 */
import _products from './products.json'
import _discounts from './discounts.json'

const TIMEOUT = 100

export default {
  getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
  getDiscounts: (cb, timeout) => setTimeout(() => cb(_discounts), timeout || TIMEOUT)
}
