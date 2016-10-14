import * as types from './../constants/homepageActionTypes'
import Fetch from 'common/utils/fetch'

// export function initConfig(config) {
//   return {
//     'type': types.INIT_CONFIG,
//     config
//   }
// }

const url = '/api/crawl'
export function crawlImages(query) {
  return (dispatch, getState) => {
    dispatch({
      'type': types.CRAWL_IMAGES,
      query
    })
    return Fetch.get(url, query).then((res) => {
      if (!res.error) {
        return dispatch({
          'type': types.CRAWL_IMAGES_SUCCESS,
          res
        })
      } else {
        return dispatch({
          'type': types.CRAWL_IMAGES_FAIL,
          res
        })
      }
    }).catch((error) => {
      return dispatch({
        'type': types.CRAWL_IMAGES_FAIL,
        error
      })
    })
  }
}
