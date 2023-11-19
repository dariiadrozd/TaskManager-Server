const pool = require('../db');

async function getAllTasksDB() {
    const client = await pool.connect();
    const sql = 'SELECT * FROM tasks';

    const data = (await client.query(sql)).rows;

    return data;
}


async function createTaskDB(task, user_id) {
    const client = await pool.connect();
    try{
await client.query('BEGING');

        const sql = `INSERT INTO tasks(task, user_id) VALUES
        ($1, $2) returning *`;
    
        const data = (await client.query(sql, [task, user_id])).rows;

        await client.query('COMMIT')
    
        return data;
    }catch(error){
await client.query('ROLLBACK')
console.log(`createTaskDB: ${error.message}`);

return [];
    }
   
}

async function patchTaskByIdDB(id, clientObj) {
    const client = await pool.connect();

    try{
        const sql = 'SELECT * FROM tasks WHERE id =$1';

        const oldObj = (await client.query(sql, [id])).rows;
    
        const newObj = { ...oldObj[0], ...clientObj };
    
        const newSql = `UPDATE tasks SET task =$1, user_id =$2 WHERE id =$3 returning *`;
    
        const data = (await client.query(newSql, [newObj.task, newObj.user_id, id])).rows;
    
await client.query("ROLLBACK")
console.log();

        return data;
    }catch(error){

    }
   
}

async function deleteTaskDB(id) {
    const client = await pool.connect();
    try{
        const sql = 'DELETE FROM tasks WHERE id =$1 returning *';

        const data = (await client.query(sql, [id])).rows;
    
        return data;
    }catch(error){
        await client.query("ROLLBACK")
        console.log((`deleteTaskDB:${error.message} `));
        return [];
    }
   
    
}

async function getTaskByIdDB(id) {
    const client = await pool.connect();
    const sql = 'SELECT * FROM tasks WHERE id =$1';

    const data = (await client.query(sql, [id])).rows;

    return data;
}

module.exports = { getAllTasksDB, createTaskDB, deleteTaskDB, patchTaskByIdDB, getTaskByIdDB };