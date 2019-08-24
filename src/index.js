require('./models/User')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')   
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middleware/requireAuth')

const app = express()

app.use(bodyParser.json()) // the request has to be parsed first before auth
app.use(authRoutes)

const mongoUri ='mongodb+srv://admin:passwordpassword@cluster0-ukwqx.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})
mongoose.connection.on('err', (err) => {
    console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening to Port 3000')
})  