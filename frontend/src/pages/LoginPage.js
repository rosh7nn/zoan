import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import { login } from '../actions/userActions'

function LoginPage({ history }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    // Get login state from Redux
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { error, userInfo } = userLoginReducer

    useEffect(() => {
        if (userInfo) {
            history.push('/') // redirect to homepage if logged in
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <>
            <style>{`
        body, html, #root {
          height: 100%;
          background: linear-gradient(135deg, #6e44ff 0%, #a15fff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
          padding: 2rem;
        }
        .login-title {
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
        .btn-login {
          background: #6e44ff;
          border: none;
          width: 100%;
          padding: 0.75rem;
          font-size: 1.1rem;
          border-radius: 50px;
          transition: background 0.3s ease;
        }
        .btn-login:hover {
          background: #5638d0;
        }
        .register-text {
          text-align: center;
          margin-top: 1rem;
          font-weight: 500;
          color: #4b3c8a;
        }
        .register-text a {
          color: #6e44ff;
          font-weight: 700;
          text-decoration: none;
          margin-left: 5px;
        }
        .register-text a:hover {
          text-decoration: underline;
        }
      `}</style>

            <Container className="login-container">
                <Card className="login-card">
                    <h2 className="login-title">Sign In</h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label className="form-label">Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-4">
                            <Form.Label className="form-label">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="btn-login">
                            Sign In
                        </Button>
                    </Form>

                    <div className="register-text">
                        Don't have an account?
                        <Link to="/register">Register</Link>
                    </div>
                </Card>
            </Container>
        </>
    )
}

export default LoginPage
