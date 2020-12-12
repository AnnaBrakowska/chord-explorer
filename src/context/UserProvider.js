import React, { createContext, useState, useEffect } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const [form, updateForm] = useState({
        name: '', password: '', email: '', formType: 'signUp'
    })

    const switchForm = (formType) => {
        updateForm(() => ({ ...form, formType: formType }))
    }

    const onChange = (e) => {
        e.persist()
        updateForm(() => ({ ...form, [e.target.name]: e.target.value }))
    }

    const signIn = (e) => {
        console.log("sign in")
        console.log(form)
        if (form.password && form.email) {
            e.preventDefault()
            console.log("INSIDE")
            fetch("https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signin", {
                // fetch("http://localhost:3000/auth/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ user: form })
            }).then(res => {
                return res.json()
            }).then(res => {
                console.log("SINGING IN: ", res)
                if (res.status === 200) {
                    setSuccessMessage(res.message)
                    setErrorMessage('')
                    setUser(res.user)
                    updateForm(() => ({ ...form, formType: 'signedIn' }))
                } else {
                    setErrorMessage(res.message)
                    setSuccessMessage('')
                }
            }).catch((err) => {
                setErrorMessage('Something went wrong')
                setSuccessMessage('')
            })
        }
    }

    const signUp = (e) => {
        console.log("SIGN UP")
        if (form.password && form.email && form.name) {
            e.preventDefault()
            fetch("https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signup", {
                //fetch("http://localhost:3000/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: form })
            }).then(res => {
                return res.json()
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    setSuccessMessage(res.message)
                    setErrorMessage('')
                    setUser(res.user)
                    updateForm(() => ({ ...form, formType: 'signIn' }))
                } else {
                    setErrorMessage(res.message)
                    setSuccessMessage('')
                }
            }).catch((err) => {
                setErrorMessage('Something went wrong')
                setSuccessMessage('')
            })
        }
    }

    useEffect(() => {
        console.log("USER PROVIDER")
        fetch("https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signin", {
            // fetch("http://localhost:3000/auth/signin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(res => {
            console.log("SINGING IN: ", res)
            if (res.status === 200) {
                setSuccessMessage(res.message)
                setErrorMessage('')
                setUser(res.user)
                updateForm(() => ({ ...form, formType: 'signedIn' }))
            } else {
                setErrorMessage(res.message)
                setSuccessMessage('')
            }
        }).catch((err) => {
            console.log("Error: ", err)
        })
    }, [])

    return (
        <context.Provider value={{ user, onChange, switchForm, form, errorMessage, successMessage, signIn, signUp }}>
            {children}
        </context.Provider>
    );
};

UserProvider.context = context;

export default UserProvider;