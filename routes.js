var express = require('express')
var router = express.Router()

router.use('/$', require('./views/index'))
router.use('/admin', require('./views/admin/index'))
router.get('/api/crawl', require('./views/api/crawl'))
// router.use('/items/:id/preview', require('./items-preview'));
// router.use('/award/blog/:packagename', require('./blog'));

module.exports = router
