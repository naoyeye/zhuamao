import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import homepageReducer from 'admin/homepage/reducers/homepageReducer'

let createLogger = require('redux-logger')

// let _INIT_DATA = window._CONFIG

// let state = {
//   'config': _INIT_DATA.config
// }

let creator

if (process.env.NODE_ENV !== 'production') {

  creator = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger())
  )(createStore)
} else {
  creator = compose(
    applyMiddleware(thunk)
  )(createStore)
}

export default function configureStore(initState) {
  const store = creator(homepageReducer, initState)
  return store
}
