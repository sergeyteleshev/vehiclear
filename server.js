"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/query");
const { mutation } = require("./schema/mutation");
const cors = require('cors');
const bodyParser = require('body-parser');

const schema = new GraphQLSchema({
    query,
    mutation
});
var app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
    '/main',
    expressGraphQl({
        schema: schema,
        graphiql: true,
        formatError: error => ({
            message: error.message,
            state: error.originalError && error.originalError.state,
            locations: error.locations,
            path: error.path,
        }),
    })
);

app.use(express.static('exports'));

//app.use(express.static('photos'));


const PORT = process.env.PORT || 9000;
const address="localhost";
const protocol="http";

exports.PORT=PORT;
exports.address=address;
exports.protocol=protocol;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



