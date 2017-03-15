var express         =require("express"),
    expressSanitizer=require("express-sanitizer"),
    methodOverride  =require("method-override"),
    app             =express(),
    bodyParser      =require("body-parser"),
    mongoose        =require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app",function(err){
    if(err){
        console.log("SOMETHING WENT WRONG,COULDN'T CONNECT TO DATABASE! \n"+err);
    }else{
        console.log("CONNECTED TO DATABASE...");
    }
});

//APP config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));//use custom css
app.use(methodOverride("_method"));
app.use(expressSanitizer());// this must be plced after body parser

//Mongoose/model config
var blogSchema = new mongoose.Schema({
    // title
    title: String,
    // image
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop="
    },
    // body
    body: String,
    // created
    created: {
        type: Date,
        default: Date.now
    }
});

var Blog=mongoose.model("Blog",blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=",
//     body:"THIS IS A TEST BLOG"
// });

//RESTful ROUTES
app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs:blogs});
        }
    });
    
});

//NEW
app.get("/blogs/new",function(req,res){
   res.render("new"); 
});

//CREATE
app.post("/blogs",function(req,res){
   //get data from form and insert into database - create blog
  req.body.blog.body=req.sanitize(req.body.blog.body); // if user enters some malicious javascript it filters that body
   Blog.create(req.body.blog,function(err,newBlog){
       if(err){
           res.render("new");
       }else{
           //redirect to index or blogs
           res.redirect("/blogs");
       }
   });

});

// SHOW    /dogs/:id  GET    Shows info about one dog
app.get("/blogs/:id",function(req, res) {
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundBlog});
        }
    });
});

// EDIT    /dogs/:id/edit  GET    Show edit form for one dog
app.get("/blogs/:id/edit",function(req,res){
   Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:foundBlog});
        }
    });
});

// UPDATE  /dogs/:id       PUT    Update particular dog and redirects to somewhere
app.put("/blogs/:id",function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body); // if user types some malicious javascript it filters that body
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+updatedBlog._id);
        }
    });
});

// DESTROY /dogs/:id       DELETE Delete a particular dog.
app.delete("/blogs/:id",function(req,res){
    //Destroy blog
  Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
// res.send("You've hit delete");
});


app.get("/*",function(req,res){
   res.send("This is DEFAULT age"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server has started.."); 
});