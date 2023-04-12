const Post = require('../models/post')

const Comment = require('../models/comment')

module.exports.createPost = (req,res)=>{

    Post.create({
        content: req.body.content,
        user: req.user._id
    })
    .then((data)=>{
            return res.redirect('/')
        })
    .catch((err)=>{
        console.log("error in creating a post", err)
    })

}


