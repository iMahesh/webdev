#What is Node?
        *It enables to JS to run on server side.
    
        *Why are we learning?
         *It's popular
         *Javascript
         *Once you learn Node as first server side language, it'll be easy to learn or switch to other languages.


#Using Node?
        *Interact with node console
            *Run a file with node 
            *no html or css on server side
            * REPL (Read Evaluate Print Loop)
            *You can't use alert(),document on server side beacuse thery only work on client side(in the browser)
    *Run a file with node
        *node hello.js or node app.js which actually starts the server

#Intro to NPM
        *Node Js run by Google's V8 engine. It has great libraries 
        *NPM is package manager for javascript. 
            *Define NPM
                *Node Package Manager
            *Explain why NPM is awesome
                *Repository for almost 200,000 js packages
            *Intro the packages we'll end up using.
                *Express and 9 more.
        
#Installing NPM Packages
        *Use 'npm install' to install package
        *Use 'require()' to use the package
        
#Express
        *express is a popular framework
        *express is the glue that keeps everything(every file) together
        *express is a lightweight framework but its powerful.
        
#Our first express app
        *Every express app has package.json
        *package.json contain meta data and dependencies about an app.
        * npm init
        
#Rendering HTML pages
        * use ejs files to render the using res.render("home.ejs")
        * add ejs using "npm install ejs --save"
        *create a folder called views and create files inside views. 
        var thing=req.params.thing;
        res.render("home.ejs",{varThing:thing});
        Here varThing is a javascriptvariable in home.ejs, and we are sending thing from app.js varable to varThing
        
#MongoDB
        *setup 
            sudo apt-get install -y mongodb-org
            
            mkdir data
            echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
            chmod a+x mongod    
            
            ./mongod startin the demon
            
        *in case it crashes, us this command ./mongod --repair
        
        CRUD CreateReadUpdateDestroy    
        *mongo opens up the mongo shell
        *help basic features of mongo
        *showdbs lists all dbs
        *use db_name //creates a database if not exist
        *db.dogs.insert({name:"Rusty",breed:"Mutt"})
        *show collections lists all tables
        *db.dogs.find() //list the complete data in dogs
        *db.dogs.find(name:"Rusty") //gives the dog with only name rusty
        *db.dogs.update({name:"Rusty"},{breed:"Labradoodle"})
        *db.dogs.update({name:"Rusty"},{$set:{name:"Tater",isCute:true})
        *db.dogs.remove({breed:"Labradoodle"})
        *db.dogs.drop() removes all dogs;
        
#Mongoose
        *is an elegant object modelin for nodejs mongodb
        *refer Databases/cats.js for setup and config
From the command line, run:

cd ~
./mongod --repair
If you're still having trouble then you may need to use the --repairpath <path> option, you can read about how it works here: https://docs.mongodb.com/manual/reference/command/repairDatabase/#behavior
        
#RESTful Routes
Representational State Transfer: Mainly for CRUD
Its conventional and reliable. 
RESTful is a pattern that we should follow to achieve good infrastructure of a website
    CREATE  
    READ    /allBlogs
    UPDATE  /updateBlog/:id
    DESTROY /destroyBlog/:id
    
    name     url            HTTPverb    desc.
    ===================================================
    INDEX   /dogs           GET     Dog.find()                  Display list of all dogs
    NEW     /dogs/new       GET     N/A                         Display Form to make a new dog
    CREATE  /dogs           POST    Dog.create()                Add a new dog to DB
    SHOW    /dogs/:id       GET     Dog.findById()              Shows info about one dog
    EDIT    /dogs/:id/edit  GET     Dog.findByIdAndUpdate()     Show edit form for one dog
    UPDATE  /dogs/:id       PUT     Dog.findByIdAndUpdate()     Update particular dog and redirects to somewhere
    DESTROY /dogs/:id       DELETE  Dog.findByIdAndRemove()     Delete a particular dog.
    
## <%- %> evaluates the string or body text 
## <%= blog.body.substring(0,100) %> limit text to first 100 characters, which helps showing the blog posts
## action="/blogs/<%= blog._id %>?_method=PUT" method="POST" : this is called method overriding . which is helpful to use for update delete or edit
    
    
    

#Authentication

##Intro to Auth
* What tools are we using?
    * Passport 
    * Passport Local
    * Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
    * Express-Session

#Auth Part 1
* Set up folder structure
* Install needed packages
* Add root route and template
* Add secret route and template

#Auth Part 2
* Create User model
* Configure passport

#Auth Part 3
* Add Register routes
* Add Register form

#Auth Part 4
* Add Login routes
* Add Login form

#Auth Part 5
* Add Logout Route
* Add isLoggedIn middleware

#GIT
* git revert --no-commit hash..HEAD
* git commit
    
#YelpCamp Startover

##Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
   * Name
   * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

##Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

##Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

##Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground


TODOS
* Add "back" redirect to login
* Add method-override
* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Landing Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPATE/DELETE CAMPGROUND

* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Landing Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPDATE/DELETE CAMPGROUND




RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new    GET
CREATE  campgrounds/:id/comments      POST    


* heroku login
* git init 
* heroku create
* add strat script to package.json ("start":"node app.js")
* git add -A  and commit
* git push heroku master
* heroku log for errors
* heroku run ls

#Use mongo lab for mongo database
mongoose.connect("mongodb://user:password@ds137100.mlab.com:37100/yelpcamp");

* export database environment varables:
* (for local only)export DATABASEURL =mongodb://localhost/yelp_camp_v12 
* (for heroku) heroku config:set DATABASEURL=mongodb://user:password@ds137100.mlab.com:37100/yelpcamp