const mongoose = require('mongoose')
const validator  = require('validator')


const buddySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
       type:String,
       require:true,
       validate(value){
           if(!validator.isEmail(value)){
               throw new Error("Invalid email")
           }
       }
    },
    departure_date:{
        type:Date,
        require:true
    }, 
    return_date:{
        type:Date,
        require:true
    }, 
    destination:{
        type:String,
        require:true
    }, 
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'User'
    }
}, {timestamps:true})

const Buddies = mongoose.model('Buddies', buddySchema)
module.exports = Buddies