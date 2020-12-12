import React, { useContext } from 'react'
import { Row, Column, PageContainer } from '../../globalStyles'
import { Title } from '../../components'
import UserProvider from "../../context/UserProvider";


function Account() {
    const context = useContext(UserProvider.context)
    return (
        <PageContainer>
            <Row>
                <Column>
                    {context.user && context.user.user_name ?
                        (<Title title={`Welcome to your account ${context.user.user_name}!`} />)
                        :
                        <div>
                            <h3>Ooops...</h3>
                            <p>Looks like you don't have an active session. Please <a href="/sign-up">sign</a> in again.</p>
                        </div>

                    }
                </Column>
            </Row>

        </PageContainer>
    )
}

export default Account
