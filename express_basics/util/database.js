const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodeUser',
    database: 'node-complete',
    password:'nodeUser'
});

module.exports = pool.promise();