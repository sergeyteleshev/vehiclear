var mysql = require('mysql');
var Sequelize = require('sequelize');
var _ = require('lodash');

var db = new Sequelize('vehicle', 'root', 'qwerty', {
    host: 'localhost',
    dialect: 'mysql',

});

var user = db.define('user', {
    id: {

        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
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
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

var car = db.define('car', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
    },
    gos_numb: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //побитый или нет
    state: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    reports_counter: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


// car.sync({force: true}).then(function () {
//     // Table created
//     return car.create({
//         id:1,
//         gos_numb: "455TU47",
//         location: "123141241",
//         state: true,
//         reports_counter:1
//
//     });
// });

var photo = db.define('photo', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey:true,
        autoIncrement: true
    },
    photo: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    car_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'cars',
            key: 'id'
        }
    }

});

// photo.sync({force: true}).then(function () {
//     // Table created
//     return photo.create({
//         id:7,
//         photo:"",
//         date: Date("25.05.2020"),
//         car_id: 1
//
//     });
// });
//
// car.hasMany(photo);

module.exports = db;