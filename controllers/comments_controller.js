const Post = require('../models/post')

const Comment = require('../models/comment')


module.exports.addComment = (req,res)=>{

    Post.findById(req.body.post)
    .then((post)=>{
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post : req.body.post
            })
            .then((comment)=>{
                post.comments.push(comment)
                post.save()
            })
            return res.redirect("/")
        }

        return res.redirect("/")
    })
    .catch((err)=>{
        console.log("error in finding the post", err)
    })
 
}

module.exports.destroy = (req,res)=>{

    Comment.findById(req.params.id)
    .then((comment)=>{
        if(comment.user == req.user.id){
            let postId = comment.post
            comment.deleteOne()

            Post.findByIdAndUpdate(postId , { $pull : {comments:req.params.id}})
            .then((data)=>{

            })
            
        }

        return res.redirect("back")

    })

}