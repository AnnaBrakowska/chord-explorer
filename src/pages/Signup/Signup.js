import React, { useContext } from 'react'
import { signupConfig, signinConfig, signUpTitleConfig } from './Signup.config'
import { Form, Error, Title, SuccessMessage } from '../../components'
import { Row, Column, PageContainer } from '../../globalStyles'
import createFormConfig from '../../utils/createFormConfig'
import { Redirect } from 'react-router'
import UserProvider from "../../context/UserProvider"


function Singup() {
    const context = useContext(UserProvider.context)
    const { form, onChange, signIn, signUp, switchForm, errorMessage, successMessage } = context
    console.log("SIGN UP METHOD", signUp)
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