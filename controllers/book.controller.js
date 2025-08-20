const booksTable = require("../models/book.models")
const authorTable = require("../models/author.models")
const db = require('../db')
const { eq, sql } = require("drizzle-orm");

//GET
exports.getAllBooks = async function(req, res){
    const search = req.query.search;
    if(search){
      const books = await db
      .select()
      .from(booksTable)
      .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
      return res.json(books);
    }
    const books = await db.select().from(booksTable);
    return res.json(books);
}

exports.getBookById = async function(req, res){
    const id = req.params.id;

  const [book] = await db
  .select()
  .from(booksTable)
  .where((table) => eq(table.id, id))
  .leftJoin(authorTable, eq(booksTable.authorId, authorTable.id))
  .limit(1);

  if(!book) return res
  .status(404)
  .json({error: `Book with ${id} is not here.`})

  return res.json(book);
}

//POST
exports.createBook = async function(req, res){
    const {title, description, authorId} = req.body;
    
      if(!title || title === '')
        return res.status(400).json({
          error: "Title is Required."
        });
        
        const [result] = await db
        .insert(booksTable)
        .values({
          title,
          authorId,
          description
        })
        .returning({
          id: booksTable.id,
        });
      return res.status(201).json({
        message: 'Book is Created Successfully.', id: result.id
      })
}

exports.deleteBook = async function(req, res){
  const id = req.params.id;
  await db.delete(booksTable).where(eq(booksTable.id, id))

  return res.status(200).json({
    message: 'Book has been deleted successfully.'
  })
}