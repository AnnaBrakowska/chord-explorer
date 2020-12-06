import React, { useContext } from 'react'
import { Row, Column, PageContainer } from '../../globalStyles'
import { Title } from '../../components'
import UserProvider from "../../context/UserProvider";


function Account() {
    const user = useContext(UserProvider.context)

    return (
        <PageContainer>
            <Row>
                <Column>
                    {user.user_name ?
                        (<Title title={`Welcome to your account ${user.user_name}!`} />)
                        :
                        <p>Looks like your session expired. Please sign in again.</p>
                    }
                </Column>
            </Row>

        </PageContainer>
    )
}

export default Account
