const pool = require('../db');

async function getUserByEmail(email) {
    const client = await pool.connect();
    const sql = `select * from users where email =$1`
    const result = (await client.query(sql, [email])).rows
    return result
}

async function createUserDB(name, surname, email, hasPWD) {
    const client = await pool.connect();
    sql_create = `insert into users(name,surname,email,pwd) values
    ($1,$2,$3,$4) returning *`
    const result = (await client.query(sql_create, [name, surname, email, hasPWD])).rows
    console.log(result);
    return result
}

module.exports = { getUserByEmail, createUserDB }