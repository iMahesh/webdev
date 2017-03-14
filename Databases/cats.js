var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/cat_app",function(){
    console.log(":Connected to mongoDb:");
});

//define schema for cat_app

var catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    temperament:String
});

var Cat = mongoose.model("Cat", catSchema); //make the schema in database, the string cat should be always singular, mongo makes it plural automatically

// //adding a new cat to database
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat) {
//     if (err) {
//         console.log("Something went wrong");
//     }
//     else {
//         console.log("Cat added to the database");
//         console.log(cat);// this cat is from database
//     }
// });

Cat.create({
    name:"Snow White",
    age:15,
    temperament:"Bland"
},function(err,cat){
    if (err) {
        console.log("Something went wrong");
    }
    else {
        console.log("Cat added to the database");
        console.log(cat);// this cat is from database
    }
});

//retrieve all cats from database

Cat.find({},function(err,cats){
    if(err){
        console.log("OH, NO ERROR!");
    }else{
        console.log("ALL THE CATS...");
        console.log(cats);
    }    
});