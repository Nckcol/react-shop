import { createSelector } from 'reselect'
import { fetch, ACTION_FETCH, ACTION_SUCCESS, ACTION } from '../middleware/fetch-middleware'
import { combineReducers } from 'redux'

//const baseUrl = 'http://10.1.3.101:8080'

const baseUrl = 'http://172.17.0.1:8080'

/* ACTION TYPES */
const ADD_PRODUCT = 'cart/ADD_PRODUCT'
const FETCH_CART = 'cart/FETCH_CART'
const FETCH_CART_SUCCESS = 'cart/FETCH_CART_SUCCESS'
const FETCH_CART_FAILURE = 'cart/FETCH_CART_FAILURE'

/* ACTIONS */
const fetchCart = () => {
  return fetch(`${baseUrl}/cart`, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    types: [
      FETCH_CART,
      FETCH_CART_SUCCESS,
      FETCH_CART_FAILURE
    ]
  })
}

const addProduct = ({ id }) => {
  return {
    type: ADD_PRODUCT,
    payload: {
      id
    }
  }
}


export const actions = {
  fetchCart,
  addProduct
}

const defaultState = {
  products: []
}

/* REDUCERS */
const cart = (state = defaultState, action) => {

  switch (action.type) {

    case FETCH_CART: 
      console.log(action.payload)
      return state

    case ADD_PRODUCT:
      return {
          ...state,
          products: [
              ...state.products,
              action.payload
          ]
      }

  }

  return state
}


export default cart

/* SELECTORS */
const productList = state => state.products
const productCount = state => state.products.length

export {
  productList,
  productCount
}