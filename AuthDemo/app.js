var express=require("express"),
    bodyParser=require("body-parser"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
    mongoose=require("mongoose"),
    User=require("./models/user");
    
mongoose.connect("mongodb://localhost/autho_demo",function(err){
    if(err){
        console.log("SOMETHING WENT WRONG,COULDN'T CONNECT TO DATABASE! \n"+err);
    }else{
        console.log("CONNECTED TO DATABASE...");
    }
});

var app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"I am the best",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
//======

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret",isLoggedIn,function(req,res){ //isLoggedIn is middleware everytime it checks for the user logged in or not
    res.render("secret");
});

//Auth routes
//show signup form
app.get("/register",function(req, res) {
    res.render("register");
});

app.post("/register",function(req, res) {
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
      if(err){
          console.log(err);
          res.render("register");
      } else{
          passport.authenticate("local")(req,res,function(){//local or twitter or facebook
              res.redirect("/secret");
          });
          
      }
   });
});


//render login form
app.get("/login",function(req, res) {
   res.render("login"); 
});
//Login routes
//middleware
app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req, res) {});

app.get("/logout",function(req, res) {
   req.logout(); 
   res.redirect("/");
});

//defining middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server has started.."); 
});