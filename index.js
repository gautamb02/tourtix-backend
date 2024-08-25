const express = require('express')

// Importing Constants file
const constants = require('./config/constants')

//Connecting to Mongo Database
const connectToMongo = require('./database/connect.db')
connectToMongo()

//instance of express
const app = express()

port = constants.PORT

app.use('/api/auth', require('./routes/auth.routes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})