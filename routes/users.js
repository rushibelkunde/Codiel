const express = require('express')
const User = require("../models/user")
const passport = require('passport')

const router = express.Router()

const usersController = require('../controllers/users_controller')
router.get('/profile/:id',passport.checkAuthentication,usersController.profile)
router.get('/posts',usersController.posts)

router.get('/sign-up',usersController.signup)
router.get('/sign-in',usersController.signin)

router.post('/create',usersController.create)

// router.post('/createSession',usersController.createSession)

router.get('/signout',usersController.signout)

router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect:"/users/sign-in"}
    ), usersController.creatSession)

router.post('/update/:id',passport.checkAuthentication,usersController.update)

module.exports = router;