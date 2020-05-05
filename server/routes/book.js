const express = require('express');
const routeur = express.Router();
const bookController = require('../controllers/book')

routeur.post('', bookController.saveBook);

routeur.get('', bookController.getBook)

routeur.patch('/:id', bookController.updateBook)

routeur.delete('/:id', bookController.deleteBook)

module.exports = routeur;
