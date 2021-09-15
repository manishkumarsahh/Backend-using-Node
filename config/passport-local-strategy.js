const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',      //parameter1 of localstrategy object
        passReqToCallback : true
    },
    function(email,password,done){  //parameter2 of localstrategy object
        User.findOne({email:email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid Username/password ');
                return done(null, false);   //error is null and authentication is false
            }
            return done(null,user);

        });
    }

));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding the user --> Passport');
            return done(null, user);
        }

        return done(null, user);
    });
});

//check if the user is authenticated 
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in , then pass on the request to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in 
    return res.redirect('/users/sign-in');

}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
            //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}







module.exports = passport;