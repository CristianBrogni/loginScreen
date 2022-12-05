const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(
  "mongodb+srv://cristian:teste123@logindatabase.52kaxl4.mongodb.net/loginDB"
);

const loginSchema = {
  email: {
    type: String,
    required: [true,"please enter an email"]
  },
  password: {
    type: String,
    required: [true,"please enter a password"]
  } 
}

const Login = new mongoose.model("Login", loginSchema);

app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.post("/register", function(req,res){
  const newLogin = new Login({
    email: req.body.username,
    password: req.body.password
  });
    newLogin.save(function (err) {
      if (err) {
        console.log(err);
        res.render("register");
      } else {
        res.render("menu");
       
      }
    });   
});


app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  Login.findOne({email: username}, function(err, foundLogin){
    if(err){
      console.log(err);
    }else{
      if(foundLogin){
        if(foundLogin.password === password){
          res.render("menu");
        }else{
          res.render("login");
        }
      }
    }
  });
});




app.listen(3000, function(){
  console.log("Server has started on port 3000");
});

