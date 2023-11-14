const ExceptionTypeUser = require('../exception/exceptionUser');

function isValidUserBody(req, res, next) {
    const { name, surname, email, pwd } = req.body

    if (!name) throw new Error(ExceptionTypeUser.USER_TITLE_EMPTY)

    if (typeof name !== 'string' || !isNaN(name)) {
        throw new Error(ExceptionTypeUser.USER_TITLE_INVALID);
    }

    if (!surname) throw new Error(ExceptionTypeUser.USER_SURNAME_EMPTY);


    if (typeof surname !== 'string' || !isNaN(surname)) {
        throw new Error(ExceptionTypeUser.USER_SURNAME_INVALID);
    }

    if (!email) throw new Error(ExceptionTypeUser.USER_EMAIL_EMPTY);

    if (!isValidEmailUser(email)) throw new Error(ExceptionTypeUser.USER_EMAIL_INVALID);


    if (!pwd) throw new Error(ExceptionTypeUser.USER_PASSWORD_EMPTY);


    if (typeof pwd !== 'string') {
        throw new Error(ExceptionTypeUser.USER_PASSWORD_INVALID);
    }

    next();
}

function isValidEmailUser(email) {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return checkEmail.test(email)

}

function isValidIdUserId(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) throw new Error(ExceptionTypeUser.ID_USER_NOT_A_NUMBER);
    if (id < 1) throw new Error(ExceptionTypeUser.ID_USER_NEGATIVE)
    next()
}

module.exports = { isValidUserBody, isValidIdUserId, isValidEmailUser }