const mongoose = require('mongoose');
// const User = require('user');


const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps:true
})

const Post = mongoose.model('Post', postSchema);//before exporting we are going to tell that tgis is going to be  a model
module.exports = Post;