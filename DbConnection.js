const dbConnection = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "0047",
    database: "vacci-cure",
  },
};
const db = require("knex")(dbConnection);


// db.select('*').from('users').then(data => {
//    console.log(data)
// })


module.exports = db;