const Post = require('../../../models/post');
const User = require('../../../models/user');
module.exports.getPosts = async function(req,res){

    
   

        try{
            const posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate:{
                    path:'user'
                }
            });
            
            const users = await  User.find({});
                
                
                
            
            return res.json(200, {
                message: "List of posts",
                posts: posts
            })
        }catch(err){
            return res.error(err);
        }
        
    




} 