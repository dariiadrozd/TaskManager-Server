const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { getAllUsers, createUsers, getByIdUsers, updateByIdUsers, patchData, deleteUser } = require('../service/user.service');
const { isValidUserBody, isValidIdUserId, isValidEmailUser } = require('../helper/userValidation')

const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const data = await getAllUsers()
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.post('/', isValidUserBody, async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUsers(name, surname, email, pwd);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.get('/:id', isValidIdUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getByIdUsers(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.put('/:id', isValidIdUserId, isValidEmailUser,async (req, res) => {
    try {
        const {id} = req.params;
        const { name, surname, email, pwd } = req.body;
        const data = await updateByIdUsers(id, name, surname, email, pwd);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.patch('/:id', isValidIdUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await patchData(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})

route.delete('/:id', isValidIdUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteUser(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
})


module.exports = route;