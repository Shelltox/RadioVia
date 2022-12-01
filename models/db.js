var mysql = require('mysql')
var util = require('util')

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    connectTimeout: parseInt(process.env.MYSQL_CONNECT_TIMEOUT),
    charset: process.env.MYSQL_CHARSET,
    timezone: process.env.MYSQL_TIMEZONE
})


pool.query = util.promisify(pool.query)

module.exports = pool;