const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    name:{
        type: String
    },
    //include all comments in an array
    comments:[
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps : true
});


const Post = mongoose.model('Post', postSchema)


module.exports = Post;