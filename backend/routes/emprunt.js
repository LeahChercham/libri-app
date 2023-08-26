const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')

router.get("/borrows", async function (request, response) {
    console.log('GET BORROWS')


    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute('BEGIN :emprunts_cur := emprunt_admin.get_emprunts; END;',
            {
                emprunts_cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }, { outFormat: oracledb.OBJECT }, async function (err, result) {
                if (err) {
                    console.error(err.message)
                    response.status(500).send("Error getting data from DB")
                    doRelease(connection)
                    return;
                }

                const cursor = result.outBinds.emprunts_cur;
                // Fetch rows from the cursor
                const rows = await cursor.getRows(100);
                console.log('borrows:', rows)

                response.status(200).json({ borrows: rows });

                doRelease(connection)
                console.log("after release")
            })
    })
})


module.exports = router