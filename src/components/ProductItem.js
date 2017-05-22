import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductItem = ({ product, discount, onAddToBasketClicked }) => (
  <div style={{ marginBottom: 20 }}>
    <Product
      title={product.title}
      price={product.price}
      discount={discount} />
    <button
      onClick={onAddToBasketClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? 'Add to basket' : 'Sold Out'}
    </button>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  discount: PropTypes.shape({
    id: PropTypes.number,
    get: PropTypes.number,
    pay: PropTypes.number
  }),
  onAddToBasketClicked: PropTypes.func.isRequired
}

export default ProductItem
