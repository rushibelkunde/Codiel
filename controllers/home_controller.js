const Post = require('../models/post')

const User = require('../models/user')


module.exports.home = function(req,res){


    Post.find({})
        .sort('-createdAt')
        .populate("user")
        .populate({
            path: 'comments',
            populate:{
                path: "user"
            }
        })
        .then((data)=>{

            User.find({})
            .then((users)=>{

                if(req.isAuthenticated()){
                    return res.render('home',{
                        title: "Codiel",
                        posts: data,
                        users: users
                        })
                }
                return res.render('user_sign_in',{
                    title: "Codiel | Signin"
                })

            })
            })
}