const bcrypt = require('bcrypt')

const { getUserByEmail, createUserDB } = require('../repository/ api.repository');
const ExceptionTypeApi = require('../exception/exceptionApi');
const salt = 10;

async function createUser(name, surname, email, pwd) {
    const user = await getUserByEmail(email)
    if (user.length) throw new Error(ExceptionTypeApi.CREATE_DATA_USER)

    const hasPWD = await bcrypt.hash(pwd, salt)
    const data =  await createUserDB(name, surname, email, hasPWD)
    if (!data.length) throw new Error('not created')
    return data
}

async function authUser(email, pwd) {
    const user = await getUserByEmail(email)
    if (!user.length) throw new Error(ExceptionTypeApi.CHECKING_EMAIL)

    const pwdUserHash = user[0].pwd
    if (!(await bcrypt.compare(pwd, pwdUserHash))) throw new Error(ExceptionTypeApi.PASSWORD_MATCH)
    return user 
}


module.exports = { createUser, authUser }