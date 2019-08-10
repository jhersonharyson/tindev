const express = require('express')
const DevController = require('./controllers/DevController')

const router = express.Router()

router.post('/devs', DevController.store)

module.exports = router
