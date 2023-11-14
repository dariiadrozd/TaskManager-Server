const ExceptionTypeUser = require('../exception/exceptionUser');
const {getAllUsersDB, createUsersDB, getByIdUsersDB, updateByIdUsersDB, patchDataDB, deleteUserDB} = require('../repository/user.repository')

async function getAllUsers(){
    const data = await getAllUsersDB()
    if(!data.length) throw new Error(ExceptionTypeUser.DB_GET_USER_NOT_FOUND)
    return data;
}

async function createUsers(name,surname,email,pwd){
    const data = await createUsersDB(name,surname,email,pwd);
    if(!data.length) throw new Error(ExceptionTypeUser.DB_POST_USER_NOT_CREATE)
    return data;
}

async function getByIdUsers(id){
    const data = await getByIdUsersDB(id);
    if(!data.length) throw new Error(ExceptionTypeUser.DB_GET_USER_BY_ID_NOT_FOUND);
    return data
}

async function updateByIdUsers(id, name, surname, email, pwd){
    const data = await updateByIdUsersDB(id, name, surname, email, pwd);
    if(!data.length) throw new Error(ExceptionTypeUser.DB_PUT_USER_NOT_UPDATE);
    return data
}

async function patchData(id,clienObj){
    const data = await patchDataDB(id, clienObj);
    if(!data.length) throw new Error(ExceptionTypeUser.DB_PUT_USER_NOT_PATCH);
    return data
}

async function deleteUser(id){
    const data = await deleteUserDB(id);
    if(!data.length) throw new Error (ExceptionTypeUser.DB_PUT_USER_NOT_DELETE)
    return data;
}



module.exports = {getAllUsers, createUsers, getByIdUsers, updateByIdUsers, patchData, deleteUser}