var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment")

var data=[
    {
        name:"Cloud's Rest",
        image:"https://images.pexels.com/photos/48638/pexels-photo-48638.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
        description: "blaha blah blah..!"
    },
    {
        name:"Desert Mesa",
        image:"https://images.pexels.com/photos/27865/pexels-photo-27865.jpg?h=350&auto=compress&cs=tinysrgb",
        description: "blaha blah blah..!"
    },
     {
        name:"Canva Floor",
        image:"https://images.pexels.com/photos/111362/pexels-photo-111362.jpeg?h=350&auto=compress&cs=tinysrgb",
        description: "blaha blah blah..!"
    }
];

function seedDB(){
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }else {
            console.log("Removed Campgrounds");
            Comment.remove({}, function(err) {
                if (err) {
                    console.log(err);
                }else {
                    console.log("Removed Comments");
                    data.forEach(function(seed) {
                        Campground.create(seed, function(err, campground) {
                            if (err) {
                                console.log("Problem adding campground");
                            }else {
                                console.log("New campground added");
                                Comment.create({
                                    text: "This place is awesome!",
                                    author: "Humor Man"
                                }, function(err, comment) {
                                    if (err) {
                                        console.log("Can't crete comment");
                                    }else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("New comment created");
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
}

module.exports=seedDB;