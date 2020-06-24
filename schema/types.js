const graphql = require("graphql");
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType, GraphQLList} = graphql;
const db = require("../config");
const ObjectsToCsv = require('objects-to-csv');
const {GraphQLUpload} = require("graphql-upload");

var User = new GraphQLObjectType({
        name: 'user',
        description: 'list of all the sectors',
        fields: () => {
            return {
                id: {
                    type: GraphQLInt,
                    resolve(user) {
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

            id: {
                type: GraphQLInt,

                // resolve (photo) {
                //     return photo.id;
                // }
            },
            photo: {
                type: GraphQLString,
                // resolve(photo) {
                //     return photo.photo;
                // }
            },
            date: {
                type: GraphQLString,
                // resolve(photo) {
                //     return photo.date;
                // }
            },
            car_id: {
                type: GraphQLInt,
                // resolve(photo) {
                //     return photo.car_id;
                // }
            }
            // location:{
            //     type:GraphQLString
            // }
        }),

    }
);
const Photo = new GraphQLObjectType({
        name: 'photo',
        description: 'list of all the cars',
        fields: () => ({

            id: {
                type: GraphQLInt,
                resolve(photo) {
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
            },
            location: {
                type: GraphQLString,
                resolve(photo) {
                    return photo.location;
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
                sqlColumn: 'id',
                resolve(car) {
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
                }
            },
            photo: {
                type: GraphQLList(Photo),
                resolve(car) {
                    return db.models.photo.findAll({raw: true, where: {car_id: car.id}});
                    //(photoCar);
                    //return photoCar.photo;
                    //return db.models.photo.findOne({attraw:true,where: {car_id:car.id}});
                }
                //sqlJoin: (carsTable, photosTable, args) => `${carsTable}.id = ${photosTable}.cars_id`

            },
            userCreated:{
                type:GraphQLString,
                resolve(car){
                    return car.userCreated;
                }
            },
            // photoIn: {
            //     type: Photo,
            //     resolve(car) {
            //         return db.models.photo.findAll({raw: true, where: {car_id: car.id}});
            //     }
            // }
            photoUpload:{
                type:PhotoInput,
                resolve(car){
                    return car.photoUpload;
                }
            }
        })
    }
);

const CarQueryReport = new GraphQLObjectType({
    name: 'carCSV',
    description: 'list of all the cars',
    fields: () => ({
            id: {
                type: GraphQLInt,
                resolve(carCSV) {
                    return carCSV.id;
                }
            },
            url: {
                type: GraphQLString,
                resolve(carCSV) {
                    return carCSV.url;
                }
            },
            dateFrom: {
                type: GraphQLString,
                resolve(carCSV) {
                    return carCSV.dateFrom;
                }
            },
            dateTo: {
                type: GraphQLString,
                resolve(carCSV) {
                    return carCSV.dateTo;
                }
            }

        }
    )
});
const CarQueryResponse = new GraphQLObjectType({
        name: 'carCSV',
        description: 'list of all the cars',
        fields: () => ({
            url: {
                type: GraphQLString,
                resolve(carCSV) {
                    return carCSV.url;
                }
            }
        })
    }
);
// const Query= new GraphQLObjectType({
//     name: 'report',
//     description: 'list of all the cars',
//     fields: () => ({
//             generateCsv(input: carCSVIn): generateCsvResponse!
//
//     }
// }

Car._typeConfig = {
    sqlTable: 'cars',
    uniqueKey: 'id'
};


exports.User = User;
exports.Car = Car;
exports.Photo = Photo;
exports.PhotoInput = PhotoInput;
exports.CarQueryReport = CarQueryReport;