import React, { useState, useEffect } from 'react'
import { NavColumn, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavLink, NavItem, NavItemBtn, NavBtnLink } from './Navbar.elements'
import { FaTimes, FaBars } from 'react-icons/fa'
import { Button } from '../../globalStyles'

function Navbar({ loggedIn }) {
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
    }

    const signOut = () => {
        fetch('https://iimonj6pmb.execute-api.us-east-1.amazonaws.com/dev/authorize/signout', {
            // fetch("http://localhost:3000/auth/signout", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(response => {
            return response.json()
        }).then(response => {
            console.log("SIGN OUT RESPONSE: ", response)
        })
    }

    return (
        <NavbarContainer>
            <NavColumn>
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

                    <NavItem>
                        <NavLink to="/account">Account</NavLink>
                    </NavItem>

                    {loggedIn ? (
                        <NavItemBtn>
                            {button ? (

                                <Button onClick={signOut}>SIGN OUT</Button>
                            ) : (

                                    <Button onClick={signOut} fontBig primary>SIGN OUT</Button>

                                )
                            }
                        </NavItemBtn>
                    ) : (
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
                        )}
                </NavMenu>
            </NavColumn>
        </NavbarContainer>
    )
}

export default Navbar
