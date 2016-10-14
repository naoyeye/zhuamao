// import { combineReducers } from 'redux'
import * as types from './../constants/homepageActionTypes'
import { FEED_ACCOUNTS } from '../../../../config/site-config'

let _CONFIG = window._CONFIG

const INIT_STATE = {
  config: _CONFIG ? _CONFIG.config : {},
  feedAccounts: FEED_ACCOUNTS,
  loading: false,
  query: {},
  message: '',
  error: false
}

export default function homepageReducer(state = INIT_STATE, action) {

  console.log('state', state)

  switch (action.type) {

    // case types.INIT_CONFIG:
    //   {
    //     const _state = { ...state }
    //     return _state
    //   }

    case types.CRAWL_IMAGES:
      {
        const _state = { ...state }
        _state.query = action.query
        _state.loading = true
        return _state
      }

    case types.CRAWL_IMAGES_SUCCESS:
      {
        const _state = { ...state }
        const res = action.res
        // const _shops = _state.shops.concat(res.data.shops)

        _state.loading = false
        // _state.shops = _shops
        _state.error = res.error
        _state.message = res.message
        return _state
      }

    case types.CRAWL_IMAGES_FAIL:
      {
        const _state = { ...state }
        console.log('hhhhhhhhhhhh', action)

        _state.loading = false
        _state.error = true
        _state.message = action.error.message
        return _state
      }

    default:
      return state

  }

}

