
const graphql = require("graphql");
var db = require("../config");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLInt,GraphQLList } = graphql;
const { User, Car,PhotoInput,Photo } = require("./types");
const validator=require('validator');
const {ValidationError} =require( "./ValidationError");
var bcrypt = require('bcrypt');
//const pbkdf2 =require('pbkdf2');
var md5 = require('md5');

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
                if(foundUser.length !== 0){
                if (foundUser[0].login.length)
                {
                    errors.push({key: 'login', message: 'A user with this login already exists.'});
                }
                else if (foundUser[0].id.length)
                {
                    errors.push({key: 'id', message: 'A user with this id already exists.'});
                }
                else if (foundUser[0].FIO.length)
                {
                    errors.push({key: 'FIO', message: 'A user with this FIO already exists.'});
                }

                if (errors.length)
                    throw new ValidationError(errors);
                }
                else
                {
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
                if ( foundUserID.length === 0) {
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
                if(foundUser.login === args.login && foundUser.password === args.password)
                    return foundUser;
                else
                {
                    //todo вот тут почему-то разные пароли вылетают. почему? одна и та же функция, лол
                    errors.push({key: 'login', message: args.password + " 123 " + foundUser.password});
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
                reports_counter: {type: GraphQLInt}
            },
            async resolve(root, args) {
                let errors = [];
                if (args.gos_numb == null) {
                    errors.push({key: 'gos_numb', message: 'The gos_numb must not be empty.'});
                }
                //await throwError("args.password",userTable);
                if (args.location == null) {
                    errors.push({key: 'location', message: 'The location must not be empty.'});
                }
                //await throwError("args.FIO",userTable);
                if (args.reports_counter == null) {
                    errors.push({key: 'reports_counter', message: 'The reports_counter must not be empty.'});
                }
                if (errors.length)
                    throw new ValidationError(errors);

                const foundCar = await db.models.car.findAll({raw: true, where: {gos_numb: args.gos_numb}});
                if (foundCar.length!==0) {
                    if (foundCar[0].gos_numb.length) {
                    errors.push({key: 'gos_numb', message: 'A car with this gos_numb already exists.'});
                } else if (foundCar[0].id.length) {
                    errors.push({key: 'id', message: 'A car with this id already exists.'});
              }
                    if (errors.length)
                        throw new ValidationError(errors);
                }

                return db.models.car.create(args);
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
                car_id: {type: GraphQLInt}
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
               if(foundPhoto.length!==0)
                  { if (foundPhoto[0].photo.length) {
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
                car_id: {type: GraphQLInt}
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
        }
    }
});


exports.mutation = RootMutation;