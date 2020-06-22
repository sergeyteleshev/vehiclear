const graphql = require("graphql");
const db = require("../config");
const {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt} = graphql;
const {User, Car, PhotoInput, Photo, CarQueryReport} = require("./types");
const {ValidationError} = require("./ValidationError");
const md5 = require('md5');

const converter = require('json-2-csv');
const url = require('url');
const path = require("path");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var dateFormat = require('dateformat');
const server = require("../server");
const fs = require('fs');


var id_car;
var file;
var getFile = function (id_csv) {
    file = 'exports/car' + id_csv + '_' + new Date().getTime() + '.csv';
};
var json2csvCallback = function (err, csv) {
    // id_csv=id_car;
    if (err) throw err;

    fs.writeFile(file, csv, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log('It\'s saved!');
        }
    });
};

//todo: запилить функцию, чтобы не писать полотно кода
// async function throwError(args,table) {
//     let errors = [];
//     var field = args.split(".")[1];
//     const foundRaw = await table.findAll({raw: true, where: {[field]: args}});
//     if (args == null)
//         errors.push({key: field, message: 'The' + field + ' must not be empty.'});
//     if (foundRaw[0].field.length)
//         errors.push({key: field, message: 'A record with this'+ field+' already exists.' });
//     if(errors.length)
//         throw new ValidationError(errors);
// }

var gosNumbServer = "TU8078";


