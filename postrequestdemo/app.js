var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
var friends=["Tony","Miranda","John","Rusty"];


app.get("/",function(q,res){
    res.render("home");
});

app.post("/addfriend",function(req,res){
    friends.push(req.body.newfriend);
    res.redirect("/friends");
});

app.get("/friends",function(req,res){
    
    res.render("friends",{friends:friends});
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started");
});