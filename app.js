const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// config file env (data connection to mongodb)
dotenv.config({path: './config.env'})

// get routes
const newsRoute = require('./src/routes/newsRoute')

app.use(express.json()) // for add header api before request-- content-type: application/json
app.use(cors())
app.use('/api/v1/news', newsRoute)

// connect to mongodb atlas
mongoose.connect(
    process.env.DB,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
).then(() => console.log('Connection successful'))

// run server
app.listen(process.env.PORT || 2323, ()=>{
    console.log(`Server running`, process.env.PORT)
})