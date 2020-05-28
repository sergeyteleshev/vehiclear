const mysql = require('mysql');


const connection=mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'vehicle',
    password: 'qwerty'
});
const db = connection;
export default db;