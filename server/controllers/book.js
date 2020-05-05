// model with Mongoose
const Book = require('../models/book')

// save book
exports.saveBook = (req, res)=> {
    const bookData = req.body;
    const book = new Book(bookData)

    book.save((err, createBook) => {
        if (err){
            return res.status(422).send(err)
        }
        return res.json(createBook)
    })
}

// get book
exports.getBook = (req, res) => {
    // {} means all book
    Book.find({}, (err, allBooks)=> {
        if (err){
            return res.status(422).send(err)
        }
        return res.json(allBooks);
    })
}

// update data
exports.updateBook=(req, res)=> {
    const bookId = req.params.id
    const bookData = req.body;

    Book.findById(bookId, (err, foundBook) => {
        if (err){
            return res.status(422).send(err)
        }
        foundBook.set(bookData);
        foundBook.save((err, saveBook) => {
            if (err){
                return res.status(422).send(err)
            }
            return res.json(saveBook)
        })
    })
}

//delete inside model
exports.deleteBook= (req, res) =>{
    const bookId = req.params.id

    Book.deleteOne({_id: bookId}, (err, deletedBook) =>{
        if (err){
            return res.status(422).send(err)
        }
        return res.json({status: 'DELETED'})
    })
}
