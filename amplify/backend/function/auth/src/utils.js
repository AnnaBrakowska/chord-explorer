module.exports = {
    validateUser: (user) => {
        console.log("USER VALIDATION")
        const validEmail = typeof user.email == 'string' && user.email.trim() !== ''
        const validPassword = typeof user.email == 'string' && user.email.trim() !== '' && user.password.trim().length >= 6
        console.log("FINISHED USER VALIDATION")
        return validEmail && validPassword
    }
}