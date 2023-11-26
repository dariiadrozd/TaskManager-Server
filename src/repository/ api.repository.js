const pool = require('../db');

async function getUserByEmail(email) {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const sql = `select * from users where email =$1`
        const result = (await client.query(sql, [email])).rows
        await client.query('COMMIT')
        return result
    }catch(error){
        await client.query('ROLLBACK')
        console.log(`createTaskDB: ${error.message}`);

        return []
    }
  
}

async function createUserDB(name, surname, email, hasPWD) {
    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        sql_create = `insert into users(name,surname,email,pwd) values
        ($1,$2,$3,$4) returning *`
        const result = (await client.query(sql_create, [name, surname, email, hasPWD])).rows
        await client.query('COMMIT')
        console.log(result);
        return result
    }catch(error){
        await client.query('ROLLBACK')
        console.log(`createTaskDB: ${error.message}`);

        return [];
    }
}

module.exports = { getUserByEmail, createUserDB }