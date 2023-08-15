const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const user = require('./backend/routes/User')

let app = express()

let connectionProperties = {
    user: process.env.DBAAS_USER_NAME || "oracle",
    password: process.env.DBAAS_USER_PASSWORD || "oracle",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "localhost/xe"
  };

// doRelease to release db connection
function doRelease(connection) {
    connection.release(function(err){
        if(err){
            console.error(err.message)
        }
    })
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

let router = express.Router()

// response headers to support calls from external calls
router.use(function (request, response, next) {
    console.log("REQUEST:" + request.method + "   " + request.url);
    console.log("BODY:" + JSON.stringify(request.body));
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });





  app.use(express.static('static'))
  app.use('/', user)
  app.listen(PORT) //start server