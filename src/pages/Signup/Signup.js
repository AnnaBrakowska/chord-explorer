import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Error, Title, SuccessMessage } from '../../components'
import { Row, Column } from '../../globalStyles'


import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
Amplify.configure(config)

const SignupContainer = styled.div`
  padding: 150px 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SignupColumn = styled(Column)`
    justify-content: center;
`

function Singup() {
    const [form, updateForm] = useState({
        password: '', email: '', formType: 'signUp'
    })

    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const onChange = (e) => {
        e.persist()
        updateForm(() => ({ ...form, [e.target.name]: e.target.value }))
    }

    const signUp = (e) => {
        if (form.password && form.email && form.name) {
            e.preventDefault()
            API.post('chordexplorer', '/authorize/signup', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { user: form }
            }).then(res => {
                if (res.user.user_id && !res.user.user_name) {
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

    const switchForm = (formType) => {
        updateForm(() => ({ ...form, formType: formType }))
    }


    const signIn = (e) => {
        if (form.password && form.email && form.name) {
            e.preventDefault()
            API.post('chordexplorer', '/authorize/signin', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { user: form }
            }).then(res => {
                if (res.message === 'Logged in') {
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

    // const checkUser = async () => {
    //     try {
    //         updateUser(user)
    //         updateForm(() => ({ ...form, formType: 'signedIn' }))
    //     } catch (err) {

    //     }
    // }


    // useEffect(() => {
    //     checkUser()
    // }, [])

    const { formType } = form
    const inputConfig = [
        { name: "name", required: true, placeholder: "Name", handler: onChange, type: "text" },
        { name: "email", required: true, placeholder: "Email", handler: onChange, type: "text", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" },
        { name: "password", required: true, placeholder: "Password", handler: onChange, type: "password" }]

    const buttonsConfig = [
        { label: "Sign Up", handler: signUp, background: 'lightblue', type: 'submit' },
        { label: "Sign In", type: "button", handler: switchForm, background: 'orange', switch: 'signIn' }
    ]

    const signInConfig = [
        { name: "email", required: true, placeholder: "Email", handler: onChange, type: "text" },
        { name: "password", required: true, placeholder: "Password", handler: onChange, type: "password" }
    ]

    const signInbuttonsConfig = [
        { label: "Sign In", type: "submit", handler: signIn, background: 'orange' },
        { label: "Sign Up", type: "button", handler: switchForm, background: 'lightblue', switch: 'signUp' }
    ]

    const formTypeTitleConfig = {
        signUp: 'Sign Up',
        signIn: 'Sign In',
        signedIn: 'Welcome'
    }

    return (
        <SignupContainer>
            <Row>
                <SignupColumn>
                    <Title title={formTypeTitleConfig[formType]} />
                </SignupColumn>
            </Row>

            <Row>
                <SignupColumn>
                    {errorMessage && <Error message={errorMessage} />}
                    {successMessage && <SuccessMessage message={successMessage} />}
                </SignupColumn>
            </Row>
            <Row>
                <SignupColumn>
                    {
                        formType === 'signUp' && <Form {...{ inputs: inputConfig, buttons: buttonsConfig }} onSubmit={signUp} />
                    }
                    {
                        formType === 'signIn' && <Form {...{ inputs: signInConfig, buttons: signInbuttonsConfig }} />
                    }
                    {
                        formType === 'signedIn' && (
                            <div>
                                <h1>Welcome to your account</h1>
                                <h3>More coming soon...</h3>
                            </div>
                        )
                    }
                </SignupColumn>
            </Row>
        </SignupContainer>
    )
}

export default Singup