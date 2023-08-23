const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const auteur = require('./backend/routes/auteur.js')
const livre = require('./backend/routes/livre.js')
const livreauteur = require('./backend/routes/livreauteur.js') 
const oracledb = require('oracledb')
const cors = require('cors')
let app = express()


app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

let router = express.Router()


app.use(express.static('static'))
app.use('/', auteur)
app.use('/', livre)
app.use('/', livreauteur)
app.listen(PORT, () => { console.log('listening to Port ' + PORT) }) //start server

app.get('/', (req, res) => {
    res.send('Hello world') //test
})
