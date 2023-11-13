const {getAllUsersDB, createUsersDB, getByIdUsersDB, updateByIdUsersDB, patchDataDB, deleteUserDB} = require('../repository/user.repository')

async function getAllUsers(){
    const data = await getAllUsersDB()
    if(!data.length) throw new Error('user data is empty')
    return data;
}

async function createUsers(name,surname,email,pwd){
    const data = await createUsersDB(name,surname,email,pwd);
    if(!data.length) throw new Error('user data is empty')
    return data;
}

async function getByIdUsers(id){
    const data = await getByIdUsersDB(id);
    if(!data.length) throw new Error('user data is empty');
    return data
}

async function updateByIdUsers(id, name, surname, email, pwd){
    const data = await updateByIdUsersDB(id, name, surname, email, pwd);
    if(!data.length) throw new Error('user data is empty');
    return data
}

async function patchData(id,clienObj){
    const data = await patchDataDB(id, clienObj);
    if(!data.length) throw new Error('user data is empty');
    return data
}

async function deleteUser(id){
    const data = await deleteUserDB(id);
    if(!data.length) throw new Error ('user data is empty ')
    return data;
}



module.exports = {getAllUsers, createUsers, getByIdUsers, updateByIdUsers, patchData, deleteUser}