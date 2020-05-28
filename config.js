var mysql = require('mysql');
var Sequelize = require('sequelize');
var _ = require('lodash');

var db = new Sequelize('vehicle', 'root', 'qwerty', {
    host: 'localhost',
    dialect: 'mysql'
});

var user = db.define('user', {
    id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
        //AUTO_INCREMENT_FLAG:true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true,
        unique: true
    },
    FIO: {
        type: Sequelize.STRING,
        allowNull: true
    },
    point: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
            type: Sequelize.STRING,
            allowNull: true
    }
});

// const connection=mysql.createConnection({
//     host:'localhost',
//     user: 'root',
//     database: 'vehicle',
//     password: 'qwerty'
// });
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });
//const db = connection;
module.exports = db;