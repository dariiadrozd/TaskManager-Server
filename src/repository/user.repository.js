const pool = require('../db')

async function getAllUsersDB() {
    const client = await pool.connect()
    const sql = 'select * from users'
    const data = (await client.query(sql)).rows
    return data
}

async function createUsersDB(name, surname, email, pwd) {
    const client = await pool.connect()
    const sql = 'INSERT INTO users(name,surname,email,pwd) VALUES ($1,$2,$3,$4) returning *'
    const data = (await client.query(sql, [name, surname, email, pwd])).rows
    return data
}

async function getByIdUsersDB(id) {
    const client = await pool.connect()
    const sql = "select * from users where id = $1"
    const data = (await client.query(sql, [id])).rows
    return data
}

async function updateByIdUsersDB(id, name, surname, email, pwd) {
    const client = await pool.connect()
    try{
        await client.query('BEGING');

        const sql = `update users 
        set name=$1, surname =$2, email=$3, pwd = $4 
        where id =$5
        returning`
        const data = (await client.query(sql, [id, name, surname, email, pwd])).rows

        await client.query('COMMIT')

        return data
    }catch(error){
        await client.query('ROLLBACK');
        console.log(`updateByIdUsersDB: ${error.message}`);
        return [];
    }
   
}

async function patchDataDB(id, clienObj) {
    const client = await pool.connect()
    try{
        await client.query('BEGING');
        const sql = "select * from users where id =$1"
        const allObj = (await client.query(sql, [id])).rows
        const newObj = { ...allObj[0], ...clienObj }
    
await client.query('COMMIT');

        const sqlUpdate = `update users set name=$1, surname =$2, email=$3, pwd = $4 
        where id =$5
        returning`
        const result = (await client.query(sqlUpdate, [newObj.name, newObj.surname, newObj.email, newObj.pwd, id])).rows
        return result
    }catch(error){
        await client.query('ROLLBACK');
        console.log(`patchDataDB: ${error.message}`);
        return [];
    }
 
}

async function deleteUserDB(id){
    const client = await pool.connect()
    try{
        await client.query('BEGING')
        const sql = `delete from users where id=$1 
        returning *`
        const data = (await client.query(sql,[id])).rows
        await client.query('COMMIT');
        return data
    }catch(error){
        await client.query('ROLLBACK');
        console.log(`deleteUserDB: ${error.message}`);
        return []
    }
   
}

module.exports = { getAllUsersDB, createUsersDB, getByIdUsersDB, updateByIdUsersDB, patchDataDB, deleteUserDB }