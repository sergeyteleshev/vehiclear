var db = require("../config");
const { GraphQLObjectType, GraphQLID, GraphQLString,GraphQLList,GraphQLInt } = require("graphql");
const { User, Car, Photo,PhotoInput } = require("./types");


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
                    password:{
                        type: GraphQLString
                    },
                    city:{
                        type: GraphQLString
                    },
                    FIO:{
                        type: GraphQLString
                    },
                    point: {
                        type: GraphQLString
                    },
                    role: {
                        type: GraphQLString
                    }
                },
                resolve (root, args) {
                    return db.models.user.findAll({ where: args });
                }
            },
            User: {
                type: User,
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    login: {
                        type: GraphQLString
                    }
                },
                resolve(parent, args)
                {
                    if(args.id) return db.models.user.findByPk(args.id);
                    if(args.login) return db.models.user.findOne({where: args});
                }
            },
            Cars:{
                type: new GraphQLList(Car),
                args: {
                    id: {
                        type: GraphQLInt
                    }
                },
                // where: (cars, args, context) => {
                //     if (args.id) return `${carsTable}.id = ${args.id}`
                // },
                // resolve: (parent, args, context, resolveInfo) => {
                //     return joinMonster.default(resolveInfo, {}, sql => {
                //         // knex is a query library for SQL databases
                //         return knex.raw(sql)
                //     })

                resolve (root, args) {
                    return db.models.car.findAll({ where: args });
                }
            },
            Car: {
                type: Car,
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    gos_numb: {
                        type: GraphQLString
                    }
                },
                resolve(parent, args)
                {
                    if(args.id) return db.models.car.findByPk(args.id);
                    if(args.gos_numb) return db.models.car.findOne({where: args});
                }
            },
            Photos:{
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
                resolve (root, args) {
                    return db.models.photo.findAll({ where: args });
                }
            },
        };
    }
});
exports.query = Query;