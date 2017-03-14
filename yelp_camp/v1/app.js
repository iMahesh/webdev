var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds=[
        {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
        {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
        {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
        {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
        {name:"Salmon Creek",image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
        {name:"Santa Clara",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
        {name:"San Roman",image:"https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
        {name:"Creekwood",image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"}
        ];

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    //get data from form add to campgrounds array
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name: name,image:image};
    campgrounds.unshift(newCampground);//unshift is just like push() except it pushes from the front
    //redirect to camgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
    
})
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelp Camp Server has started...");
});