// services/db.js

const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'deteksi_plagiarisme',
    queueLimit: 0,
    connectionLimit: 50,
    waitForConnection: true
})

module.exports = db