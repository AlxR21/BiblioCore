const authorTable = require("../models/author.models.js")
const db = require('../db')
const {eq} = require('drizzle-orm')

exports.getAllAuthors = async function(req, res){
    const authors = await db.select().from(authorTable);
    return res.json(authors);
}

exports.getAuthorById = async function (req, res) {
    const [author] = await db.select().from(authorTable).where(eq(authorTable.id, req.params.id))

    if(!author){
        return res.status(400).json({error: "No author with specified id exists."})
    }
    return res.json(author)
}

exports.createAuthor = async function(req, res){
    const {firstName, lastName, email} = req.body;

    const [newAuthor] = await db
    .insert(authorTable)
    .values({
        firstName,
        lastName,
        email,
    })
    .returning({ id: authorTable.id});

    return res.json({message: "Author Has been Created", id: newAuthor.id})
}