const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addUser: {
            type: User,
            args: {
                id: {type: GraphQLInt},
                FIO: {type: GraphQLString},
                login: {type: GraphQLString},
                password: {type: GraphQLString},
                point: {type: GraphQLString}
            },
            async resolve(root, args) {
                //const userTable=db.models.user;
                let errors = [];
                if (args.login == null) {
                    errors.push({key: 'login', message: 'The login must not be empty.'});
                }
                //await throwError("args.password",userTable);
                if (args.password == null) {
                    errors.push({key: 'password', message: 'The password must not be empty.'});
                }
                //await throwError("args.FIO",userTable);
                if (args.FIO == null) {
                    errors.push({key: 'FIO', message: 'The FIO must not be empty.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);

                const foundUser = await db.models.user.findAll({raw: true, where: {login: args.login}});
                if (foundUser.length !== 0) {
                    if (foundUser[0].login.length) {
                        errors.push({key: 'login', message: 'A user with this login already exists.'});
                    } else if (foundUser[0].id.length) {
                        errors.push({key: 'id', message: 'A user with this id already exists.'});
                    } else if (foundUser[0].FIO.length) {
                        errors.push({key: 'FIO', message: 'A user with this FIO already exists.'});
                    }

                    if (errors.length)
                        throw new ValidationError(errors);
                } else {
                    args.password = md5(args.password);
                    return db.models.user.create(args);
                }
            }
        },
        updateUser: {
            type: User,
            args: {
                id: {type: GraphQLInt},
                FIO: {type: GraphQLString},
                password: {type: GraphQLString},
                point: {type: GraphQLString}
            },
            async resolve(user, args) {
                let errors = [];
                const foundUser = await db.models.user.findAll({raw: true, where: {login: args.id}});
                if (foundUser.length === 0) {
                    errors.push({key: 'id', message: 'A user with this id not exists.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);

                return db.models.user.update(args, {where: {id: args.id}});
            }
        },
        deleteUser: {
            type: User,
            args: {
                id: {type: GraphQLInt}
            },
            async resolve(user, args) {
                let errors = [];
                const foundUserID = await db.models.user.findAll({raw: true, where: {id: args.id}});
                if (foundUserID.length === 0) {
                    errors.push({key: 'error', message: 'A user with this data not exists.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);
                return db.models.user.destroy({where: {id: args.id}});
            }
        },
        authorizeUser: {
            type: User,
            args: {
                login: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            async resolve(root, args) {
                let errors = [];
                args.password = md5(args.password);

                if (args.login == null) {
                    errors.push({key: 'login', message: 'The login must not be empty.'});
                }

                if (args.password == null) {
                    errors.push({key: 'password', message: 'The password must not be empty.'});
                }

                if (errors.length)
                    throw new ValidationError(errors);

                const foundUser = await db.models.user.findOne({where: {login: args.login}});
                if (foundUser.login === args.login && foundUser.password === args.password)
                    return foundUser;
                else {
                    if (foundUser && foundUser.login !== args.login)
                        errors.push({key: 'login', message: "Такого пользователя не существует"});
                    else if (foundUser.password !== args.password)
                        errors.push({key: 'login', message: "Неверный пароль"});
                }

                if (errors.length)
                    throw new ValidationError(errors);
            }
        },
        addCar: {
            type: Car,
            args: {
                id: {type: GraphQLInt},
                gos_numb: {type: GraphQLString},
                location: {type: GraphQLString},
                state: {type: GraphQLBoolean},
                reports_counter: {type: GraphQLInt},
                photoIn: {type: PhotoInput},
                userCreated: {type: GraphQLString}
            },
            async resolve(root, args) {

                let errors = [];
                var id;
                if (args.id != null) {
                    args.photoIn.car_id = args.id;
                }
                if (args.location == null) {
                    if (args.photoIn.location == null) {
                        args.location = "";
                    }
                    args.location = args.photoIn.location;
                }
                //await throwError("args.FIO",userTable);
                if (args.reports_counter == null) {
                    errors.push({key: 'reports_counter', message: 'The reports_counter must not be empty.'});
                }
                if (args.reports_counter == null) {
                    errors.push({key: 'reports_counter', message: 'The reports_counter must not be empty.'});
                }
                if (args.userCreated == null) {
                    errors.push({key: 'userCreated', message: 'The userCreated must not be empty.'});
                }
                if (args.photoIn.photo == null || args.photoIn.photo.length === 0) {
                    errors.push({key: 'photo', message: 'Please add photo'})
                } else {
                    if (!args.photoIn.photo.includes('.jpeg') && !args.photoIn.photo.includes('.jgg') && !args.photoIn.photo.includes('.png')) {
                        errors.push({key: 'photo', message: 'Photo should be in .jgg or .jpeg or .png format'})
                    }
                }
                if (errors.length)
                    throw new ValidationError(errors);
                if (args.gos_numb == null) {
                    if (gosNumbServer == null) {
                        errors.push({key: 'gos_numb', message: 'gos_numb should be filled'});
                    }
                    args.gos_numb = gosNumbServer;
                }
                const foundCar = await db.models.car.findAll({raw: true, where: {gos_numb: args.gos_numb}});

                if (foundCar.length !== 0) {
                    errors.push({key: 'gos_numb', message: 'A car with this gos_numb already exists.'});
                    if (errors.length)
                        throw new ValidationError(errors);
                }

                // else args.gos_numb=gosNumbServer; //то что приходит со стороннего сервиса

                const foundUser = await db.models.user.findAll({raw: true, where: {login: args.userCreated}});
                if (foundUser.length == 0) {
                    errors.push({key: 'userCreated', message: 'Enter existing user login.'});
                    if (errors.length)
                        throw new ValidationError(errors);
                }

                await db.models.car.create(args);

                var carID= await db.models.car.findOne({
                    //attributes:[id],
                    raw: true,
                    where: {gos_numb: args.gos_numb}
                });
                args.photoIn.car_id=carID.id;

                await db.models.photo.create(args.photoIn);

                if (args.location == null) {
                    errors.push({key: 'location', message: 'Enter location.'});
                    if (errors.length)
                        throw new ValidationError(errors);
                }

                return {
                    id:carID.id,
                    gos_numb: args.gos_numb
                }


            }
        },
        updateCar: {
            type: Car,
            args: {
                id: {type: GraphQLInt},
                location: {type: GraphQLString},
                state: {type: GraphQLBoolean},
                reports_counter: {type: GraphQLInt},
                //photoIn:{type: new GraphQLList(PhotoInput)}
            },
            async resolve(root, args) {
                let errors = [];
                const foundCar = await db.models.car.findAll({raw: true, where: {id: args.id}});

                if (foundCar.length === 0) {
                    errors.push({key: 'gos_numb', message: 'A car with this gos_numb not exists.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);
                return db.models.car.update(args, {where: {id: args.id}});
            }
        },
        deleteCar: {
            type: Car,
            args: {
                id: {type: GraphQLInt}
            },
            async resolve(root, args) {
                let errors = [];
                const foundCarID = await db.models.car.findAll({raw: true, where: {id: args.id}});
                if (foundCarID.length === 0) {
                    errors.push({key: 'error', message: 'A car with this data not exists.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);
                return db.models.car.destroy({where: {id: args.id}});
            }
        },
        addPhoto: {
            type: Photo,
            args: {
                id: {type: GraphQLInt},
                photo: {type: GraphQLString},
                date: {type: GraphQLString},
                car_id: {type: GraphQLInt},
                location: {type: GraphQLString}
            },
            async resolve(root, args) {
                let errors = [];

                if (args.photo == null) {
                    errors.push({key: 'photo', message: 'The photo must not be empty.'});
                }
                if (args.car_id == null) {
                    errors.push({key: 'car_id', message: 'The car_id must not be empty.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);
                const foundPhoto = await db.models.photo.findAll({raw: true, where: {id: args.id}});
                if (foundPhoto.length !== 0) {
                    if (foundPhoto[0].photo.length) {
                        errors.push({key: 'photo', message: 'A photo with this address already assigned.'});
                    } else if (foundPhoto[0].id.length) {
                        errors.push({key: 'id', message: 'A photo with this id already exists.'});
                    }
                    if (errors.length)
                        throw new ValidationError(errors);
                }
                return db.models.photo.create(args);
            }
        },
        updatePhoto: {
            type: Photo,
            args: {
                id: {type: GraphQLInt},
                photo: {type: GraphQLString},
                date: {type: GraphQLString},
                car_id: {type: GraphQLInt},
                location: {type: GraphQLString}
            },
            async resolve(root, args) {
                let errors = [];
                const foundPhoto = await db.models.photo.findAll({raw: true, where: {id: args.id}});
                if (foundPhoto.length === 0) {
                    errors.push({key: 'id', message: 'A photo with this id not exists.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);
                return db.models.photo.update(args, {where: {id: args.id}});
            }
        },
        deletePhoto: {
            type: Photo,
            args: {
                id: {type: GraphQLInt}
            },
            async resolve(root, args) {
                let errors = [];
                const foundPhoto = await db.models.photo.findAll({raw: true, where: {id: args.id}});
                if (foundPhoto.length === 0) {
                    errors.push({key: 'id', message: 'A photo with this id not exists.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);

                return db.models.photo.destroy({where: {id: args.id}});
            }
        },
        getCsvReport: {
            type: CarQueryReport,
            args: {
                id: {
                    type: GraphQLInt
                },
                url: {
                    type: GraphQLString
                },
                dateFrom: {
                    type: GraphQLString
                },
                dateTo: {
                    type: GraphQLString
                }
            },
            async resolve(root, args) {

                if (args.id != null) {
                    id_car = args.id;
                    var car_data = await db.models.car.findOne({raw: true, where: args});
                }
                if (args.dateFrom != null && args.dateTo != null) {
                    id_car = "";
                    args.dateFrom = new Date(args.dateFrom);
                    dateFromNew = dateFormat(args.dateFrom, "dd-mm-yyyy");
                    args.dateTo = new Date(args.dateTo);
                    dateToNew = dateFormat(args.dateTo, "dd-mm-yyyy");
                    // console.log(args.dateTo);
                    // console.log(args.dateFrom);
                    var car_data = await db.models.car.findAll({
                        raw: true,
                        where: {createdAt: {[Op.between]: [dateFromNew, dateToNew]}} //date searched as day/mpnth/year. So in your  query  the first place should be for month
                    })
                }

                getFile(id_car);

                converter.json2csv(car_data, json2csvCallback, {
                    prependHeader: true
                });
                var fileServer = file.replace("exports", server.protocol + "://" + server.address + ":" + server.PORT);
                // getFile(id_car,file);
                args.url = fileServer;
                return {
                    id: args.id,
                    url: args.url
                };

            }
        },
    }
});


exports.mutation = RootMutation;