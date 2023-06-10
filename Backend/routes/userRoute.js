import express from 'express';
import { UserRepository } from '../app/repositories/userRepository.js'
import log from '../database/log.js';
import userModel from '../app/model/userModel.js'

const userRepository = new UserRepository

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

//router model bind equals
router.param(':id', async (req, res, next, id) => {
    try{
        req.user = await userRepository.find(id)
    }catch(err){
        log.error(err)
        res.status(500).send('Something broke!')
    }
      
    next()
})

router.get('/', async (req, res) => {
    res.end('list of users')
})

router.get('/:id', async (req, res) => {
    res.end(req.user)
})

router.post('/', (req, res) => {
    const _userModel = new userModel()
    
    const validated = _userModel.validate({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    })
    
    if (validated.error){
        res.status(404).send(validated)
        return
    }
})

export default router