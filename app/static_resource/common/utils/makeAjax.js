import Request from 'common/utils/request'
import { urlWithQuery, proxy2market } from './urlParse'

export default function (method) {
  return function (url,params,restConfig, dataParse, ajaxSetting) {
    if (!Request[method]) {
      throw new Error('lease check your method,it must be: get,post,put,delete')
    }
    let _url = url

    if (restConfig) {
      Object.keys(restConfig).map( (key) => {
        let re = new RegExp(':'+key,'gi')
        _url = _url.replace(re,restConfig[key])
      })
    }

    _url = proxy2market(_url)

    return new Promise( (resolve,reject) => {
      Request[method](_url,
        params,
        function (res) {
          let r = parseInt(res.r,10)
          let data = res

          // parse返回数据
          if (dataParse) {
            data = dataParse(data)
          }

          resolve(data)
        },
        function (err) {
          reject(err)
        },
        ajaxSetting
      )
    })
  }
}