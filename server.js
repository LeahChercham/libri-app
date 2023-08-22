const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const authors = require('./backend/routes/authors.js')
const books = require('./backend/routes/books.js')
const oracledb = require('oracledb')
const cors = require('cors')
let app = express()


app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

let router = express.Router()


app.use(express.static('static'))
app.use('/', authors)
app.use('/', books)
app.listen(PORT, () => { console.log('listening to Port ' + PORT) }) //start server

app.get('/', (req,res)=> {
    res.send('Hello world') //test
})
