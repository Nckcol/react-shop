const logMiddleware = (state) => (next) => (action) => {
  console.log('Action:', action)
  next(action)
}

export default logMiddleware