const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { getAllTasks, createTask, deleteTask, patchTaskById, getTaskById } = require('../service/task.service');
const { isValidTaskBody, isValidId } = require('../helper/taskValidation');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const data = await getAllTasks();
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})


route.post('/', isValidTaskBody, async (req, res) => {
    try {
        const { task, user_id } = req.body;
        const data = await createTask(task, user_id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})


route.delete('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteTask(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.get('/:id', isValidId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getTaskById(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.patch('/:id', isValidId, isValidTaskBody, async (req, res) => {
    try {
        const { id } = req.params;
        const clientObj = req.body;
        const data = await patchTaskById(id, clientObj);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

module.exports = route;