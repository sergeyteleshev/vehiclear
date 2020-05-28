"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/query");
const { mutation } = require("./schema/mutation");
var session = require('express-session');

const schema = new GraphQLSchema({
    query,
    mutation
});

var app = express();
app.use(
    '/main',
    expressGraphQl({
        schema: schema,
        graphiql: true
        //rootValue: { session: request.session },
    })
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));