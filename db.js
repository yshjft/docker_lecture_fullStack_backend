const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: 'hys060578',
    database: 'docker-lecture-practice'
})

exports.pool = pool