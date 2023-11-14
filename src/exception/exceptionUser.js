const ExceptionTypeUser = {
    USER_TITLE_EMPTY: 'no data',
    USER_TITLE_INVALID: 'incorrect user',
    USER_SURNAME_EMPTY:'surname is empty',
    USER_SURNAME_INVALID:'incorrect surname',
    USER_EMAIL_EMPTY:'email is empty',
    USER_EMAIL_INVALID:'imcorrect email',
    USER_PASSWORD_EMPTY:'password is empty',
    USER_PASSWORD_INVALID:'incorrect password',

    ID_USER_NOT_A_NUMBER:'id is not a number',
    ID_USER_NEGATIVE:'id should not be negative',


    DB_GET_USER_NOT_FOUND:'table user is empty',
    DB_GET_USER_BY_ID_NOT_FOUND:'user by id is not found',
    DB_POST_USER_NOT_CREATE:'user does not create',
    DB_PUT_USER_NOT_UPDATE:'user does not update',
    DB_PUT_USER_NOT_DELETE:'user does not delete',
    DB_PUT_USER_NOT_PATCH:'user does not patch',
    DB_GET_BY_ID_NOT_FOUND:'user by id id not found'
}

module.exports = ExceptionTypeUser