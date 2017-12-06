import 'whatwg-fetch'

const FETCH = Symbol('fetch')

const fetch = (url, options) => {
  return {
    type: options.types[0] || 'FETCH',
    [FETCH]: {
      url,
      options
    }
  }
}

export {
  fetch
}

const authentication = (store) => (next) => (action) => {
  if(!(AUTH in action)) {
    return next(action)
  }

  console.log('fetch_middleware', action)

  let {
    url,
    options,
  } = action[FETCH]

  let {
    types
  } = options

  next(fetchAction(types))

  window.fetch(url, options)
    .then(checkStatus)
    .then(toJson)
    .then((data) => next(successAction(data, types)))
    .catch((error) => next(failureAction(error, types)))
}

const checkStatus = (response) => {
  if (response.status < 200 || response.status >= 300) {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }

  return response
}

const toJson = (response) => response.json()

const fetchAction = (types) => (
  {
    type: types[0] || `FETCH`
  }
)

const successAction = (data, types) => (
  {
    type: types[1] || `FETCH_SUCCESS`,
    payload: data
  }
)

const failureAction = (error, types) => (
  {
    type: types[2] || `FETCH_FAILURE`,
    payload: error,
    error: true
  }
)

export default fetchMiddleware