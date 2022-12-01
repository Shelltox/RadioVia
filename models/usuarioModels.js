var pool = require('./db');
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password){
    try {
        var query = 'SELECT * FROM login_usuario WHERE usuario = ? AND password = ? LIMIT 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {getUserByUsernameAndPassword}