const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){

    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
    
        req.flash('Post created');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }


    
    
}

module.exports.destroy = function(req,res){
     Post.findById(req.params.id, function(err, post){
         //.id means converting the object id into string
         if(post.user == req.user.id){
             post.remove();

             Comment.deleteMany({post:req.params.id}, function(err){
                 return res.redirect('back');
             });

         }else{
             return res.redirect('back');
         }
     });
}




