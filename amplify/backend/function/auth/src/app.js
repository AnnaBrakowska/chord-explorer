const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const secretName = "usernameSecret"
const AWS = require('aws-sdk')
const client = new AWS.SecretsManager({
    region: 'us-east-1'
})
const { Client } = require('pg')
const { validateUser } = require('./utils')

// Declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.post('/authorize/signup', (req, res) => {
    const { user } = req.body
    if (validateUser(user)) {
        // CHECK IF USER EXISTS
        client.getSecretValue({ SecretId: secretName }, (err, data) => {
            let connection
            let secret
            if (err) res.status(500).json({ status: 500, message: 'Something went wrong' })

            if (data.SecretString) {
                secret = JSON.parse(data.SecretString)
            }
            // CONNECT TO DB AND CHECK IF USER EXISTS
            connection = new Client({
                user: secret.user,
                host: secret.host,
                database: secret.dbname,
                password: secret.password,
                port: secret.port
            })
            connection.connect()
            connection.query(`SELECT * FROM Users WHERE user_email='${user.email}';`, (error, results) => {
                if (error) res.status(500).json({ status: 500, message: 'Something went wrong' })

                if (results.rows[0]) {
                    res.status(400).json({ status: 400, message: 'Invalid user. User already exists' })
                } else {
                    // IF USER DOESN'T EXIST HASH THE PASSWORD AND SAVE USER TO DB
                    bcrypt.hash(user.password, 10).then((hash) => {

                        connection.query(`
                    INSERT INTO users (user_name, user_email, user_password) 
                    VALUES('${user.name}', '${user.email}', '${hash}')
                    RETURNING user_id;`, (error, data) => {
                            if (error) throw error
                            res.status(200).json({ status: 200, message: 'User successfuly signed up.', user: data.rows[0] })
                        })
                    })
                }
            })
        })

    } else {
        res.status(400).json({ status: 400, message: 'Something went wrong' })
    }
})

app.post('/authorize/signin', (req, res) => {
    const { user } = req.body
    if (validateUser(user)) {
        client.getSecretValue({ SecretId: secretName }, (err, data) => {
            let secret
            let connection
            if (err) throw err

            if (data.SecretString) {
                secret = JSON.parse(data.SecretString)
            }
            connection = new Client({
                user: secret.user,
                host: secret.host,
                database: secret.dbname,
                password: secret.password,
                port: secret.port
            })
            connection.connect()
            connection.query(`SELECT * FROM Users WHERE user_email='${user.email}';`, (error, results) => {
                if (error) res.status(500).json({ status: 500, message: 'Something went wrong' })
                if (results.rows[0]) {
                    const { user_email, user_password } = results.rows[0]
                    bcrypt.compare(user.password, user_password).then((result) => {
                        if (user_email === user.email && result) {
                            res.status(200).json({ status: 200, message: 'Logged in' })
                        } else {
                            res.status(400).json({ status: 400, message: 'Invalid login' })
                        }
                    })
                } else {
                    res.status(400).json({ status: 400, message: 'Invalid login' })
                }
            })
        })
    } else {
        res.status(400).json({ status: 400, message: 'Invalid login' })
    }
})

app.listen(3000, console.log("App started"))

module.exports = app;