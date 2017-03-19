var express                 =require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                =require("mongoose"),
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    expressSession          =require("express-session"),
    Campground              =require("./models/campground"),
    Comment                 =require("./models/comment"),
    User                    =require("./models/user"),
    seedDB                  =require("./seeds");
    
mongoose.connect("mongodb://localhost/yelp_camp_v6",function(err){
    if(err){
        console.log("SOMETHING WENT WRONG,COULDN'T CONNECT TO DATABASE! \n"+err);
    }else{
        console.log("CONNECTED TO DATABASE...");
    }
});

// seedDB(); //seeds the database from 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

//passport configuration
app.use(expressSession({
    secret:"iMahesh is the username",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user; 
   console.log(req.user);
   next();
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}

//landing page route
app.get("/",function(req,res){
   res.render("landing"); 
});

//=================
//Campground routes
//=================
// INDEX   /dogs           GET     Dog.find()                  Display list of all dogs
app.get("/campgrounds",function(req, res) {
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) { //allCampgounds coming from database
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });

});

// NEW     /dogs/new       GET     N/A                         Display Form to make a new dog
app.get("/campgrounds/new",isLoggedIn, function(req, res) {
    res.render("campgrounds/new");

});

// CREATE  /dogs           POST    Dog.create()                Add a new dog to DB
app.post("/campgrounds",isLoggedIn, function(req, res) {
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
    Campground.create(newCampground,isLoggedIn, function(err, newlyCreated) {
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
          //console.log("foundCampground "+foundCampground);
          res.render("campgrounds/show",{campground:foundCampground});
      }
  });
});


//================
//Comments Routes||
//================

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res) {
//   res.send("This will be the new pages for adding comments"); 
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    })  
});
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id,function(err,campground) {
        if(err){
            console.log(err);
        }else{
            //create a new comment
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    //connect new comment to the campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });  
});


//===========
//AUTH ROUTES
//===========
//register route
app.get("/register",function(req, res) {
   res.render("register"); 
});
app.post("/register",function(req, res) {
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err, user){
       if(err){
           console.log("can't register user"+err);
           res.redirect("/register");
       }else{
         console.log("new User: "+user);
        res.redirect("/campgrounds");   
       }
    });
   
   
});

//login route
app.get("/login",function(req, res) {
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
    
});

// EDIT    /dogs/:id/edit  GET     Dog.findByIdAndUpdate()     Show edit form for one dog
// UPDATE  /dogs/:id       PUT     Dog.findByIdAndUpdate()     Update particular dog and redirects to somewhere
// DESTROY /dogs/:id       DELETE  Dog.findByIdAndRemove()     Delete a particular dog.



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Camp Server has started...");
});