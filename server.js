"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schemas/query");
const { mutation } = require("./schemas/mutation");

const schema = new GraphQLSchema({
    query,
    mutation
});

var app = express();
app.use(
    '/',
    expressGraphQl({
        schema: schema,
        graphiql: true
    })
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));