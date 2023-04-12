const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

// authentication
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    (email,password,done)=>{
        //find the user and establish the identity

        User.findOne({email:email,password:password})
        .then((user)=>{
            if(user){
                return done(null, user)
            }
            else{
                console.log("user dont exist")
                return done(null, false)
            }
        })
        .catch((err)=>{
            return done(err)
        })


    }
))

// serializing the user to decide which key will be kept in cookies

passport.serializeUser((user,done)=>{
    done(null,user.id)

})


// deserializing the user from the key

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((user)=>{
        if(user){
            return done(null, user)
    }})
    .catch((err)=>{
        console.log("error in finding error")
        return done(err)
    })
})

module.exports = passport;


// check if user is authenticated
passport.checkAuthentication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser =  (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;

    }
    next()
    
}