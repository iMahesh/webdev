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
    image:String
});

var Campground=mongoose.model("Campground",campgroundsSchema);

// Campground.create({
//     name:"Santa Clara",
//     image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"
    
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("NEWLY CREATED CAMPGROUND \n"+campground);
//     }
// });

// var campgrounds=[
//         {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
//         {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
//         {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
//         {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
//         {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
//         {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
//         {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
//         {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
//         {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
//         {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
//         {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
//         {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
//         {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
//         {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
//         {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
//         {name:"Creekwood",image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
//         ];

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgrounds){//allCampgounds coming from database
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });
    
});

app.post("/campgrounds", function(req, res) {
    //get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {
        name: name,
        image: image
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
    
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp Server has started...");
});