var Campground =require("../models/campground");
var Comment =   require("../models/comment");


// all the middleware goes here
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        console.log("Campground: "+Campground);
            Campground.findById(req.params.id,function(err,foundCampground){
           if(err){
               res.redirect("back");
           }else{
                //does user own the ground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }else{
                    res.redirect("back");
                }
           }
        });
    }else{
        res.redirect("back");//back is default, no need to define
    }
        
        //otherwise redirect
    //if not redirect    
}
middlewareObj.checkCommentsOwnership= function (req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
           if(err){
               res.redirect("back");
           }else{
                //does user own the ground
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }else{
                    res.redirect("back");
                }
           }
        });
    }else{
        res.redirect("back");//back is default, no need to define
    }
        
}

middlewareObj.isLoggedIn =function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports =middlewareObj;
