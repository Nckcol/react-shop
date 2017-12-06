import { createSelector } from 'reselect'
import { fetch, ACTION_FETCH, ACTION_SUCCESS, ACTION } from '../middleware/fetch-middleware'

const baseUrl = 'http://localhost:3005';

/* ACTION TYPES */
const FETCH = 'products/FETCH'
const FETCH_SUCCESS = 'products/FETCH_SUCCESS'
const FETCH_FAILURE = 'products/FETCH_FAILURE'

/* ACTIONS */
const fetchProducts = () => {
  return fetch(`${baseUrl}/products`, {
    headers: {
      'Content-type': 'application/json'
    },
    types: [
      FETCH,
      FETCH_SUCCESS,
      FETCH_FAILURE
    ]
  })
}


export const actions = {
  fetchProducts
}

const defaultState = {
  list: []
}

/* REDUCERS */
const productsReducer = (state = defaultState, action) => {

  switch (action.type) {

    case FETCH:
      return state

    case FETCH_SUCCESS:

      return {
        ...state,
        list: action.payload
      }

    case FETCH_FAILURE:
      return state

  }

  return state
}


export default productsReducer

/* SELECTORS */
const productList = state => state.list

export {
  productList
}