const express = require('express');

const passport = require('passport')

const router = express.Router()
const commentsController = require('../controllers/comments_controller')


router.post('/addComment',commentsController.addComment)


module.exports = router;