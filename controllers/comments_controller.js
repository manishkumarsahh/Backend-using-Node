const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
            }, function(err,comment){
                //handle error
                if(err){
                    return res.error("error in creating comment");
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
            
        }
    })
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            let postId = comment.post;

            comment.remove();

            //pull out the comment id from list of comments Post(model)->comments(ObjectId)-> match req.params.id and then pull out
            Post.findByIdAndUpdate(postId, { $pull: {comments:req.params.id}}, function(err,post){
                return res.redirect('back');
            })
            
        }else{
            return res.redirect('back');
        }
    })
}