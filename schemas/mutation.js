const graphql = require("graphql");
const db = require("../config").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { UserType } = require("./types");

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                FIO: { type: GraphQLString },
                login: { type: GraphQLString },
                password: { type: GraphQLString },
                point: { type: GraphQLString },
                city: { type: GraphQLString }

            },
            resolve(parentValue, args) {
                const query = `INSERT INTO Users(FIO, login, password, point,city) VALUES (?, ?, ?, ?,?)`;
                const values = [
                    args.FIO,
                    args.login,
                    args.password,
                    args.point,
                    args.city
                ];

                return db.query(query,values)
            }
        }
    }
});

exports.mutation = RootMutation;