const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')


router.get("/utilisateurs", async function (request, response) {
    console.log('GET USERS')


    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute('BEGIN :users_cur := utilisateur_admin.get_users; END;',
            {
                users_cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }, { outFormat: oracledb.OBJECT }, async function (err, result) {
                if (err) {
                    console.error(err.message)
                    response.status(500).send("Error getting data from DB")
                    doRelease(connection)
                    return;
                }

                const cursor = result.outBinds.users_cur;
                // Fetch rows from the cursor
                const rows = await cursor.getRows(100);
                console.log('users:', rows)

                response.status(200).json({ users: rows });

                doRelease(connection)
                console.log("after release")
            })
    })
})


router.post("/utilisateur", async function (request, response) {

    console.log('POST USER')
    let connection

    try {
        connection = await oracledb.getConnection(connectionProperties);
        console.log('After connection')
        const sql = `
            BEGIN
                :result := utilisateur_admin.add_user(:adresse, :codepostal, :ville, :email, :anniversaire, :telephone, :prenom, :nom);
            END;
        `;

        const dateValue = request.body.anniversaire ? new Date(request.body.anniversaire) : null;

        const bindVars = { // property names have to match 
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            ...request.body,
            anniversaire: dateValue
        };


        const result = await connection.execute(sql, bindVars);
        const newUserId = result.outBinds.result;
        console.log('New user ID:', newUserId);
        response.status(201).json({ message: "New user saved", uid: newUserId });
    } catch (error) {

        console.error(error.message);
        response.status(500).send("Error connecting to DB");
    } finally {
        if (connection) {
            doRelease(connection)
            console.log("after release");
        }
    }

});


router.post('/utilisateur')
module.exports = router