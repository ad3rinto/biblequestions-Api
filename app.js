//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://angelayu:angelayu@cluster0.vdlpgxh.mongodb.net/?retryWrites=true&w=majority/wikiDB"
);

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// const test = new Article({
//     title:"Test",
//     content:"Test also"

// });
// test.save()

////////////////////////////Targeting all articles ///////////////////////////////////////

app
  .route("/articles")
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      res.send(foundArticles);
    });
  })

  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("Saved successfully");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("All documents deleted");
      } else {
        res.send(err);
      }
    });
  });

//////////////////////////// Targetting single article ///////////////////////////////////////
app
  .route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}, function(
      err,
      foundArticle
    ) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No article found");
      }
    });
  })

  .put(function(req, res) {
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function(err, docs) {
        if (!err) {
          res.send("Saved successfully", docs);
        } else {
          res.send(err);
        }
      }
    );
  })

  // Patch
  .patch(function(req, res) {
    Article.findOneAndUpdate(
      {title: req.params.articleTitle},
      {$set: req.body},
      function(err, docs) {
        if (!err) {
          res.send("update successfully", docs);
        } else {
          res.send(err);
        }
      }
    );
  })

  // .delete()
  .delete(function(req, res) {
    Article.findOneAndDelete({title: req.params.articleTitle}, function(
      err,
      docs
    ) {
      if (!err) {
        res.send("Deleted successfully", docs);
      } else {
        res.send(err);
      }
    });
  });

//successfully set up all required routes

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
