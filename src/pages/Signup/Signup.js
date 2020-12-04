import React, { useState, useEffect } from 'react'
import { signupConfig, signinConfig, signUpTitleConfig } from './Signup.config'
import { Form, Error, Title, SuccessMessage } from '../../components'
import { Row, Column, PageContainer } from '../../globalStyles'
import createFormConfig from '../../utils/createFormConfig'
import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
import { Redirect } from 'react-router'
Amplify.configure(config)

function Singup() {
    const [form, updateForm] = useState({
        name: '', password: '', email: '', formType: 'signUp'
    })

    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const onChange = (e) => {
        e.persist()
        updateForm(() => ({ ...form, [e.target.name]: e.target.value }))
    }

    const signUp = (e) => {
        console.log("SIGN UP")
        if (form.password && form.email && form.name) {
            e.preventDefault()
            fetch("https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signup", {
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

    const switchForm = (formType) => {
        updateForm(() => ({ ...form, formType: formType }))
    }


    const signIn = (e) => {
        console.log("sign in")
        console.log(form)
        if (form.password && form.email) {
            e.preventDefault()
            console.log("INSIDE")
            fetch("https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signin", {
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

    const { formType } = form

    const signUpConfig = createFormConfig(signupConfig.inputs, signupConfig.buttons, [onChange, onChange, onChange], [signUp, switchForm])
    const signInConfig = createFormConfig(signinConfig.inputs, signinConfig.buttons, [onChange, onChange, onChange], [signIn, switchForm])

    return (
        <PageContainer>
            <Row>
                <Column>
                    <Title title={signUpTitleConfig[formType]} />
                </Column>
            </Row>

            <Row>
                <Column>
                    {errorMessage && <Error message={errorMessage} />}
                    {successMessage && <SuccessMessage message={successMessage} />}
                </Column>
            </Row>
            <Row>
                <Column>
                    {
                        formType === 'signUp' && <Form {...{ ...signUpConfig }} />
                    }
                    {
                        formType === 'signIn' && <Form {...{ ...signInConfig }} />
                    }
                    {
                        formType === 'signedIn' && (
                            <Redirect to="/account" />
                        )
                    }
                </Column>
            </Row>
        </PageContainer>
    )
}

export default Singup