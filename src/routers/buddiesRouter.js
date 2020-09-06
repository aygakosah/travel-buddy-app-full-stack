const express = require('express')
const router = new express.Router()
const Buddies = require('../models/buddies')
const auth = require('../middleware/auth')


router.post('/buddies', auth, async(req, res)=>{
    const buddies = new Buddies({...req.body, owner:req.user._id})
    try{
        res.status(201).send(buddies)
        await buddies.save()
        // sendWelcomeMail(user.email, user.name)
    }catch(e){
        res.status(404).send(e)
    }  
})

router.get('/buddies/:destination', auth,  async(req, res)=>{
    try {
        const users=await Buddies.find({destination:req.params.destination})
        const betterusers = users.filter((user)=>{
            console.log(user.owner)
            console.log(req.user._id)
            return user.owner!==req.user._id
        })
        console.log(betterusers)
        console.log(betterusers.length)
        if(betterusers.length==0){
            return res.status(401).send({error:"There are currently no travellers to your location. Check back later"})
        }else{
            res.status(200).send(betterusers)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports=router