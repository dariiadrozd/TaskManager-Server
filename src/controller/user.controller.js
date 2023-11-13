const express = require('express');
const { getAllUsers, createUsers, getByIdUsers, updateByIdUsers, patchData, deleteUser } = require('../service/user.service')

const route = express.Router()

route.get('/', async (req, res) => {
    try {
        const data = await getAllUsers()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.post('/', async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUsers(name, surname, email, pwd);
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getByIdUsers(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

route.put('/:id', async(req,res)=>{
    try {
        const { id, name, surname, email, pwd } = req.params;
        const data = await updateByIdUsers(id, name, surname, email, pwd);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message)
    } 
})

route.patch('/:id', async(req,res)=>{
    try {
        const { id} = req.params;
        const data = await patchData(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send(error.message)
    }  
})

route.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await deleteUser(id);
        res.status(200).send(data)
    }catch(error){
   res.status(404).send(error.message)
    }
})

module.exports = route;