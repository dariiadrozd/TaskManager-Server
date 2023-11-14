const pool = require('../db');

async function getAllTasksDB() {
    const client = await pool.connect();
    const sql = `select * from tasks`
    const result = (await client.query(sql)).rows
    return result
}

async function createTaskDB(task, user_id) {
    const client = await pool.connect();
    const sql = 'INSERT INTO tasks(task, user_id) VALUES ($1, $2) RETURNING *'
    const result = (await client.query(sql, [task, user_id])).rows
    return result
}

async function deleteTaskDB(id) {
    const client = await pool.connect();
    const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
    const result = (await client.query(sql, [id])).rows
    return result
}

async function PatchDataTaskDB(id, clientObj) {
    const client = await pool.connect();
    const sql1 = 'SELECT * FROM tasks WHERE id = $1';
    const oldObj = (await client.query(sql1, [id])).rows;
  
    const newObj = { ...oldObj[0], ...clientObj };
  
    const sql2 = 'UPDATE tasks SET task = $1, user_id = $2 WHERE id = $3 RETURNING *';
    const result = (await client.query(sql2, [newObj.task, newObj.user_id, id])).rows;
    return result;
  }


async function getByIdTaskDB(id){
    const client = await pool.connect()
    const sql = 'SELECT * FROM tasks WHERE id = $1 RETURNING *';
    const result = (await client.query(sql,[id])).rows;
    return result
}

module.exports = { getAllTasksDB, createTaskDB, deleteTaskDB, PatchDataTaskDB, getByIdTaskDB }