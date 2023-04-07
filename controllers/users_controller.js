const User = require("../models/user")

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

    return res.render("profile",{
        title: "codiel"
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
    return res.redirect('/')
}



module.exports.signout = function(req, res, next) {
    req.logout(req.user, (err) => {
        if(err){
            return next(err)
        } });
    return res.redirect('/users/sign-in')
}

