import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css';
import { FilteredProductList } from './components/FilteredProductList'
import { CartButton } from './components/CartButton/index'
import { Button } from './components/core/Button'
import * as cart from './ducks/cart'
import * as user from './ducks/user'

class App extends Component {

  signIn = () => {
    this.props.actions.signIn({
      username: 'admin',
      password: 'admin'
    })
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Shoe shop</h1>
          <div className='App-actions'>
            <Button onClick={this.signIn}>Sign In</Button>
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
      addToCart: (product) => dispatch(cart.actions.addProduct(product)),
      fetchCart: () => dispatch(cart.actions.fetchCart()),
      signIn: (u) => dispatch(user.actions.signIn(u))
    }
  }
}

export default connect(mapState, mapDispatch)(App)
