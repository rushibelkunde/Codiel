const Post = require('../models/post')

const Comment = require('../models/comment')


module.exports.addComment = async (req,res)=>{

    let post = await Post.findById(req.body.post)
    if(post){

        let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post : req.body.post,
                name: req.user.name
            })
            
            post.comments.push(comment)
            post.save()

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment : comment
                    },
                    message: "comment added"

                })
            }
            
            return res.redirect("/")
        }

        return res.redirect("/")
    }
    
 


module.exports.destroy = async (req,res)=>{


    let comment = await Comment.findById(req.params.id)
    
    
    if(comment.user == req.user.id){
        
        let postId = comment.post
        comment.deleteOne()

        let post = await Post.findByIdAndUpdate(postId , { $pull : {comments:req.params.id}})
        post.save()

        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id,
                    message: "comment Deleted"
                }   
            })
        }

        return res.redirect("back")

           
    }

        return res.redirect("back")

    }

