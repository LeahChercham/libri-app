const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')


router.get("/statut", async function (resquest, response) {
    console.log('getting statut');
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.err(err.message)
            response.status(500).send('error connection to db')
            return
        }
        console.log('After connecting');

        connection.execute('BEGIN :statut_cursor := statut_admin.get_all_statuts; END;', {
            statut_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }, { outFormat: oracledb.OBJECT }, async function (err, result) {
            if (err) {
                console.error(err.message);
                response.status(500).send("Error getting statut data from db")
                doRelease(connection)
                return
            }
            const cursor = result.outBinds.statut_cursor

            const rows = await cursor.getRows(10)
            console.log("got statut: " + rows);
            response.status(200).json({ statut: rows })
            doRelease(connection)
            console.log("After release");
        })

    })
})

module.exports = router
