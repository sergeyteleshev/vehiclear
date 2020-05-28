const { GraphQLSchema } =require( 'graphql');
const {Query} =require( './query');
const {Mutation}= require('./mutation');

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

exports.Schema = Schema;