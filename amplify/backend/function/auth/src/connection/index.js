const { Client } = require('pg')

const connection = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});
connection.connect()

module.exports = connection 