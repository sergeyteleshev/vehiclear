const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString ,GraphQLInt ,GraphQLBoolean,Gr} = graphql;

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

var Car = new GraphQLObjectType({
        name: 'car',
        description: 'list of all the cars',
        fields: () => {
            return {
                id: {
                    type: GraphQLInt,
                    resolve (car) {
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
                }
            }
        }
    }
);

var Photo = new GraphQLObjectType({
        name: 'photo',
        description: 'list of all the cars',
        fields: () => {
            return {
                id: {
                    type: GraphQLInt,
                    resolve (photo) {
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
                }
            }
        }
    }
);
exports.User = User;
exports.Car = Car;