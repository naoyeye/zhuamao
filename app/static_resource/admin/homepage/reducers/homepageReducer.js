import { combineReducers } from 'redux'
import * as types from './../constants/homepageActionTypes'

let _CONFIG = window._CONFIG

const INIT_STATE = {
  'config':  _CONFIG ? _CONFIG.config : {}
}


export default function homepageReducer (state=INIT_STATE, action) {

  console.log('state', state)

  switch (action.type) {

    case types.INIT_CONFIG:
      {
        const _state = { ...state }
        return _state
      }
      break

    case types.LOAD:
      {
        const _state = { ...state }
        _state.query = action.query
        _state.loading = true
        return _state
      }
      break

    case types.LOAD_SUCCESS:
      {
        const _state = { ...state }
        const res = action.res
        const _shops = _state.shops.concat(res.data.shops)
        
        _state.loading = false
        _state.shops = _shops
        return _state
      }
      break

    case types.LOAD_FAIL:
      {
        const _state = { ...state }
        _state.loading = false
        _state.error = action.error
        return _state
      }
      break

    default:
      return state

  }

}

