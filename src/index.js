const path = require('path')
const express =require('express')
const dotenv = require('dotenv')
const userRouter = require('./routers/userRouter')
const buddiesRouter = require('./routers/buddiesRouter')
const User = require('./models/users')
const Buddies = require('./models/buddies')
const app = express()
require('./db/mongoose.js')
const publicdir = path.join(__dirname, '../public')
dotenv.config()
const port = process.env.PORT
app.use(express.static(publicdir))
app.use(express.json())
app.use(userRouter)
app.use(buddiesRouter)
app.listen(port, ()=>{
    console.log("Server is listening on port", port)
})