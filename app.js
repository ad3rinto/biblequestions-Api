//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://locahost:27017/wikiDB2");

const articleSchema = {
    title:String,
    content:String
};

const Article = mongoose.model("Article", articleSchema);

// const test = new Article({
//     title:"Test",
//     content:"Test also"

// });
// test.save()

app.get("/", function(req, res){
    res.send("Fab")
})


app.get("/articles", function(req, res){
    
    Article.find(function(err, foundArticles){
        res.send(foundArticles);
    })

    
})
//TODO











app.listen(3000, function() {
  console.log("Server started on port 3000");
});