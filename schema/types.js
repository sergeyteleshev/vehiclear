const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString ,GraphQLInt ,GraphQLBoolean,GraphQLInputObjectType,GraphQLList} = graphql;
var db = require("../config");

var User = new GraphQLObjectType({
        name: 'user',
        description: 'list of all the sectors',
        fields: () => {
            return {
                id: {
                    type: GraphQLInt,
                    resolve (user) {
                        return user.id;
                    }
                },
                login: {
                    type: GraphQLString,
                    resolve(user) {
                        return user.login;
                    }
                },
                FIO: {
                    type: GraphQLString,
                    resolve(user) {
                        return user.FIO;
                    }
                },
                point: {
                    type: GraphQLString,
                    resolve(user) {
                        return user.point;
                    }
                },
                password: {
                    type: GraphQLString,
                    resolve(user) {
                        return user.password;
                    }
                }
            }
        }
    }
);
var PhotoInput = new GraphQLInputObjectType({
        name: 'photoinput',
        description: 'list of all the cars',
        fields: () => ({


                car_id: {
                    type: GraphQLInt,
                    // resolve(photo) {
                    //     return photo.car_id;
                    // }

            }
        })
    }
);
const Photo = new GraphQLObjectType({
        name: 'photo',

        description: 'list of all the cars',
        fields: () => ({

                id: {
                    type: GraphQLInt,
                    resolve (photo) {
                        return photo.id;
                    }
                },
                photo: {
                    type: GraphQLString,
                    resolve(photo) {
                        return photo.photo;
                    }
                },
                date: {
                    type: GraphQLString,
                    resolve(photo) {
                        return photo.date;
                    }
                },
                car_id: {
                    type: GraphQLInt,
                     resolve(photo) {
                        return photo.car_id;
                    }
                }

        })
    }
);
Photo._typeConfig = {
    sqlTable: 'photos',
    uniqueKey: 'id'
};

const Car = new GraphQLObjectType({
        name: 'car',
        description: 'list of all the cars',
        fields: () => ({
                id: {
                    type: GraphQLInt,
                    sqlColumn:'id',
                    resolve (car) {
                        return car.id;
                    }
                },
                gos_numb: {
                    type: GraphQLString,
                    resolve(car) {
                        return car.gos_numb;
                    }
                },
                location: {
                    type: GraphQLString,
                    resolve(car) {
                        return car.location;
                    }
                },
                state: {
                    type: GraphQLBoolean,
                    resolve(car) {
                        return car.state;
                    }
                },
                reports_counter: {
                    type: GraphQLInt,
                    resolve(car) {
                        return car.reports_counter;
                    }},
                    photo: {
                        type: GraphQLList(Photo),

                        resolve(car) {
                      // return photo.photo;

                           return db.models.photo.findAll({raw:true,where: {car_id:car.id}});
                           //(photoCar);
                           //return photoCar.photo;
                           //return db.models.photo.findOne({attraw:true,where: {car_id:car.id}});
                        }
                        //sqlJoin: (carsTable, photosTable, args) => `${carsTable}.id = ${photosTable}.cars_id`

        }
        })
    }
);

Car._typeConfig = {
    sqlTable: 'cars',
    uniqueKey: 'id'
};

exports.User = User;
exports.Car = Car;
exports.Photo = Photo;
exports.PhotoInput = PhotoInput;