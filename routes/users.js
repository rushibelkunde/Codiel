const express = require('express')
const User = require("../models/user")

const router = express.Router()

const usersController = require('../controllers/users_controller')
router.get('/profile',usersController.profile)
router.get('/posts',usersController.posts)

router.get('/sign-up',usersController.signup)
router.get('/sign-in',usersController.signin)

router.post('/create',usersController.create)

router.post('/createSession',usersController.createSession)


module.exports = router;