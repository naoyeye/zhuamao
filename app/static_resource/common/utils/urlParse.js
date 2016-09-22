/**
 * 解析 url 的方法集合
 */

import json2string from './json2string'

export const getQuery = function (url, name){
  let query = url.indexOf('?') > 0 ? url.split('?').pop() : window.location.search.substring(1)
  let vars = query.split('&')
  let result = {}

  for (let i = 0,len = vars.length;i < len;i++) {
    let pair = vars[i].split('=');
    if (name && pair[0] === name) {
      return pair[1]
    }
    if (pair[0]) {
      result[pair[0]] = pair[1]
    }
  }

  if (name && !Object.keys(params).includes(name)) {
    return null
  }

  return result
}


export const urlWithQuery = function (url, query, encode=false) {
  let originWithPath = url.split('?').shift()
  let oldQuery = getQuery(url)
  let paramsObj = Object.assign(oldQuery, query)
  let params = json2string(paramsObj, encode)

  return originWithPath + '?' + params
}

export const compileUrl = function (url, data) {
  let _url = url

  if (data) {
    Object.keys(data).map( (key) => {
      let re = new RegExp(':'+key,'gi')
      _url = _url.replace(re,data[key])
    })
  }

  return _url
}

export const proxy2market = function(url) {
  let _url = url
  let _MARKET_API_BASE_URI = window._MARKET_API_BASE_URI

  if(_url.startsWith('/api/')) {
    let market_api_url = 'https://market.douban.com/api/'
    if ("undefined" != typeof _MARKET_API_BASE_URI) {
      market_api_url = _MARKET_API_BASE_URI
    }
    _url = _url.replace('/api/', market_api_url)
  }

  return _url
}
