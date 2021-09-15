const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(express.urlencoded());

app.use(cookieParser());

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'authenticationapp',
    secret:'blahblahblah',
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//flash will be put after the session is being used

app.use(flash());
app.use(customMware.setFlash);



// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
 