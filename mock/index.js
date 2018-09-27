var router = require('express').Router()
function apiurl (url) { return '/api' + url}

// comment out lines when corresponding API is ready
router.use(apiurl('/add-edit-search'), require('./_add-edit-search'))
router.use(apiurl('/login'), require('./_login'))

module.exports = router
