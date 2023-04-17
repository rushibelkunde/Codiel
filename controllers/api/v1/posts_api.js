const Post = require('../../../models/post')

const Comment = require('../../../models/comment')

module.exports.index = async (req,res)=>{

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate("user")
        .populate({
            path: 'comments',
            populate:{
                path: "user"
            }
        })
    return res.json(200, {
        message: "posts",
        posts : posts
    })
}

module.exports.deletePost = async (req,res)=>{
    let post = await Post.findById(req.params.id)
    
    if(post.user == req.user.id){
        
        post.deleteOne();

        await Comment.deleteMany({post:req.params.id})

        res.json(200,{
            message: "post deleted"
        })
            
        }
        else{
            return res.json(401,{
                message: "you cannot delete post"
            })
        }
    }

