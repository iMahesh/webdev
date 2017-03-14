var express=require("express");
var app=express();

app.get("/",function(req,res){
    console.log("Requested '/'");
    res.send("This is Home Page");
});

app.get("/bye",function(req,res){
    console.log("Requested '/bye'");
    res.send("This is Bye Page");
});

//For route match parameters/variable
app.get("/r/:SomeParam/comments/:id",function(req, res) {
   console.log(req);
   res.send("Hello form route parameter match");
});

//This must be at the end of the routes. its like if-else for routes
app.get("*",function(req,res){
    res.send("This page is unavailable");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started...");
});