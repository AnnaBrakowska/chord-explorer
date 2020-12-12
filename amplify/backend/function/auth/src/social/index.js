const express = require('express')
const router = express.Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const connection = require('../connection')
const { v4: uuidv4 } = require('uuid')

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log(profile)
        connection.query(`SELECT * FROM Users WHERE user_email='${profile._json.email}';`, (error, results) => {
            if (error) throw error

            if (results.rows[0]) {
                console.log("FOUND USER=>>>>>=>>>>>>", results.rows[0])
                request.session.userId = uuidv4()
                connection.query(`INSERT INTO sessions (session_id, user_email) VALUES('${request.session.userId}', '${results.rows[0].user_email}')`)
                return done(error, results.rows[0])
            } else {
                console.log("USER NOT FOUND, CREATING A NEW USER")
                connection.query(`
                    INSERT INTO users (user_name, user_email) 
                    VALUES('${profile._json.name}', '${profile._json.email}')
                    RETURNING user_id;`, (error, data) => {
                    if (error) throw error
                    console.log(data.rows[0])
                    request.session.userId = uuidv4()
                    connection.query(`INSERT INTO sessions (session_id, user_email) VALUES('${request.session.userId}', '${profile._json.email}')`)
                    return done(error, data.rows[0])
                })
            }
        })
    }
))

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'https://main.dl8te1ylj497b.amplifyapp.com/account',
        failureRedirect: 'https://main.dl8te1ylj497b.amplifyapp.com/sign-up'
    })
)


module.exports = router


