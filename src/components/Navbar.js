import React from 'react';
import styled from 'styled-components'
// import { AmplifySignOut } from '@aws-amplify/ui-react'

const NavWrapper = styled.nav`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
`

const Navbar = () => (
    <NavWrapper>
        {/* <AmplifySignOut /> */}
    </NavWrapper>
)

export default Navbar