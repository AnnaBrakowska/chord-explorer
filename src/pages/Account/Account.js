import React, { useState, useEffect } from 'react'
import { Row, Column, PageContainer } from '../../globalStyles'
import { Title } from '../../components'
import Amplify, { API } from 'aws-amplify';
import config from '../../aws-exports'
import { Redirect } from 'react-router'
Amplify.configure(config)

function Account() {
    const [user, setUser] = useState('')
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        console.log("FETCHING ACCOUNT DATA")
        fetch("https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => {
            return response.json()
        }).then(response => {
            if (response.status === 200) {
                console.log("RESPONSE: ", response)
                setUser({ ...response.user })
                console.log("USER: ", user)
            } else {
                setRedirect(!response.loggedIn)
            }
        })
    }, [])

    return (
        <PageContainer>
            <Row>
                <Column>
                    {user.user_name && (<Title title={`Welcome to your account ${user.user_name}!`} />)}
                </Column>
            </Row>
            {redirect && <Redirect to="/" />}
        </PageContainer>
    )
}

export default Account
