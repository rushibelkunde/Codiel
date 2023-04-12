const express = require('express')
const router = express.Router()
const passport = require('passport')

const postsController = require('../controllers/posts_controller')
router.post('/createPost',passport.checkAuthentication,postsController.createPost)

router.get('/destroy/:id', passport.checkAuthentication,postsController.deletePost)





module.exports = router;