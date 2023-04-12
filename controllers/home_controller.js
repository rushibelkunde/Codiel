const Post = require('../models/post')


module.exports.home = function(req,res){


    Post.find({})
        .populate("user")
        .populate({
            path: 'comments',
            populate:{
                path: "user"
            }
        })
        .then((data)=>{

            if(req.isAuthenticated()){
                return res.render('home',{
                    title: "Codiel",
                    posts: data
                    })
            }
            return res.render('user_sign_in',{
                title: "Codiel | Signin"
            })

            })
    
}