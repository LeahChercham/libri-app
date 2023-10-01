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



// TO DO create PL/SQL
router.post("/emprunt", async function (request, response) {
    console.log('POST EMPRUNT');
    console.log(request.body);

    let connection

    try {
        connection = await oracledb.getConnection(connectionProperties)
        console.log('After connection');

        // TO DO SQL / VERIFY PACKAGE IN SQL DEVELOPER APP
        const sql = `
        BEGIN
                :result := emprunt_admin.add_emprunt(:utilisateur_utid, :statut_sid, :dateemprunt, :dateretourprevu, :dateretourreel);
            END;
        `

        // verify if using correct propertys in the request.body object
        const dateemprunt = request.body.dateemprunt ? new Date(request.body.dateemprunt) : null;
        const dateretourprevu = request.body.dateretourprevu ? new Date(request.body.dateretourprevu) : null;
        const dateretourreel = request.body.dateretourreel ? new Date(request.body.dateretourreel) : null;


        const bindVars = { // Property names have to match
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            ...request.body,
            dateemprunt: dateemprunt,
            dateretourprevu: dateretourprevu,
            dateretourreel: dateretourreel
        }

        const result = await connection.execute(sql, bindVars);
        const newEmpruntId = result.outBinds.result
        console.log("NEW EMPRUNT ID", newEmpruntId);

        response.status(201).json({ message: "New Emprunt Saved", eid: newEmpruntId })
    } catch (error) {

        console.error(error.message);
        response.status(500).send("Error connecting to DB");
    } finally {
        if (connection) {
            doRelease(connection)
            console.log("after release");
        }

    }

})

// TO DO create PL/SQL
router.post("/empruntlivre", async function (request, response) {

    console.log('POST EMPRUNT_LIVRE')
    const emprunt_eid = request.body.emprunt_eid
    const livres = request.body.livres


    let connection

    let results = []

    try {
        connection = await oracledb.getConnection(connectionProperties);
        console.log('After connection')
        livres.forEach(async livre => {
            let livre_lid = livre.lid
            console.log(emprunt_eid, livre_lid)
            const sql = `
                    BEGIN
                        emprunt_livre_admin.assign_emprunt_livre(:livre_lid, :emprunt_eid, :result);
                    END;
                `;
            const binds = {
                livre_lid: livre_lid,
                emprunt_eid: emprunt_eid,
                result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
            };

            const result = await connection.execute(sql, binds);
            results.push(result.outBinds.result)


        })
        const allSuccess = array => array.every(i = i === 1)
        let verif = allSuccess(verif)
        console.log("result: ", verif)
        if (verif) {
            response.status(201).json({ message: 'All Records inserted successfully EMPRUNT_LIVRE' });
        } else {
            response.status(500).json({ message: 'Error inserting into EMPRUNT_LIVRE' })
        };
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

router.get("/borrowsdetails", async function (request, response) {

    console.log('GET EMPRUNTS WITH BOOKS AND AUTHORS');

    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log('After connection');

        // Declare an empty emprunt_list to store the results
        const empruntList = [];

        const sql = `BEGIN
        emprunt_admin.get_emprunt_details(:emprunt_list);
      END;`

        const bind = {
            emprunt_list: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }

        connection.execute(sql, bind, { outFormat: oracledb.OBJECT }, async function (err, result) {
            if (err) {
                console.error(err.message);
                response.status(500).send("Error getting data from DB");
                doRelease(connection);
                return;
            }

            const cursor = result.outBinds.emprunt_list;
            // Fetch rows from the cursor
            // Fetch rows from the cursor and push them into empruntList
            let row;
            while ((row = await cursor.getRow())) {
                empruntList.push(row);
            }
            console.log('borrows with books with authors:', rows);

            response.status(200).json({ borrows: empruntList });

            doRelease(connection);
            console.log("after release");
        });
    });
})

module.exports = router