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
    try {
        await client.query('BEGING');

        const sql = `update users 
        set name=$1, surname =$2, email=$3, pwd = $4 
        where id =$5
        returning`
        const data = (await client.query(sql, [id, name, surname, email, pwd])).rows

        await client.query('COMMIT')

        return data
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(`updateByIdUsersDB: ${error.message}`);
        return [];
    }

}



async function deleteUserDB(id) {
    const client = await pool.connect()
    try {
        await client.query('BEGING')
        const sql = `delete from users where id=$1 
        returning *`
        const data = (await client.query(sql, [id])).rows
        await client.query('COMMIT');
        return data
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(`deleteUserDB: ${error.message}`);
        return []
    }

}

async function patchDataUserDB(id, clientObj) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql1 = `SELECT * FROM users WHERE id = $1`;
        const oldObj = (await client.query(sql1, [id])).rows
        console.log(oldObj);
        const newArray = { ...oldObj[0], ...clientObj };

        const sql2 = `UPDATE users SET name = $1, surname =$2, email=$3, 
        pwd =$4 WHERE id =$5 RETURNING *`;

        const data = (await client.query(sql2,[newArray.name, newArray.surname, newArray.email, newArray.pwd, id])).rows
        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(`patchDataUserDB: ${error.message}`);

        return []
    }
}

module.exports = { getAllUsersDB, createUsersDB, getByIdUsersDB, updateByIdUsersDB, deleteUserDB,patchDataUserDB }