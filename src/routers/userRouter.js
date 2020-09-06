const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/auth')


router.post('/users', async(req, res)=>{
    const user = new User(req.body)
    try{
        const token = await user.genAuthToken()
        res.status(201).send({user, token})
        await user.save()
        // sendWelcomeMail(user.email, user.name)
    }catch(e){
        res.status(404).send(e)
    }  
})

router.post('/users/login', async (req, res)=>{
    try {
        const user =await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.genAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/users/logout', auth,  async(req, res)=>{
    console.log('Logged out')
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports=router
