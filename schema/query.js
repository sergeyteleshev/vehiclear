var db = require("../config");
const { GraphQLObjectType, GraphQLID, GraphQLString,GraphQLList,GraphQLInt } = require("graphql");
const { User, CarsType } = require("./types");



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
                    }
                },
                resolve (root, args) {
                    return db.models.user.findAll({ where: args });
                }
            }
        };
    }
});
exports.query = Query;