const validateData = (type, value) => {

    if (type === 'name') {
        const length = 6
        const result = value.length >= length
        const error = 'Invalid name. Name cannot be longer than 50 characters.'
        return !result && error
    }

    if (type === 'email') {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g
        const result = pattern.test(value)
        const error = 'Invalid email'
        return !result && error
    }

    if (type === 'password') {
        const patternUppercase = /[A-Z]+/
        const patternLowerCase = /[a-z]+/
        const patternSpecial = /[$&+,:;=?@#|'<>.^*()%!-]+/
        const length = 6
        const result = patternUppercase.test(value) && patternLowerCase.test(value) && patternSpecial.test(value) && value.length >= length
        const error = 'Invalid password. Password must be at least 6 characters long. Password must also include at least: one uppercase character, one lowercase character and one special character.'

        return !result && error
    }

}

export default validateData