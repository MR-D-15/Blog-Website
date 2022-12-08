//jshint esversion:6

const express = require("express");
const boydParser = require("body-parser");
const ejs = require("ejs");
const e = require("express");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ducimus, aperiam neque vel sapiente aliquid hic laborum voluptate. Quis, rem debitis quo aspernatur beatae distinctio molestiae, blanditiis quos optio fugit enim dolore sint tenetur quibusdam! Amet quae consequuntur inventore rem hic facere ad! Sit temporibus error illo dolores, fuga facere dicta a voluptatum velit quia saepe! Ipsam eum necessitatibus non in, dolorum, quod, quasi autem ab doloremque et commodi nemo. Harum repudiandae impedit sequi? Mollitia, quaerat? Minima, unde in. Accusantium qui consectetur doloribus et? Rem deserunt doloribus illo vel molestiae sapiente quaerat nesciunt voluptatum. Quas ratione enim corporis perferendis. Debitis?";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente debitis temporibus ratione omnis ducimus possimus laudantium, in mollitia quam libero quisquam labore eveniet explicabo officia nesciunt. Corrupti, vitae eveniet? Numquam optio voluptates enim officia voluptatibus sunt est, culpa nam fugiat voluptatem nulla voluptas, earum dolorum assumenda corrupti ut hic adipisci velit! Quasi, dicta. Exercitationem laudantium officiis ipsum sunt rem officia facere, nemo sed! Vitae repudiandae veritatis corporis laboriosam necessitatibus quis exercitationem iusto iste. Qui, minus. Ratione modi aut natus maiores?";
const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error architecto ipsam doloribus quisquam aperiam. Id necessitatibus blanditiis dolorum enim sequi iusto doloribus explicabo quo accusantium doloremque in accusamus veniam, facere, voluptate at. Sit asperiores voluptatibus deserunt autem cum modi aspernatur est quis veritatis harum soluta voluptates quos eaque ducimus, vel quidem molestias officia odit nobis et quasi. Voluptas facilis accusamus quasi alias delectus dolorem quae aspernatur at, debitis, culpa perferendis neque consectetur. Nihil nam, voluptate repellat temporibus quisquam omnis! Quas, magni, ratione fugiat reprehenderit vero atque qui aliquam eaque nam veniam illum rem odio molestiae ad consequuntur, debitis repellendus ea dolores quis dolore optio. Odit iusto soluta ad fuga expedita dignissimos sint aut? Accusamus quod laboriosam deserunt corporis quam sint.";

const app =express();

app.set("view engine" , "ejs");

app.use(boydParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/" , function(req,res){
  res.render("home" , {homeContent: homeStartingContent, posts: posts});
});

app.get("/about", function(req,res){
  res.render("about" , {aboutContent: aboutContent});
});

app.get("/contact" , function(req,res){
  res.render("contact" , {contactContent: contactContent});
});

app.get("/compose" , function(req,res){
  res.render("compose");
});

app.post("/compose" , function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");
});


app.get("/posts/:postTitle" , function(req,res){
  let requestedTitle = _.lowerCase(req.params.postTitle);
  posts.forEach(function(post){
    if(requestedTitle === _.lowerCase(post.title)){
      res.render("post" , {postTitle: post.title, postContent: post.content});
    }
  });
});







app.listen(3000, function(){
  console.log("Server is running on port 3000...");
});
