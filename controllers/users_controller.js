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