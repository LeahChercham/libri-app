const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')



router.post("/livreauteur", async function (request, response) {

    console.log('POST LIVRE_AUTEUR')
    const { livre_lid, auteur_aid } = request.body;
    let connection



    try {
        connection = await oracledb.getConnection(connectionProperties);
        console.log('After connection')
        const sql = `
                BEGIN
                    :result := livre_auteur_admin.assign_book_author(:livre_lid, :auteur_aid);
                END;
            `;

        const binds = {
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            livre_lid: livre_lid,
            auteur_aid: auteur_aid
        };


        const result = await connection.execute(sql, binds);

        if (result.outBinds.result === 1) {
            response.status(201).json({ message: 'Record inserted successfully LIVRE_AUTEUR' });

        } else {
            response.status(500).json({ message: 'Error inserting into LIVRE_AUTEUR' })
        }
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Error connecting to DB");
    } finally {
        if (connection) {
            doRelease(connection);
            console.log("after release");
        }
    }
});

module.exports = router