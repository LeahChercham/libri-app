
const connectionProperties = {
    user: process.env.DBAAS_USER_NAME || "c##libriadmin",
    password: process.env.DBAAS_USER_PASSWORD || "libri123admin",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "localhost/xe" // SID
};

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message)
        }
    })
}

module.exports = {
    connectionProperties: connectionProperties,
    doRelease: doRelease
}