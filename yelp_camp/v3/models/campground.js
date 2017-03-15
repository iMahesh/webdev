var mongoose=require("mongoose");
//SCHEMA SETUP
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description: String,
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]//object reference association wit id of comments
    
});

// var Campground=mongoose.model("Campground",campgroundsSchema);
module.exports=mongoose.model("Campground",campgroundSchema);