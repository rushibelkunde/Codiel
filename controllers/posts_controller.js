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

module.exports.deletePost = (req,res)=>{
    Post.findById(req.params.id)
    .then((post)=>{
        if(post.user== req.user.id){
            post.deleteOne();

            Comment.deleteMany({post:req.params.id})
            .then((comments)=>{
                res.redirect("back")
            })
        }
        else{
            res.redirect("back")
        }
    })
}


