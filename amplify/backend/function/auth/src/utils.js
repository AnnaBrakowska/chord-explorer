module.exports = {
    validateUser: (user) => {
        const validEmail = typeof user.email == 'string' && user.email.trim() !== ''
        const validPassword = typeof user.email == 'string' && user.email.trim() !== '' && user.password.trim().length >= 6
        return validEmail && validPassword
    }
}