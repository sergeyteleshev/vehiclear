const { db}  = require("./config");

db.query('select * from user', function(err, rows){
if(err) {
    throw err;
} else {
    console.log(rows);
}
});
db.query('select * from Users', function(err, rows){
    if(err) {
        throw err;
    } else {
        console.log(rows);
    }
});