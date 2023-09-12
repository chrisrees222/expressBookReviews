const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userwithsamename = users.filter((user) => {
    return user.username === username
});
if(userwithsamename.length > 0 ){
    return true;
}
else {
    return false; }
}


const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validUser = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validUser.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign(
          {
              data: password,
          },
          "access",
          { expiresIn: 60 * 60 }
      );
      req.session.authorization = {
          accessToken,
          username,
      };
      return res.status(200).send("User logged in");
    } else {
        return res.status(208).send("Login invalid, please check username or password");
}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let book_rev = books[isbn]

  if (book_rev) {
      let new_review = req.query.review;
      let reviewer = req.session.authorization['username'];
      if(new_review) {
          bookrev['reviews'][reviewer] = new_review;
          books[isbn] = book_rev;
      }
      res.send(`The review for the book has been added.`);
  }
  else{
      res.send("This book does not exist");
  }
});

//Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let reviewer = req.session.authorization['username'];
    let filtered_review = books[isbn]["reviews"];
    if (filtered_review[reviewer]){
        delete filtered_review[reviewer];
        res.send(`The review for the book has been deleted.`);
    }
    else{
        res.send("this cannot be deleted by you");
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

