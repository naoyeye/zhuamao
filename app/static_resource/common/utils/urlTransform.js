/**
 * 将绝对地址改成相对地址
 */

let reg = /^(http|https):\/\/(market|shiji)\.douban\.com/

export default (url) => {
  if (url && url.search('douban.com/book/') == -1) {
    return url.replace(reg, '')
  } else {
    return url
  } 
}