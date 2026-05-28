const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
module.exports.general = public_users;

let users = [];

const isValid = (username)=>{
  return !users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username, password} = req.body;

  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({data: username}, 'access', {expiresIn: 60*60});
    req.session.authorization = {accessToken};
    return res.status(200).json({message:"User successfully logged in"});
  }

  return res.status(208).json({message:"Invalid Login. Check username and password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review added/modified successfully"
  });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
