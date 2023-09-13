const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
      if(!isValid(username)){
          users.push({"username": username, "password": password});
          return res.status(200).json({messgae: "username saved, please log in"});
      } else {
        return res.status(404).json({messgae: "This Username already exists"}); 
      }
    }
    return res.status(404).json({messgae: "registration unsuccessful"});
});

// Get the book list available in the shop
//public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify(books,null,4));
//});

// TASK 10 - Get the book list available in the shop using Promises
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Task 10 using promises successful"));

  });

// Get book details based on ISBN
//public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //const isbn = req.params.isbn;
  //res.send(books[isbn]);
 //});

 //Task 11 - Get the book details from isbn using promises
 public_users.get('/isbn/:isbn',function (req, res) {
    const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    // console.log(isbn);
        if (req.params.isbn <= 10) {
        resolve(res.send(books[isbn]));
    }
        else {
            reject(res.send('ISBN does not exist'));
        }
    });
    get_books_isbn.
        then(function(){
            console.log("Task 11 promise resolved");
   }).
        catch(function () { 
                console.log('ISBN does not exist');
  });

});
  
// Get book details based on author
//public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //let booksbyauthor = [];
  //let isbns = Object.keys(books);
  //isbns.forEach((isbn) => {
    //if(books[isbn]["author"] === req.params.author) {
      //booksbyauthor.push({"isbn":isbn,
                          //"title":books[isbn]["title"],
                          //"reviews":books[isbn]["reviews"]});
    //}
  //});
  //res.send(JSON.stringify({booksbyauthor}, null, 4));
//});

// TASK 12 - Get book details based on author
public_users.get('/books/author/:author',function (req, res) {

    const get_books_author = new Promise((resolve, reject) => {

    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }


    });
    reject(res.send("Author does not exist "))
        
    });

    get_books_author.then(function(){
            console.log("Promise is met");
   }).catch(function () { 
                console.log('Author does not exist');
  });

  });

// Get all books based on title
//public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //let booksbytitle = [];
  //let isbns = Object.keys(books);
  //isbns.forEach((isbn) => {
    //if(books[isbn]["title"] === req.params.title) {
      //booksbytitle.push({"isbn":isbn,
                          //"title":books[isbn]["title"],
                          //"reviews":books[isbn]["reviews"]});
    //}
  //});
  //res.send(JSON.stringify({booksbytitle}, null, 4));
//});

//Task 13 get book title using promises
public_users.get('/title/:title',function (req, res) {

    const get_book_title = new Promise((resolve, reject) => {

    let book_title = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["title"] === req.params.title) {
        book_title.push({"isbn":isbn,
                            "author":books[isbn]["author"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({book_title}, null, 4)));
      }
    });
    reject(res.send("Title does not exist "))        
    });
    get_book_title.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('Title does not exist');
  });
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
