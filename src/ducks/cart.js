import { createSelector } from 'reselect'
import { fetch, ACTION_FETCH, ACTION_SUCCESS, ACTION } from '../middleware/fetch-middleware'
import { combineReducers } from 'redux'

const baseUrl = 'http://localhost:3005';

/* ACTION TYPES */
const ADD_PRODUCT = 'cart/ADD_PRODUCT'

/* ACTIONS */
const fetchCart = () => {
  /* return fetch(`${baseUrl}/products`, {
    headers: {
      'Content-type': 'application/json'
    },
    types: [
      FETCH,
      FETCH_SUCCESS,
      FETCH_FAILURE
    ]
  }) */
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