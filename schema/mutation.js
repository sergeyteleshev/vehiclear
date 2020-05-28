const graphql = require("graphql");
var db = require("../config");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLInt } = graphql;
const { User } = require("./types");
const bcrypt = require('bcryptjs');

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addUser: {
            type: User,
            args: {
                id:{type:GraphQLInt},
                FIO: { type: GraphQLString },
                login: { type: GraphQLString },
                password: { type: GraphQLString },
                point: { type: GraphQLString }
            },
            async resolve(root, args) {
                args.password = await bcrypt.hash(args.password, 10);
                return db.models.user.create(args);
            }
        }
    }
});


exports.mutation = RootMutation;