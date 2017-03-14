var express     =require("express"),
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",function(err){
    if(err){
        console.log("SOMETHING WENT WRONG,COULDN'T CONNECT TO DATABASE! \n"+err);
    }else{
        console.log("CONNECTED TO DATABASE...");
    }
});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundsSchema=new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground=mongoose.model("Campground",campgroundsSchema);

// //Create new campground and save to database
//     Campground.create({
//         name:"Salmon Creek",
//         image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
//         description:"This is a huge granite hill,no bathrooms, nothing. Beautiful granite"
        
//     },function(err, newlyCreated) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("NEWLY CREATED CAMPGROUND \n"+newlyCreated);
//         }
//     });

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgrounds){//allCampgounds coming from database
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    });
    
});

app.post("/campgrounds", function(req, res) {
    //get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc=req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    //Create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    })

});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
    
});


app.get("/campgrounds/:id",function(req,res){
        //find campground with provided id from url
        Campground.findById(req.params.id,function(err,foundCampground){
           if(err){
               console.log(err);
           } else{
               res.render("show",{campground:foundCampground});
           }
        });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp Server has started...");
});