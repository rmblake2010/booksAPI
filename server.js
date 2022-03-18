//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Config
require('dotenv').config()
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => {console.log('connect to mongo: ', process.env.MONGO_URI)})

const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//Controller
const booksController = require('./controllers/books_controller')
app.use('/books', booksController)

//init route
app.get('/', (req, res) => {
    console.log('imhere!')
})



app.listen(PORT, () => {
    console.log('connected to port: ', PORT)
})