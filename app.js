// require dependencies
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')


//creating express app
const app = express()

//MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send("oh noooes!")
})

//routes
app.use('/poop', require('./routes'))
app.use('/test', require('./routes/test'))


//listen on port
app.listen(3000, () => {
    console.log("hey your server is running. you better go catch it")
})