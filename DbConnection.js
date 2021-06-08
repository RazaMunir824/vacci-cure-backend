



//   Connection Checker
//   db.select('*').from('User').then(data => {
//      console.log(data)
//   })
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

module.exports = db;

 