const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')

const auth = require('./auth')
const social = require('./social')

const app = express()
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(bodyParser.json())

app.use(function (req, res, next) {
    console.log('REQUEST', req)
    res.header('Access-Control-Allow-Origin', 'https://main.dl8te1ylj497b.amplifyapp.com')
    res.header('Access-Control-Allow-Credentials', "true")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization")

    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(session({
    key: 'userId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        expires: 60 * 60 * 24,
        httpOnly: true
    }
}))

app.get('/authorize', (req, res) => {
    res.json({ message: 'Welcome to my API' })
})

app.use('/authorize', auth)
app.use('/authorize/social', social)

app.listen(3000, console.log("App started"))

module.exports = app;