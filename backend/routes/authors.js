const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const {connectionProperties, doRelease} = require('../database')


// add CRUD activities

// First draft to get an IDEA. Have to populate users as these are persons
router.get("/auteurs", async function (request,response){
    console.log('GET AUTHORS')

    oracledb.getConnection(connectionProperties, function(err, connection){
        if(err){
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute("SELECT * FROM auteur",{}, {outFormat: oracledb.OBJECT},function(err, result){
            if(err){
                console.error(err.message)
                response.status(500).send("Error getting data from DB")
                doRelease(connection)
                return;
            }
            console.log("RESULTSET:" + JSON.stringify(result))
            let auteurs = []
            result.rows.forEach(function(element){
                auteurs.push({
                    id: element.AID, 
                    prenom: element.PRENOM, 
                    nom: element.NOM, 
                })
            }, this)
            response.json(auteurs)
            doRelease(connection)
            console.log("after release")
        })
    })
})


module.exports = router