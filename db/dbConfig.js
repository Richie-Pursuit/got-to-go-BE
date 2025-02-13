const pgp = require('pg-promise')();
require('dotenv').config()


const cn = {
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password:process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    user: process.env.PG_USER
    
};




const db = pgp(cn);

module.exports = db;