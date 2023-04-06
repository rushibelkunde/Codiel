const User = require("../models/user")

module.exports.profile = (req,res)=>{

    return res.render('profile',{
        title: "Home"
    })
}

module.exports.posts = (req,res) =>{

    return res.render('posts',{
        title: "Home"
    })
}

module.exports.signup = (req,res)=>{

    return res.render('user_sign_up',{
        title: "Codiel | Signup"
    })
}

module.exports.signin = (req,res)=>{

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

module.exports.createSession = (req,res)=>{

    User.find({
        email: req.body.email,
        password: req.body.password
    })
    .then((data)=>{
        if(data){
            return res.render("home",{
                title: "Codiel",
                user: data.name
            });
        }
        else{
            return res.redirect("back");
        }
    })

}