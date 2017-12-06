import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import { FilteredProductList } from './components/FilteredProductList'
import { CartButton } from './components/CartButton/index'
import { Button } from './components/core/Button'
import * as cart from './ducks/cart'

class App extends Component {

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Shoe shop</h1>
          <div className='App-actions'>
            <CartButton count={this.props.cart.count} />
          </div>
        </header>

        <div className='container'>
          <FilteredProductList actions={this.props.actions} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: {
      products: cart.productList(state.cart),
      count: cart.productCount(state.cart)
    }
  }
}
const mapDispatch = (dispatch) => {
  return { 
    actions: {
      addToCart: (product) => dispatch(cart.actions.addProduct(product))
    }
  }
}

export default connect(mapState, mapDispatch)(App)
