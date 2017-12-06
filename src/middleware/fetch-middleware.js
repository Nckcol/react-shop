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

const fetchMiddleware = (store) => (next) => (action) => {
  if(!(FETCH in action)) {
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

  if(!options.headers) {
    options.headers = {}
  }

  if(TOKEN !== '') {
    options.headers[authHeader] = 'Bearer ' + TOKEN
  }

  next(fetchAction(types))

  window.fetch(url, options)
    .then(checkStatus)
    .then(toJson)
    .then(getAuth)
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

let TOKEN = ''
const authHeader = 'Authorization'

const getAuth = (data) => {
  if('token' in data) {
    TOKEN = data.token
  }
  return data
}

const toJson = (response) => {
  try {
    return response.json()
  } catch (e) {
    return response
  }
}

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