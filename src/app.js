const express = require('express');
const bodyParser = require('body-parser');
const user = require('./controller/user.controller');
const tasks = require('./controller/task.controller');

const app = express()

app.use(bodyParser.json())
app.use('/tasks', tasks)
app.use('/user', user);
app.use((error,req,res,next)=>{
    res.send(error.message)
})

module.exports = app