const express = require('express');
const mysql = require('mysql');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
//const schema = require('./schema');
const path = require('path');
const bodyParser = require("body-parser");
const graphql = require('graphql');
const joinMonster = require('join-monster');

const urlencodedParser = bodyParser.urlencoded({extended: false});

const connection=mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'vehicle',
    password: 'qwerty'
});


const app = express();


// app.set("view engine", "hbs");
//
// // получение списка пользователей
// app.get("/", function(req, res){
//     connection.query("SELECT * FROM cars", function(err, data) {
//         if(err) return console.log(err);
//         res.render("index.hbs", {
//             car: data
//         });
//     });
// });

// Allow cross-origin
app.use(cors());

const Cars = new graphql.GraphQLObjectType({
    name: 'Cars',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        car_name: { type: graphql.GraphQLString },
        car_age: { type: graphql.GraphQLInt }})
});

Cars._typeConfig = {
    sqlTable: 'cars',
    uniqueKey: 'id',
};

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: graphql.GraphQLString,
            resolve: () => "Hello world!"
        },
        cars: {
            type: new graphql.GraphQLList(Cars),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster.default(resolveInfo, {}, sql => {
                    return connection.query(sql)
                })
    }}

})});

schema = new graphql.GraphQLSchema({ query: QueryRoot });

app.use(
    '/graphql',
    graphqlHTTP({
        schema:schema,
        graphiql: true,
    })
);


app.use(express.static('public'));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client','public', 'index.html'));
// });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));