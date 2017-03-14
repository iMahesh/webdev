var express=require("express");
var app=express();
var request=require("request");
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});
app.get("/results",function(req,res){
    // console.log(req.query.search);//here search is the name of form inout text box
    var search=req.query.search;
    request("http://www.omdbapi.com/?s="+search,function(error,response,body){
        
       if (!error && response.statusCode === 200) {
            var results=JSON.parse(body);
            res.render("results",{data:results});
       }
   });
});

app.get("/*",function(req,res){
       res.send("The page you are looking for is missing (404)");
})

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Movie App is up and running....");
});