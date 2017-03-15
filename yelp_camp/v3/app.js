var express     =require("express"),
    app         =express(),
    bodyParser  =require("body-parser"),
    mongoose    =require("mongoose"),
    Campground  =require("./models/campground"),
    Comment     =require("./models/comment"),
    seedDB      =require("./seeds");
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp",function(err){
    if(err){
        console.log("SOMETHING WENT WRONG,COULDN'T CONNECT TO DATABASE! \n"+err);
    }else{
        console.log("CONNECTED TO DATABASE...");
    }
});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

// EDIT    /dogs/:id/edit  GET     Dog.findByIdAndUpdate()     Show edit form for one dog
// UPDATE  /dogs/:id       PUT     Dog.findByIdAndUpdate()     Update particular dog and redirects to somewhere
// DESTROY /dogs/:id       DELETE  Dog.findByIdAndRemove()     Delete a particular dog.




app.get("/",function(req,res){
   res.render("landing"); 
});

// INDEX   /dogs           GET     Dog.find()                  Display list of all dogs
app.get("/campgrounds", function(req, res) {
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) { //allCampgounds coming from database
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {
                campgrounds: allCampgrounds
            });
        }
    });

});

// NEW     /dogs/new       GET     N/A                         Display Form to make a new dog
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");

});

// CREATE  /dogs           POST    Dog.create()                Add a new dog to DB
app.post("/campgrounds", function(req, res) {
    //get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
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
    });

});


// SHOW    /dogs/:id       GET     Dog.findById()              Shows info about one dog
app.get("/campgrounds/:id", function(req, res) {
    //find campground with provided id from url
    console.log("req.params.id:"+req.params.id);
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err){
          console.log("Err "+err);
      }else{
          console.log("foundCampground "+foundCampground);
          res.render("show",{campground:foundCampground});
      }
  });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp Server has started...");
});