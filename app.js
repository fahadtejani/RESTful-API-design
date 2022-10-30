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

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articlesSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article', articlesSchema);

// -------------------------------articles route--------------------------------
app.route('/articles')
.get((req,res)=>{
  Article.find((err,foundArticles)=>{
    if (!err) {res.send(foundArticles);} else {res.send(err);}
  });
})

.post((req,res)=>{
  // console.log(req.body.title);
  // console.log(req.body.content);
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content});
  newArticle.save((err)=>{
    if (!err) {
      res.send('Article uploaded!');
    } else {
      res.send(err);
    }
  });
})

.delete((req,res)=>{
  Article.deleteMany((err)=>{
    if (!err) {
      res.send("Deletion successful");
    } else {
      res.send(err);
    }
  });
});
// -------------------------------dynamic routing using express parameters--------------------------------
app.route('/articles/:articleTitle')
.get((req,res)=>{
  Article.findOne({title: req.params.articleTitle},(err,result)=>{
    if (result) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
})

.put((req,res)=>{
  Article.updateOne({title:req.params.articleTitle},{title:req.body.title,content:req.body.content},(err)=>{
    if (!err) {
      res.send("Successfully updated article");

    } else {
      res.send("Could not update!");
    }
  });
})

.patch((req,res)=>{
  Article.updateOne({title:req.params.articleTitle},{$set: req.body},(err)=>{
    if (!err) {
      res.send('Successfully updated article');
    } else {
      res.send(err);
    }
  });
})
.delete((req,res)=>{
  Article.deleteOne({title:req.params.articleTitle},(err)=>{
    if (!err) {
      res.send("Document deleted");
    } else {
      res.send(err);
    }
  });
});
// -------------------------------routing ends-----------------------------------------

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
