/*
* @Author: hanjiyun
* @Date:   2016-09-22 10:51:50
* @Last Modified by:   hanjiyun
* @Last Modified time: 2016-09-22 13:58:56
*/

// var moment = require('moment');
// moment.locale('zh-cn');
// var RequestHelper = require('../utils/request');

module.exports = function(req, res, next) {
  res.render('admin/index', {
    // 'partials': {
    //   test: '../../app/templates/test'
    // },
    name: 'admin',
    age: 16
  });
};
