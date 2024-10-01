const express = require('express')
const { userProfile } = require('../controllers/ProfileController')
const router = express.Router()

router.post('/profile', userProfile)

module.exports = router