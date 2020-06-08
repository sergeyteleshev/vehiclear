const graphql = require("graphql");
var db = require("../config");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean,GraphQLInt,GraphQLList } = graphql;
const { User, Car,PhotoInput,Photo } = require("./types");
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
        },
        updateUser: {
            type: User,
            args: {
                id:{type:GraphQLInt},
                FIO: { type: GraphQLString },
                login: { type: GraphQLString },
                password: { type: GraphQLString },
                point: { type: GraphQLString }
            },
            resolve (user,args){
            const userEdit=db.models.user.findOne({attributes:['id'], where:{id:args.id}});
            return db.models.user.update(args,{where:{id:args.id}});

        }
        },
        deleteUser: {
            type: User,
            args: {
                id:{type:GraphQLInt}
            },
            resolve (user,args){
                const userEdit=db.models.user.findOne({attributes:['id'], where:{id:args.id}});
                return db.models.user.destroy({where:{id:args.id}});

            }
        },
        addCar: {
            type: Car,
            args:{
                id:{type: GraphQLInt},
                gos_numb: { type: GraphQLString },
                location: { type: GraphQLString },
                state:{type: GraphQLBoolean},
                reports_counter:{type: GraphQLInt}
            },
            async resolve(root, args) {
                return db.models.car.create(args);
            }
        },
        updateCar: {
            type: Car,
            args:{
                id:{type: GraphQLInt},
                gos_numb: { type: GraphQLString },
                location: { type: GraphQLString },
                state:{type: GraphQLBoolean},
                reports_counter:{type: GraphQLInt},
                //photoIn:{type: new GraphQLList(PhotoInput)}
            },
            async resolve(root, args) {
                return db.models.car.update(args,{where: {id:args.id}});
            }
        },
        deleteCar: {
            type: Car,
            args:{
                id:{type: GraphQLInt}
            },
            async resolve(root, args) {
                return db.models.car.destroy({where: {id:args.id}});
            }
        },
        addPhoto: {
            type: Photo,
            args:{
                id:{type: GraphQLInt},
                photo: { type: GraphQLString },
                date: { type: GraphQLString },
                car_id:{type: GraphQLInt}
            },
            async resolve(root, args) {
                return db.models.photo.create(args);
            }
        },
        updatePhoto: {
            type: Photo,
            args:{
                id:{type: GraphQLInt},
                photo: { type: GraphQLString },
                date: { type: GraphQLString },
                car_id:{type: GraphQLInt}
            },
            async resolve(root, args) {
                return db.models.photo.update(args,{where:{id:args.id}});
            }
        },
        deletePhoto: {
            type: Photo,
            args:{
                id:{type: GraphQLInt}
            },
            async resolve(root, args) {
                return db.models.photo.destroy({where:{id:args.id}});
            }
        }
}
});


exports.mutation = RootMutation;