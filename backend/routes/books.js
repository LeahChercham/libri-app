const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')


// add CRUD activities

// First draft to get an IDEA. Have to populate users as these are persons
router.get("/livres", async function (request, response) {
    console.log('GET BOOKS')

    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message)
            response.status(500).send("Error connection to DB")
            return;
        }
        console.log('After connection')

        connection.execute('BEGIN :books_cur := books_admin.get_books; END;',
            {
                books_cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }, { outFormat: oracledb.OBJECT }, async function (err, result) {
                if (err) {
                    console.error(err.message)
                    response.status(500).send("Error getting data from DB")
                    doRelease(connection)
                    return;
                }
                
                const cursor = result.outBinds.books_cur;
                // Fetch rows from the cursor
                const rows = await cursor.getRows(100);
                console.log('books:', rows )
                
                response.status(200).json({ books: rows });
                
                doRelease(connection)
                console.log("after release")
            })
    })
})


router.post("/livres", async function (request, response) {

    console.log('POST BOOKS')

    try {
        const connection = await oracledb.getConnection(connectionProperties);
        console.log('After connection')
        const sql = `
            BEGIN
                :result := books_admin.add_book(:titre, :pages, :lienimage, :annee);
            END;
        `;

        const bindVars = { // property names have to match 
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            ...request.body,
            annee: new Date(request.body.annee)
        };

        try {
            const result = await connection.execute(sql, bindVars);
            const newBookId = result.outBinds.result;
            console.log('New book ID:', newBookId);
        } catch (error) {
            console.error('Error executing add_book:', error);
        } finally {
            if (connection) {
                await connection.close();
                console.log("after release");
            }
        }
    } catch (err) {
        console.error(err.message);
        response.status(500).send("Error connecting to DB");
    }
});




// Usage POST
// const bookData = {
//     lid: 'your_lid',
//     titre: 'Book Title',
//     pages: 300,
//     lienimage: 'image_url',
//     annee: new Date()
// };

// addBook(bookData);










module.exports = router