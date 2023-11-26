const ExceptionTypeApi = require('../exception/exceptionApi')

function isValidUserData(req, res, next) {
    const { name, surname, email, pwd } = req.body;

    if (!name) throw new Error(ExceptionTypeApi.CHECKING_EMAIL);
    if (!surname) throw new Error(ExceptionTypeApi.CREATE_DATA_USER);

    if (!email) throw new Error(ExceptionTypeApi.CHECK_IF_THE_USER_EXIST);

    if (!pwd) throw new Error(ExceptionTypeApi.PASSWORD_MATCH);

    next();
}

module.exports = {isValidUserData}