import React, { useState, useEffect } from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavLink, NavItem, NavItemBtn, NavBtnLink } from './Navbar.elements'
import { FaTimes, FaBars } from 'react-icons/fa'
import { Button, Column } from '../../globalStyles'

function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)
    const showButton = () => {
        window.innerWidth <= 960 ? setButton(false) : setButton(true)
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    const closeMobileMenu = () => {
        console.log('Hello  ')
    }

    return (
        <NavbarContainer>
            <Column>
                <NavLogo>Chords</NavLogo>
                <MobileIcon onClick={handleClick}>{click ? <FaTimes /> : <FaBars />}
                </MobileIcon>
                <NavMenu onClick={handleClick} click={click}>
                    <NavItem>
                        <NavLink to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/chords">Chords</NavLink>
                    </NavItem>

                    <NavItemBtn>
                        {button ? (
                            <NavBtnLink to="/sign-up">
                                <Button>SIGN UP</Button>
                            </NavBtnLink>
                        ) : (
                                <NavBtnLink to="/sign-up">
                                    <Button onClick={closeMobileMenu} fontBig primary>SIGN UP</Button>
                                </NavBtnLink>
                            )
                        }
                    </NavItemBtn>
                </NavMenu>
            </Column>
        </NavbarContainer>
    )
}

export default Navbar
