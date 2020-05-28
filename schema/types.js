const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString ,GraphQLInt} = graphql;

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

const CarsType = new GraphQLObjectType({
    name: "Cars",
    type: "Query",
    fields: {
        car_id: { type: GraphQLInt },
        car_name: { type: GraphQLString },
        car_age: { type: GraphQLInt }
    }
});

exports.User = User;
exports.CarsType = CarsType;