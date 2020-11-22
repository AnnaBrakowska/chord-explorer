import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { signupConfig, signinConfig, signUpTitleConfig } from './Signup.config'
import { Form, Error, Title, SuccessMessage } from '../../components'
import { Row, Column, PageContainer } from '../../globalStyles'
import createFormConfig from '../../utils/createFormConfig'
import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
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
        if (form.password && form.email && form.name) {
            e.preventDefault()
            API.post('chordexplorer', '/authorize/signup', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { user: form }
            }).then(res => {
                if (res.user.user_id && res.status === 200) {
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
                        formType === 'signUp' && <Form {...{ ...signUpConfig }} onSubmit={signUp} />
                    }
                    {
                        formType === 'signIn' && <Form {...{ ...signInConfig }} onSubmit={signIn} />
                    }
                    {
                        formType === 'signedIn' && (
                            <div>
                                <h1>Welcome to your account</h1>
                                <h3>More coming soon...</h3>
                            </div>
                        )
                    }
                </Column>
            </Row>
        </PageContainer>
    )
}

export default Singup