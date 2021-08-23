const User = require("./models/user");

module.exports.profile = function(req,res){
    return res.render('df');
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log("error in finding user in signing up");
            return ;
        }

        if(!user){
            User.create(req.body, function(err,user){
                
            })
        }


    })

}