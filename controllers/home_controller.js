module.exports.home = function(req, res){
    res.cookie('manish',21);    //cookie stored
    return res.render('home', {
        title: "Home"
    });
} 

// module.exports.actionName = function(req, res){}