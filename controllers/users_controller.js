const User = require("../models/user")

const fs = require('fs')
const path = require('path')


module.exports.profile = (req,res)=>{
    // console.log(req.cookies.user_id)

    // if(req.cookies.user_id){

    //     User.findById(req.cookies.user_id)
    //     .then((user)=>{
    //         if(user){
    //             return res.render("profile",{
    //                 title: "codiel",
    //                 user : user
    //             })
    //         }
    //     })  
    // }
    // else{
    //     return res.redirect("/users/sign-in")

    // }

    User.findById(req.params.id)
    .then((profile)=>{
        return res.render("profile",{
            title: "codiel",
            profile: profile

        })

    })  
}

module.exports.posts = (req,res) =>{

    return res.render('posts',{
        title: "Home"
    })
}

module.exports.signup = (req,res)=>{

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up',{
        title: "Codiel | Signup"
    })
}

module.exports.signin = (req,res)=>{

    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_in',{
        title: "Codiel | Signin"
    })
}


module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    User.findOne({email: req.body.email})
    .then((data)=>{
        if(!data){
            User.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            })
            .then((data)=>{
                console.log(data.email,"new User created")
                return res.redirect("/users/sign-in")
            })
            .catch((err)=>{
                console.log("error while creating user", err)
            })  
        }
        else{
            console.log("user already exists")
            return res.redirect("back")
        }
    })       
}

//Manuel auth
// module.exports.createSession = (req,res)=>{

//     User.findOne({
//         email: req.body.email,
//         password: req.body.password
//     })
//     .then((data)=>{
//         if(data){
//             console.log(data)
//             res.cookie('user_id', data.id)
//             return res.redirect("/users/profile")
//         }
//         else{
//             return res.redirect("back");
//         }
//     })
// }



//auth using passport js

module.exports.creatSession = (req,res)=>{

    

    if(req.isAuthenticated()){
        req.flash('success','Logged In Successfully')
        return res.redirect('/')
    }
    return res.redirect('/users/sign-in')
}



module.exports.signout = function(req, res, next) {
    
    req.logout(req.user, (err) => {
        if(err){
            return next(err)
        } });
    req.flash('success','You have logged out')   
    return res.redirect('/users/sign-in')
}

module.exports.update = async (req,res)=>{

    if(req.user.id==req.params.id){

    let user = await User.findByIdAndUpdate(req.params.id)
    User.uploadedAvtar(req,res, (err)=>{
        if(err){
            console.log("multer error",err)
        }

        user.name = req.body.name,
        user.email = req.body.email

        if(req.file){
            if(user.avatar){

                fs.unlinkSync(path.join(__dirname+'/..'+ user.avatar))
                

            }
            user.avatar = User.avtarPath + '/' + req.file.filename
        }

        user.save()

        return res.redirect('back')

    })
      
}
}
