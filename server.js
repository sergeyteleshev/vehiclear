"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/query");
const { mutation } = require("./schema/mutation");
var session = require('express-session');
const cors = require('cors');

const schema = new GraphQLSchema({
    query,
    mutation
});

var app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));

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