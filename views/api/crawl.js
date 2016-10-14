/*
* @Author: hanjiyun
* @Date:   2016-09-29 17:36:04
* @Last Modified by:   hanjiyun
* @Last Modified time: 2016-10-14 15:38:58
*/

var request = require('request')
// var cheerio = require('cheerio')

module.exports = function(req, res, next) {
  // console.log('req', req.body)
  // res.json({test: 'hh'})

  request('http://han.im', function(error, response, body) {
    console.log('response', response.body)

    // console.log('body', body)

    if (error) {
      res.json({'error': true, 'message': error + ''})
      return
    }

    res.json({'error': false, 'message': 'ok'})

    // var $ = cheerio.load(body, {
    //   decodeEntities: false,
    //   xmlMode: false,
    //   normalizeWhitespace: false
    // })

  })

  // res.render('admin/index', {
  //   // 'partials': {
  //   //   test: '../../app/templates/test'
  //   // },
  //   name: 'admin',
  //   age: 16
  // })
}
