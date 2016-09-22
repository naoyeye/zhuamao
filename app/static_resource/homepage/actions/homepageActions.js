import * as types from './../constants/homepageActionTypes'
import Fetch from 'common/utils/fetch'

export function initConfig(config) {
  return {
    'type': types.INIT_CONFIG,
    config
  }
}

const url = '/api/home/shops'
export function load(query) {
  return (dispatch, getState) => {
    dispatch({
      'type': types.LOAD,
      query
    })
    return Fetch.get(url, query).then((res) => {
      let r = parseInt(res.r, 10)
      if (r === 0) {
        return dispatch({
          'type': types.LOAD_SUCCESS, 
          res
        })
      } else {
        return dispatch({
          'type': types.LOAD_FAIL, 
          res
        })
      }
    }).catch((err) => {
      return dispatch({
        'type': types.LOAD_FAIL, 
        err
      })
    })
  }
}
