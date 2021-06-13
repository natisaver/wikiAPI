const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { listenerCount } = require("events");

const app = express(); 

app.use(express.static("public")); //indicates the directory for static items e.g css
app.use(express.urlencoded()); //bodyparser
app.set("view engine", "ejs"); //integrating ejs into express

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true}); //connecting to database

//need to create a schema for fields in doc with validation
//next compile the schema into a model to find, CRUD etc.
const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);

//in RESTful API we push all to specific route
//here i using the app.route().get().post().delete() chaining
app.route("/articles")

.get(function(req,res){
    Article.find(function(err, foundArticles){ //here we fetch all articles so just pass 1 param|.find(params, func(){})
        if (!err) {
            res.send(foundArticles)
        }
        else {
            res.send(err); 
        }
    })
})

.post(function(req,res){
    //create new entry into articles collection
    const newArticle = new Article({
        title: req.body.title,
        contnet: req.body.content
    })
    newArticle.save(function(err){
        if(!err){
            res.send("added the article");
        }
        else{
            res.send(err);
        }
    });
})

.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles")
    
        }
        else{
            res.send(Err);
        }
    })
});

//Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object
//specific article that user indicates => http://localhost:3000/articles/whatever (in our case we put as articleTitle)
//if there is a space in url, html encoder will be %20, "/articles/alex%20tan"
app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if (foundArticle) {
            res.send(foundArticle);
        }
        else {
            res.send("no matching article found");
        }
    })
})

.put(function(req,res){ //PUT overrides the whole thing, only PATCH will like overlap and merge
    Article.updateOne(
        {title:req.params.articleTitle}, //condition to find the obj to replace
        {title:req.body.title, content:req.body.content}, //replace with
        {overwrite:true}, //need to overwrite true for mongoose, default is false
        function(req,res){
            if(!err){
                res.send("success")
            }
            else{res.send(err)}
        })
})

.patch(function(req,res){ 
    Article.updateOne(
        {title:req.params.articleTitle}, //condition to find the obj to replace
        //req.body is all the params posted by user, title:... content:...blah
        //$set updates & creates if it doesnt exist (unlike PUT)
        {$set: req.body}, 
        function(req,res){
            if(!err){
                res.send("success")
            }
            else{res.send(err)}
        })
})

.delete(function(req,res){ 
    Article.deleteOne(
        {title:req.params.articleTitle},
        function(req,res){
            if(!err){
                res.send("delete okies")
            }
            else{res.send(err)}
        })
});




app.listen("3000", function(){
    console.log("server started on port 3k");
})

