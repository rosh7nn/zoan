import React from 'react'
import { Navbar, Container, NavDropdown, Button, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'

function NavBar() {
    const dispatch = useDispatch()
    const history = useHistory()

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/login')
    }

    return (
        <>
            <style jsx>{`
                .modern-navbar {
                    background-color: #000;
                    padding: 0.75rem 1.5rem;
                    box-shadow: 0 2px 4px rgb(0 0 0 / 0.5);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    user-select: none;
                }
                .modern-navbar .navbar-brand {
                    color: #fff !important;
                    font-weight: 700;
                    font-size: 1.6rem;
                    letter-spacing: 0.05em;
                    transition: color 0.3s ease;
                }
                .modern-navbar .navbar-brand:hover,
                .modern-navbar .navbar-brand:focus {
                    color: #0d6efd;
                    text-decoration: none;
                }
                .modern-navbar .btn-rounded {
                    border-radius: 30px;
                    padding: 0.5rem 1.6rem;
                    font-weight: 600;
                    font-size: 0.95rem;
                    margin-left: 0.6rem;
                    min-width: 100px;
                    transition: background-color 0.25s ease, color 0.25s ease;
                }
                .modern-navbar .btn-rounded:hover,
                .modern-navbar .btn-rounded:focus {
                    background-color: #0d6efd;
                    border-color: #0d6efd;
                    color: #fff;
                }
                .avatar-img, .username-badge {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2.5px solid #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: #fff;
                    background-color: #444;
                    user-select: none;
                    transition: border-color 0.3s ease, background-color 0.3s ease;
                }
                .avatar-img:hover,
                .username-badge:hover {
                    border-color: #0d6efd;
                    background-color: #0a58ca;
                }
                .username-badge {
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                /* Remove dropdown caret arrow */
                #user-nav-dropdown > .dropdown-toggle::after {
                    display: none;
                }

                /* Minimal modern dropdown menu */
                .dropdown-menu {
                    min-width: 160px;
                    border-radius: 0.5rem;
                    box-shadow: 0 8px 16px rgb(13 110 253 / 0.15);
                    font-size: 0.95rem;
                    padding: 0.4rem 0;
                    background-color: #121212;
                    border: none;
                    transition: opacity 0.2s ease, transform 0.2s ease;
                }
                .dropdown-menu.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                .dropdown-item {
                    color: #ddd;
                    padding: 0.5rem 1.5rem;
                    transition: background-color 0.2s ease, color 0.2s ease;
                }
                .dropdown-item:hover, .dropdown-item:focus {
                    background-color: #0d6efd;
                    color: #fff;
                    outline: none;
                }
                .dropdown-divider {
                    border-top: 1px solid #2c2c2c;
                    margin: 0.25rem 0;
                }
                    .navbar .dropdown-toggle::after {
    display: none !important;
  }
            `}</style>

            <Navbar className="modern-navbar" expand="lg" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand tabIndex={0}>Zoan</Navbar.Brand>
                    </LinkContainer>

                    <div className="ms-auto d-flex align-items-center">
                        {!userInfo ? (
                            <>
                                <LinkContainer to="/login">
                                    <Button variant="outline-light" className="btn-rounded">
                                        Login
                                    </Button>
                                </LinkContainer>
                                <LinkContainer to="/register">
                                    <Button variant="outline-light" className="btn-rounded">
                                        Register
                                    </Button>
                                </LinkContainer>
                            </>
                        ) : (
                            <NavDropdown
                                title={
                                    userInfo.avatar ? (
                                        <Image src={userInfo.avatar} alt="avatar" className="avatar-img" />
                                    ) : (
                                        <div className="username-badge" aria-label={`User: ${userInfo.username}`}>
                                            {userInfo.username.charAt(0)}
                                        </div>
                                    )
                                }
                                id="user-nav-dropdown"
                                align="end"
                                menuVariant="dark"
                            >
                                <LinkContainer to="/account">
                                    <NavDropdown.Item>Account</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
