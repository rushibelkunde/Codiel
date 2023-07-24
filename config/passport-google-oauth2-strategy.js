const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy

const crypto = require('crypto')
const User = require('../models/user')


passport.use(new googleStrategy({
   
    },
    
        (accessToken, refreshToken, profile, done)=>{

            User.findOne({email: profile.emails[0].value})
            .then((user)=>{
                if(user){
                    return done(null, user)
                }
                else{
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    })
                    .then((user)=>{
                        return done(null, user)
                    })
                    .catch((err)=>{
                        console.log("error in creating user",err)
                    })
                }    
            })
            .catch((err)=>{
                console.log("error in google passport", err)
            })
        }
    ))

    module.exports = passport;
