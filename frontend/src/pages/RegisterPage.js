import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Card, Alert } from 'react-bootstrap'
import { register } from '../actions/userActions'

function RegisterPage({ history }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    const userRegisterReducer = useSelector(state => state.userRegisterReducer)
    const { error, userInfo } = userRegisterReducer

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            setMessage("")
            dispatch(register(username, email, password))
        }
    }

    return (
        <>
            <style>{`
        body, html, #root {
          height: 100%;
          background: linear-gradient(135deg, #6e44ff 0%, #a15fff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .register-card {
          max-width: 450px;
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          padding: 2rem;
        }
        .register-title {
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #6e44ff;
          text-align: center;
          font-size: 2rem;
          letter-spacing: 1px;
        }
        .form-label {
          font-weight: 600;
          color: #4b3c8a;
        }
        .btn-register {
          background: #6e44ff;
          border: none;
          width: 100%;
          padding: 0.75rem;
          font-size: 1.1rem;
          border-radius: 50px;
          transition: background 0.3s ease;
        }
        .btn-register:hover {
          background: #5638d0;
        }
        .login-link {
          text-align: center;
          margin-top: 1rem;
          font-weight: 500;
          color: #4b3c8a;
        }
        .login-link a {
          color: #6e44ff;
          font-weight: 700;
          text-decoration: none;
          margin-left: 5px;
        }
        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>

            <Container className="register-container">
                <Card className="register-card">
                    <h2 className="register-title">Sign Up</h2>

                    {message && <Alert variant="danger">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label className="form-label">Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label className="form-label">Email Address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label className="form-label">Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mb-4">
                            <Form.Label className="form-label">Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" className="btn-register">
                            Sign Up
                        </Button>
                    </Form>

                    <div className="login-link">
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </div>
                </Card>
            </Container>
        </>
    )
}

export default RegisterPage
