/* 
* @Author: Jiyun
* @Date:   2015-11-26 13:42:21
* @Last Modified by:   hanjiyun
* @Last Modified time: 2016-09-22 13:32:17
*/

// var _ = require('lodash');
// var path = require('path');
// var moment = require('moment');
// moment.locale('zh-cn');
// var istatic = require('istatic');
// var RequestHelper = require('../utils/request');

// var istaticEnabled = true;

// var istaticCSS = function() {
//   return istatic.serve({
//     ttl: 0,
//     root: path.join(process.cwd(), '/app/static/'),
//     compress: true,
//     debug: false,
//     cache: true
//   });
// };

// var istaticJS = function() {
//   return istatic.serve({
//     ttl: 10,
//     root: path.join(process.cwd(), '/app/static/'),
//     compress: true,
//     debug: true,
//     cache: true
//   });
// };

module.exports = function(req, res, next) {
  res.render('index', {
    // 'partials': {
    //   test: '../../app/templates/test'
    // },
    // istaticJS: istaticJS,
    // istaticCSS: istaticCSS,
    // istaticEnabled: istaticEnabled,
    // DEVELOPMODE: false,
    name: 'hanjiyun test',
    age: 16
  });
};
