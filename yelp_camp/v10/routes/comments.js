var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware =require("../middleware/");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

// edit comments
router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
    //req.params.id this is campground id
    console.log("req.params.id"+req.params.id);
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment}); 
        }
    });
   
});

//update comments
router.put("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
    console.log("the comment:"+req.body.comment);
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err, updatedComment){
      if(err){
          res.redirect("back");
      }else{
           res.redirect("/campgrounds/"+req.params.id);
      }
   }); 
});
//Destroy route
router.delete("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
           console.log(err);
           res.redirect("/campgrounds/"+req.params.id);
       }else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   });
});


module.exports = router;