const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')


// add CRUD activities

// First draft to get an IDEA. Have to populate users as these are persons
router.get("/auteurs", async function (request, response) {
    console.log('GET AUTHORS')

    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute("SELECT * FROM auteur", {}, { outFormat: oracledb.OBJECT }, function (err, result) {
            if (err) {
                console.error(err.message)
                response.status(500).send("Error getting data from DB")
                doRelease(connection)
                return;
            }
            console.log("RESULTSET:" + JSON.stringify(result))
            let auteurs = []
            result.rows.forEach(function (element) {
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

router.post("/auteur", async function (request, response) {
    console.log('POST AUTHOR')
    let connection

    try {
        connection = await oracledb.getConnection(connectionProperties);
        console.log('After connection')
        const sql = `
            BEGIN
                :result := author_admin.add_author(:prenom, :nom);
            END;
        `; // create automatic ID TO DO 

        const bindVars = { // property names have to match 
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            ...request.body,
        };


        const result = await connection.execute(sql, bindVars);
        const newAuthorId = result.outBinds.result;
        console.log('New author ID:', newAuthorId);
        response.status(201).json({ message: "New author saved with ID", aid: newAuthorId });
    } catch (error) {
        console.error('Error executing add_author:', error);
        console.error(error.message);
        response.status(500).send("Error connecting to DB");
    } finally {
        if (connection) {
            doRelease(connection)
            console.log("after release");
        }

    }
})

module.exports = router