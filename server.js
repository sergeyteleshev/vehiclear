"use strict";
const graphql = require("graphql");
const express = require("express");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/query");
const { mutation } = require("./schema/mutation");
const cors = require('cors');
const bodyParser = require('body-parser');
const { apolloUploadExpress } =require( 'apollo-upload-server');
const schema = new GraphQLSchema({
    query,
    mutation
});
var app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(apolloUploadExpress({ uploadDir: "./photos",maxFileSize: 10000000, maxFiles: 10 }));

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

const fs = require('fs');
const stream = require('stream');

//get для специфик файла . В общем, если я тебя правильно поняла, то нужно было это, если нет-хм,объясни
app.get('/getCsvReport/:file',(req, res) => {
    var file = req.params.file;//file="zhiga.jpg"; //comment it and enter needed file in method signature
    const r = fs.createReadStream('./photos/'+file) ;
    const ps = new stream.PassThrough() ;
    stream.pipeline(
        r,
        ps,
        (err) => {
            if (err) {
                console.log(err) ;
                return res.sendStatus(400);
            }
        });
    ps.pipe(res)});
//console.log(req.headers)});



//app.use(express.static('photos'));


const PORT = process.env.PORT || 9000;
const address="localhost";
const protocol="http";

exports.PORT=PORT;
exports.address=address;
exports.protocol=protocol;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



