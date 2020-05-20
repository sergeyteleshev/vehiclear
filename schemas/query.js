const { db } = require("../config");
const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { UserType, CarsType } = require("./types");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    type: "Query",
    fields: {
        Cars: {
            type: CarsType,
            args: { car_id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM Cars WHERE id=?`;
                const values = [args.car_id];

                return db.query(query,values)
            }
        },
        user: {
            type: UserType,
            args: { login: { type: GraphQLString } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM users WHERE login=?`;
                const values = [args.login];

                return db.query(query,values)
            }
        }
    }
});

exports.query = RootQuery;