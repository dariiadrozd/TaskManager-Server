const pool = require('../db');

async function getAllTasksDB() {
    const client = await pool.connect();
    const sql = `select * from tasks`
    const result = (await client.query(sql)).rows
    return result
}

async function createTaskDB(task, user_id) {
    const client = await pool.connect();
    const sql = `insert into tasks(task,user_id)
    values($1,$2) returning*`
    const result = (await client.query(sql, [task, user_id])).rows
    return result
}

async function deleteTaskDB(id) {
    const client = await pool.connect();
    const sql = `delete from tasks where id =$1
    returning *`
    const result = (await client.query(sql, [id])).rows
    return result
}

async function PatchDataTaskDB(id,clientObj) {
    const client = await pool.connect();
    const sql1 = `select * from tasks where id=$1
    returning *`
    const oldObj = (await client.query(sql1, [id])).rows

const newObj = {...oldObj[0],...clientObj}

const sql2 = `update tasks set task = $1,user_id = $2
where id = $3 returning *`
const result=(await client.query(sql2, [newObj.task, newObj.user_id,id])).rows
    return result
}

module.exports = { getAllTasksDB, createTaskDB, deleteTaskDB, PatchDataTaskDB }