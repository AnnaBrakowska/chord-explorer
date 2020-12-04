
const { validateUser } = require('../utils.js')
const express = require('express')
const router = express.Router()
const connection = require('../connection')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

router.get('/signout', (req, res) => {
    if (req.session.userId) {
        connection.query(`DELETE FROM sessions WHERE session_id='${req.session.userId}';`, (error, results) => {
            if (error) throw error
            req.session.destroy(function () {
                res.clearCookie('userId', { path: '/' })
                res.status(200).json({ status: 200, loggedIn: false })
            })
        })
    } else {
        res.status(400).json({ status: 400, message: 'Something went wrong' });
    }
})

// SIGNUP
router.post('/signup', (req, res) => {
    console.log("REDIRECTED", req)
    const { user } = req.body
    if (validateUser(user)) {
        // CHECK IF USER EXISTS
        connection.query(`SELECT * FROM Users WHERE user_email='${user.email}';`, (error, results) => {
            if (error) {
                res.status(400).json({ status: 400, message: 'Something went wrong' })
            }
            if (results.rows[0]) {
                res.json({ status: 400, message: 'Invalid user. User already exists' })
            } else {
                // IF USER DOESN'T EXIST HASH THE PASSWORD AND SAVE USER TO DB
                bcrypt.hash(user.password, 10).then((hash) => {
                    connection.query(`
                    INSERT INTO users (user_name, user_email, user_password) 
                    VALUES('${user.name}', '${user.email}', '${hash}')
                    RETURNING user_id;`, (error, data) => {
                        if (error) res.status(500).json({ status: 500, message: 'Something went wrong' })
                        res.status(200).json({ status: 200, message: 'User successfuly signed up.', user: data.rows[0] })
                    })
                })
            }
        })

    }
})

// CHECK IF SIGNED IN
router.get("/signin", (req, res) => {
    if (req.session.userId) {
        connection.query(`SELECT * FROM users
        INNER JOIN sessions
        ON users.user_email = sessions.user_email
        WHERE sessions.session_id='${req.session.userId}';`, (error, results) => {
            console.log(results.rows)
            if (error) {
                res.status(400).json({ status: 400, loggedIn: false })
            }
            if (results.rows[0]) {
                res.status(200).json({ status: 200, loggedIn: true, user: results.rows[0] })
            } else {
                res.status(400).json({ status: 400, loggedIn: false })
            }
        })
    } else {
        res.status(400).json({ status: 400, loggedIn: false });
    }
})

// SIGN IN
router.post('/signin', (req, res) => {
    const { user } = req.body
    console.log("USER DATA: ", req.body)
    if (validateUser(user)) {
        connection.query(`SELECT * FROM Users WHERE user_email='${user.email}';`, (error, results) => {
            if (error) {
                throw error
            }
            if (results.rows[0]) {
                const { user_email, user_password, user_id } = results.rows[0]
                bcrypt.compare(user.password, user_password).then((result) => {
                    if (user_email === user.email && result) {
                        // Setting session and cookie
                        req.session.userId = uuidv4()
                        connection.query(`INSERT INTO sessions (session_id, user_email) VALUES('${req.session.userId}', '${user.email}')`)
                        res.status(200).json({ status: 200, loggedIn: true, user: results.rows[0] })
                    } else {
                        res.status(400).json({ status: 400, message: 'Invalid login' })
                    }
                })
            } else {
                res.status(400).json({ status: 400, message: 'Invalid login' })
            }
        })
    } else {
        res.status(400).json({ status: 400, message: 'Invalid login' })
    }
})


module.exports = router