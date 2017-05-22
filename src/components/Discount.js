import React from 'react'
import PropTypes from 'prop-types'

const Discount = ({ value, title }) => (
  <div>
    {title} - &#36;{value}
  </div>
)

Discount.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string
}

export default Discount
