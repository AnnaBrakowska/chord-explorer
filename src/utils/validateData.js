const validateData = (type, value) => {

    if (type === 'name') {
        return 'Invalid name'
    }

    if (type === 'email') {
        return 'Invalid email'
    }

    if (type === 'password') {
        return 'Invalid password'
    }


}

export default validateData