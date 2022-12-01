var pool = require('./db');

async function getAgregarMedio(){
    try {
        //var query = 'SELECT * FROM login_usuario WHERE usuario = ? AND password = ? LIMIT 1';
        //var rows = await pool.query(query, [user, md5(password)]);
        var query = 'SELECT * FROM medios ORDER BY Descripcion DESC ';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

//AGREGAR UN ITEM AL LISTADO

async function insertAgregarMedio(Obj){
    try {
        var query = 'INSERT INTO medios SET ?';
        var rows = await pool.query(query, [Obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//ELIMINAR UN ITEM DEL LISTADO

async function eliminarAgregarMedioById(Id){
    try {
        var query = 'DELETE FROM medios WHERE IdMedio = ?';
        var rows = await pool.query(query, [Id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//MODIFICAR UN ITEM DEL LISTADO

async function getAgregarMedioById(Id){
    try {
        var query = 'SELECT * FROM medios WHERE IdMedio = ? ';
        var rows = await pool.query(query, [Id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}

async function modificarAgregarMedioById(Obj, Id){
    try {
        var query = 'UPDATE medios SET ? WHERE IdMedio = ?';
        var rows = await pool.query(query, [Obj, Id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports ={
                  getAgregarMedio, 
                  insertAgregarMedio, 
                  eliminarAgregarMedioById, 
                  getAgregarMedioById, 
                  modificarAgregarMedioById
                }