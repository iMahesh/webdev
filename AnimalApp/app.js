var express=require("express");
var app=express();

app.get("/",function(req,res){
    console.log("Requested '/'");
    res.send("Hi there,Welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var animalSound = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "Meow",
        duck: "back back!"
    }
    res.send("The " + animal + " says '" + animalSound[animal] + "'");
});

app.get("/repeat/:greeting/:times", function(req, res) {
    /* add global printMessage(greeting,times)*/
    var greeting = req.params.greeting;
    var times = parseInt(req.params.times);
    var response = "";
    for (var i = 0; i < times; i++) {
        response +=greeting+" " ;
        }
        console.log(response);
    res.send(response);
});

//This must be at the end of the routes. its like if-else for routes
app.get("*",function(req,res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server Started...");
});