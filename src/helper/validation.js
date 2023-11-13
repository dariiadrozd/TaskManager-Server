 const ExceptionType= require('../exception/exception')

function isValidTaskBody(req,res,next){
    const {task,user_id} = req.body

    if(!task) throw new Error(ExceptionType.TASK_TITLE_EMPTY)

    if(!isNaN(task)) throw new Error (ExceptionType.TASK_TITLE_INVALID)

    if(!isNaN(user_id)) throw new Error(ExceptionType.TASK_USER_ID_INVALID)
    next()
}

function isValidId(req,res,next){
    const {id} = req.params
    if(isNaN(id)) throw new Error (ExceptionType.ID_NOT_A_NUMBER)
    if(id<1) throw new Error (ExceptionType.ID_NEGATIVE)
    next()
}

module.exports={isValidTaskBody, isValidId}
