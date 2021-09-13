
const User = require('../models/user');


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


module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body , function(err,user){
            return res.redirect('back');
        });
    }else{
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




