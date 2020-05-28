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
        allowNull: false
    },
    FIO: {
        type: Sequelize.STRING,
        allowNull: false
    },
    point: {
        type: Sequelize.STRING,
        allowNull: false
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

user.sync({force: true}).then(function () {
    // Table created
    return user.create({
        id: 1,
        login: "Tommy",
        FIO:"TOMMYHILFIGER",
        point: "nevsky",
        password:"123init",
        role: "admin"
    });
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