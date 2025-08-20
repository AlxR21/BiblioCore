const express = require('express');
const booksTable = require('../models/book.models')
const controller = require("../controllers/book.controller")
const router = express.Router()

//GET Methods
router.get('/', controller.getAllBooks)

router.get('/:id', controller.getBookById)

//POST Methods
router.post('/', controller.createBook
  )

//DELETE Method
router.delete('/:id', controller.deleteBook)

module.exports = router;