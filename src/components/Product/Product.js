import React, { Component } from 'react'
import { CartIcon } from '../CartIcon'

import './Product.css'

class Product extends Component {

  addToCart = () => {
    this.props.actions.addToCart(this.props.product)
  }

  render() {
    const {
      product
    } = this.props

    return (
      <div className="Product">
        <div className="Product-visual">
          <img className="Product-photo" src={ product.photos[0].main } alt=""/>
        </div>
        <div className="Product-info">
          <div>{ product.brand }</div>
          <h2 className="Product-title">{ product.title }</h2>
        </div>
        <div className="Product-actions">
          <div className="Product-price">{ product.price.actual } UAH</div>
          <button className="Product-addToCartButton" onClick={this.addToCart}>
            <CartIcon state='put' className="Product-icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default Product