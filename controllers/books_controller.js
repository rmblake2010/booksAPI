const express = require('express')
const books = express.Router()
const Book = require('../models/books')


//Index Page
books.get('/', (req, res) => {
    Book.find()
        .then(foundBooks => {
            res.status(200).json(foundBooks)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Error has occured.'
            })
        })
})

books.post('/', (req, res) => {
    Book.create(req.body)
    res.status(200)
    res.redirect('/books')
})


//Book Show
books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(foundBook => {
            res.status(200).json(foundBook)
        })
        .catch(err => {
            res.status(400).json({
                message: 'Error: cannot find book by id'
            })
        })
})

//Update Book
books.put('/:id', (req, res) => {
    //Mongoose parameters -> ID -> request body (input for update)
    Book.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedBook => {
        console.log(updatedBook)
        res.redirect('/books')
    })
})

//Delete Book
books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(deletedBook => {
        res.status(303).redirect('/books')
    })
    .catch(err => {
        res.status(400).json({
            message: 'Error: cannot find book by id'
        })
    })
})

module.exports = books