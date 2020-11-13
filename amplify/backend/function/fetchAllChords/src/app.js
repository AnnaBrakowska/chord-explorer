const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')
const { Client } = require('pg');
const AWS = require('aws-sdk')
const secretName = "usernameSecret"
const client = new AWS.SecretsManager({
    region: 'us-east-1'
});

// Declare a new express app
let app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
});

/* GET ALL CHORDS */
app.get('/chords', (req, res) => {
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
        let secret
        if (err) throw err

        if (data.SecretString) {
            secret = JSON.parse(data.SecretString)
        }

        const connection = new Client({
            user: secret.user,
            host: secret.host,
            database: secret.dbname,
            password: secret.password,
            port: secret.port
        })
        connection.connect()
        console.log("connection", connection)
        connection.query('SELECT * FROM chords', (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows)
        })
    })
})

/* GET CHORD BY ID */
app.get('/chords/:id', (req, res) => {
    client.getSecretValue({ SecretId: secretName }, (err, data) => {
        let secret
        if (err) throw err

        if (data.SecretString) {
            secret = JSON.parse(data.SecretString)
        }

        const connection = new Client({
            user: secret.user,
            host: secret.host,
            database: secret.dbname,
            password: secret.password,
            port: secret.port
        })
        connection.connect()
        connection.query(`SELECT * FROM chords WHERE chord_id=${req.params.id}`, (error, results) => {
            if (error) throw error
            res.status(200).json(results.rows)
        })

    })
})

app.listen(3000, function () {
    console.log("App started")
});

module.exports = app
