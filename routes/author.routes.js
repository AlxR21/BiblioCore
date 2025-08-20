const express = require('express');
const authorcontroller = require("../controllers/author.controller")

const router = express.Router()


router.get('/', authorcontroller.getAllAuthors);

router.get('/:id', authorcontroller.getAuthorById);

router.post('/', authorcontroller.createAuthor);


module.exports = router;