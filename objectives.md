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
Node Js run by Google's V8 engine. It has great libraries 
NPM is package manager for javascript. 
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
    
    CRUD CreateReadUpdateDelete    
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
    
#RESTful Routes
    name     url        verb    desc.
    ===================================================
    INDEX   /dogs       GET     Display list of all dogs
    NEW     /dogs/new   GET     Display Form to make a new dog
    CREATE  /dogs       POST    Add a new dog to DB
    SHOW    /dogs/:id   GET     Shows info about one dog
    
    