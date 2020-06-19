const db = require("../config");
const validator = require('validator');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt} = require("graphql");
const {User, Car, Photo, PhotoInput, CarQueryReport} = require("./types");
const fs = require('fs');
const converter = require('json-2-csv');
const url = require('url');
const path = require("path");
const {ValidationError} = require("./ValidationError");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var dateFormat = require('dateformat');

var id_car;
var file;

var getFile = function (id_csv) {
    file = 'exports/car' + id_csv + '_' + new Date().getTime() + '.csv';
    var absolutePath = path.resolve(file);
    file = url.pathToFileURL(absolutePath);
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
var Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            Users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    login: {
                        type: GraphQLString
                    },
                    password: {
                        type: GraphQLString
                    },
                    city: {
                        type: GraphQLString
                    },
                    FIO: {
                        type: GraphQLString
                    },
                    point: {
                        type: GraphQLString
                    },
                    role: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.user.findAll({where: args});
                }
            },
            Cars: {
                type: new GraphQLList(Car),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return db.models.car.findAll({where: args});
                }
            },
            Report: {
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
                    ;
                    getFile(id_car);

                    converter.json2csv(car_data, json2csvCallback, {
                        prependHeader: true
                    });
                    // getFile(id_car,file);
                    args.url = file.href;
                    return {
                        id: args.id,
                        url: args.url
                    };

                }
            },
            Photos: {
                type: new GraphQLList(Photo),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    photo: {
                        type: GraphQLString
                    },
                    date: {
                        type: GraphQLString
                    },
                    car_id: {
                        type: GraphQLInt
                    }
                },
                resolve(root, args) {
                    return db.models.photo.findAll({where: args});
                }
            },
        };
    }
});
exports.query = Query;