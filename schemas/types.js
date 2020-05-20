const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString ,GraphQLInt} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    type: "Query",
    fields: {
        FIO: { type: GraphQLString },
        login: { type: GraphQLString },
        password: { type: GraphQLString },
        point: { type: GraphQLString },
        city: { type: GraphQLString }
    }
});

const CarsType = new GraphQLObjectType({
    name: "Cars",
    type: "Query",
    fields: {
        car_id: { type: GraphQLInt },
        car_name: { type: GraphQLString },
        car_age: { type: GraphQLInt }
    }
});

exports.UserType = UserType;
exports.CarsType = CarsType;