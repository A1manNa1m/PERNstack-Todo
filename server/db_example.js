const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "please put your postgreSQL password here",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

module.exports = pool