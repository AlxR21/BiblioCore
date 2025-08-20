const { log } = require('console');
const express = require('express');
const fs = require('node:fs')
const bookRouter = require('./routes/book.route.js')
const authorRouter = require('./routes/author.routes.js')

const app = express();
const PORT = 3000;

app.use(express.json());//Middleware

app.use(function(req, res, next){
  const logger = `[${Date.now()}] ${req.method} ${req.path}`
  fs.appendFileSync('logs.txt', logger, 'utf8')
  next();
})

// app.use(function(req, res, next){
//   log("I am In MiddleWARE AAA")
//   // return res.json({
//   //   message: "From the Middleware"
//   // })
//   next(); 
// })

//Routes
app.use('/books', bookRouter);

app.use('/author', authorRouter);

app.listen(PORT, () => {
    console.log(`Server is running at the ${PORT}`);
})