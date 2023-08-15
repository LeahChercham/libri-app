const express = require("express")
const router = express.Router()


// add CRUD activities


// First draft to get an IDEA. Have to populate users as these are persons
router.get("/user", function(request,response){
    console.log("GET user")
    oracledb.getConnection(connectionProperties, function(err, connection){
        if(err){
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute("SELECT * FROM user", {}), 
        {outFormat: oracledb.OBJECT}, 
        function(err, result){
            if(err){
                console.error(err.message)
                response.status(500).send("Error getting data from DB")
                doRelease(connection)
                return;
            }
            console.log("RESULTSET:" + JSON.stringify(result))
            let users = []
            result.rows.forEach(function(element){
                users.push({
                    id: element.ID, 
                    firstName: element.FIRSTNAME, 
                    lastName: element.LASTNAME, 
                    email: element.EMAIL,
                    phone: element.PHONE, 
                    birthDate: element.BIRTHDATE
                })
            }, this)
            response.json(users)
            doRelease(connection)
        }
    })
})


module.exports = router