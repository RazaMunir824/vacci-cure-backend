const knex = require('knex')

var connection = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '0047',
      database : 'vacci-cure'
    }
  });
  
const db =  require("knex")(connection)

module.exports = db


//   Connection Checker
//   db.select('*').from('User').then(data => {
//      console.log(data)
//   })
  
 