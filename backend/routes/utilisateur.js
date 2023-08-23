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

module.exports = router