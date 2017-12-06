import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import fetchMiddleware from '../middleware/fetch-middleware'

import * as ducks from '../ducks'
import logMiddleware from '../middleware/log-middleware'

/* REDUCERS */
const reducer = combineReducers({
  products: ducks.products,
  cart: ducks.cart,
  user: ducks.user
})

/* MIDDLEWARE */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = composeEnhancers(
  applyMiddleware(
    fetchMiddleware,
    thunk,
    logMiddleware,
  )
)

const store = createStore(reducer, middleware)

export default store