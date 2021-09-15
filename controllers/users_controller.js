
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


// module.exports.profile = function(req, res){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id, function(err,user){
//             if(user){
//                 return res.render('user_profile', {
//                     title: "User Profile",
//                     user:user
//                 })
//             }else{
//                 res.redirect('/users/sign-in');

//             }
//         })

//     }else{
//         res.redirect('/users/sign-in');
//     }
// }



module.exports.profile = function(req, res){
    
        User.findById(req.params.id, function(err,user){
            
            return res.render('user_profile', {
                title: "User Profile",
                profile_user:user
            })
            
        });

    
}


module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){

        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer error:', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }


        
    }else{
        req.flash('error','Unauthorised');
        return res.status(401).send('Unauthorised');
    }
}




module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"SignUp"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "SignIn"
    })
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user in signing up");
            return;
        }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            res.redirect('back');
        }

    })


}

// sign in and create a session for the user

// module.exports.createSession = function(req,res){
//     User.findOne({email:req.body.email}, function(err,user){
//         if(err){
//             console.log('error in finding user in signing in');
//             return ;
//         }

//         if(user){
//             if(user.password != req.body.password){
//                 return res.redirect('back');
//             }
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');
//         }else{
//             res.redirect('back');
//         }

//     })
// }


module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect();
}




