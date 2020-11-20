const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const secretName = "usernameSecret"
const connection = './connection'
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
            if (err) throw err

            if (data.SecretString) {
                secret = JSON.parse(data.SecretString)
            }
            console.log("SECRET", secret)
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
                if (error) throw error
                console.log("querying")
                if (results.rows[0]) {
                    console.log(results)
                    res.json({ user: results.rows[0], message: 'Invalid user. User already exists' })
                } else {
                    // IF USER DOESN'T EXIST HASH THE PASSWORD AND SAVE USER TO DB
                    bcrypt.hash(user.password, 10).then((hash) => {
                        console.log("HASH =>>>>", hash)
                        connection.query(`
                    INSERT INTO users (user_name, user_email, user_password) 
                    VALUES('${user.name}', '${user.email}', '${hash}')
                    RETURNING user_id;`, (error, data) => {
                            if (error) throw error
                            res.status(200).json({ message: 'User successfuly signed up.', user: data.rows[0] })
                        })
                    })
                }
            })
        })

    } else {
        console.log("Not found")
        res.status(500).json({ message: 'Something went wrong' })
    }
})

app.post('/authorize/signin', (req, res, err) => {
    console.log("signin")
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
                if (error) {
                    console.log(error)
                    throw error
                }
                if (results.rows[0]) {
                    console.log("FOUND")
                    const { user_email, user_password } = results.rows[0]
                    bcrypt.compare(user.password, user_password).then((result) => {
                        if (user_email === user.email && result) {

                            res.json({ message: 'Logged in' })
                        } else {
                            res.json({ message: 'Invalid login' })
                        }
                    })
                } else {
                    console.log("Not found")
                    res.json({ message: 'Invalid login' })
                }
            })
        })
    } else {
        console.log("Not found")
        res.status(404).json({ message: 'Invalid login' })
    }
})

app.listen(3000, function () {
    console.log("App started")
});

module.exports = app;