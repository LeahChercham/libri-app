const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const {connectionProperties, doRelease} = require('../database')


// add CRUD activities

// First draft to get an IDEA. Have to populate users as these are persons
router.get("/people", async function (request,response){
    console.log('GET people')

    oracledb.getConnection(connectionProperties, function(err, connection){
        if(err){
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute("SELECT * FROM people",{}, {outFormat: oracledb.OBJECT},function(err, result){
            if(err){
                console.error(err.message)
                response.status(500).send("Error getting data from DB")
                doRelease(connection)
                return;
            }
            console.log("RESULTSET:" + JSON.stringify(result))
            let people = []
            result.rows.forEach(function(element){
                people.push({
                    id: element.PERSON_ID, 
                    firstName: element.PERSON_FIRST_NAME, 
                    lastName: element.PERSON_LAST_NAME, 
                })
            }, this)
            response.json(people)
            doRelease(connection)
            console.log("after release")
        })
    })
})


module.exports = router