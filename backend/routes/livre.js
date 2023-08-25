const express = require("express")
const router = express.Router()
const oracledb = require('oracledb')
const { connectionProperties, doRelease } = require('../database')



// add CRUD activities
router.delete("/livre/:LID", async function (request, response) {
    console.log("DELETE BOOK");
    console.log(request.params);
    let LID = request.params.LID
    console.log("lid" + LID);


    oracledb.getConnection(connectionProperties, async function (err, connection) {
        if (err) {
            console.log(err.message);
            response.status(500).send("Error connection to DB")
            return
        }
        console.log('after connection');

        const sql = `BEGIN
        :result := books_admin.delete_book(:p_id); 
        END;`

        const bind = {
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            p_id: String(LID)
        }

        connection.execute(sql, bind, async function (err, result) {
            if (err) {
                console.error(err.message);
                response.status(500).send("Error deleting book");
                doRelease(connection);
                return;
            }

            const resultBoolean = result.outBinds.result
            if (resultBoolean) {
                console.log('Book deleted. ID was:' + LID);
                response.status(200).json({ message: "Book deleted successfully" })
                doRelease(connection)
            } else {
                console.error("return value deleting book false");
                response.status(500).send("Error deleting book");
                doRelease(connection);
                return;
            }

        })

    })
})

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
                console.log('books:', rows)

                response.status(200).json({ books: rows });

                doRelease(connection)
                console.log("after release")
            })
    })
})

router.get('/livre/recherche', async function (request, response) {
    console.log("SEARCH BOOKS OR AUTHORS");
    const search_string = request.query.search_string

    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log('After connection');

        const sql = `BEGIN :books_cur := books_admin.search_books(:search_string); END;`
        const bind = {
            books_cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
            search_string: search_string
        }
        connection.execute(sql, bind, { outFormat: oracledb.OBJECT }, async function (err, result) {
            if (err) {
                console.error(err.message);
                response.status(500).send("Error getting data from DB");
                doRelease(connection);
                return;
            }

            const cursor = result.outBinds.books_cur;
            // Fetch rows from the cursor
            const rows = await cursor.getRows(100);
            console.log('books found:', rows);

            response.status(200).json({ books: rows });

            doRelease(connection);
            console.log("after release");
        })
    })
})

router.get("/livres_with_authors", async function (request, response) {
    console.log('GET BOOKS WITH AUTHORS');

    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log('After connection');

        const sql = `BEGIN :books_cur := books_admin.get_books_with_authors; END;`
        const bind = {
            books_cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }
        connection.execute(sql, bind, { outFormat: oracledb.OBJECT }, async function (err, result) {
            if (err) {
                console.error(err.message);
                response.status(500).send("Error getting data from DB");
                doRelease(connection);
                return;
            }

            const cursor = result.outBinds.books_cur;
            // Fetch rows from the cursor
            const rows = await cursor.getRows(100);
            console.log('books with authors:', rows);

            response.status(200).json({ books: rows });

            doRelease(connection);
            console.log("after release");
        });
    });
});



router.post("/livres", async function (request, response) {

    console.log('POST BOOKS')
    let connection

    try {
        connection = await oracledb.getConnection(connectionProperties);
        console.log('After connection')
        const sql = `
            BEGIN
                :result := books_admin.add_book(:titre, :pages, :lienimage, :annee);
            END;
        `;

        const anneeValue = request.body.annee ? new Date(request.body.annee) : null;

        const bindVars = { // property names have to match 
            result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
            ...request.body,
            annee: anneeValue
        };


        const result = await connection.execute(sql, bindVars);
        const newBookId = result.outBinds.result;
        console.log('New book ID:', newBookId);
        response.status(201).json({ message: "New book saved", lid: newBookId });
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