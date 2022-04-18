//CONEXION CON POSTGRESQL

const env = require("dotenv").config();

const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST || "fullteam",
    user: process.env.USER_DB || "Meencantamac-2022",
    database: process.env.DATABASE || "5432",
    password: process.env.PASSWORD || "demo"
})
/* pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
}) */

module.exports = pool;