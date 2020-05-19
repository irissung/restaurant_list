const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const pages = require('./modules/page')
router.use('/restaurants', pages)

module.exports = router