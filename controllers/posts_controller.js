const Post = require('../models/post')

const Comment = require('../models/comment')

module.exports.createPost = async (req,res)=>{

    let post = await Post.create({
        content: req.body.content,
        user: req.user._id,
        name: req.user.name
    })

    if(req.xhr){
        return res.status(200).json({
            data : {
                post:post
            },
            message : "Post Created!!"
        })
    }
    
    return res.redirect('back')


}

module.exports.deletePost = async (req,res)=>{
    let post = await Post.findById(req.params.id)
    
    if(post.user == req.user.id){
        
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id: req.params.id,
                    message: "Post deleted"
                }
            })
        }
        post.deleteOne();

        await Comment.deleteMany({post:req.params.id})

        res.redirect("back")
            
        }
        else{
            res.redirect("back")
        }
    }


