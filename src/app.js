const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const user = require('./controller/user.controller');
const tasks = require('./controller/task.controller');
const api = require('./controller/api.controller')

const app = express()


app.use(cors());
app.use(bodyParser.json())
app.use('/tasks', tasks)
app.use('/api', api)
app.use('/user', user);
app.use((error, req, res, next) => {
    res.send(error.message)
})

module.exports = app