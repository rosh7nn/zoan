import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Container, Image, Card, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productActions'
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import Message from '../components/Message'
import { savedCardsList } from '../actions/cardActions'
import UserAddressComponent from '../components/UserAddressComponent'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CHARGE_CARD_RESET } from '../constants/index'

const CheckoutPage = ({ match }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [addressSelected, setAddressSelected] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(0)

    const handleAddressId = (id) => {
        if (id) setAddressSelected(true)
        setSelectedAddressId(id)
    }

    const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
    const { loading, error, product } = useSelector(state => state.productDetailsReducer)
    const { error: cardCreationError, success, loading: cardCreationLoading } = useSelector(state => state.createCardReducer)
    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { stripeCards } = useSelector(state => state.savedCardsListReducer)

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getProductDetails(match.params.id))
            dispatch(savedCardsList())
            dispatch({ type: CHARGE_CARD_RESET })
        }
    }, [dispatch, match, history, success, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <>
            {/* Global Styling */}
            <style jsx="true">{`
        body, html, #root {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          color: #111827;
        }
        h3 {
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .btn-primary {
          background-color: #2563eb;
          border: none;
        }
        .btn-primary:hover {
          background-color: #1e40af;
        }
        .text-success {
          color: #059669 !important;
        }
        .card-title {
          font-weight: 600;
          color: #111827;
        }
        .checkout-card {
          border: none;
          border-radius: 1rem;
          background-color: #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          padding: 1.5rem;
        }
        .section-link {
          color: #2563eb;
          text-decoration: none;
          font-size: 0.9rem;
          margin-left: 0.75rem;
        }
        .section-link:hover {
          text-decoration: underline;
        }
        .product-image {
          border-radius: 0.75rem;
        }
      `}</style>

            <Container className="py-4">
                {cardCreationError && <Message variant="danger">{cardCreationError}</Message>}

                {loading && (
                    <div className="d-flex align-items-center">
                        <h5>Getting Checkout Info</h5>
                        <Spinner animation="border" className="ms-2" />
                    </div>
                )}

                {!loading && cardCreationLoading && (
                    <div className="d-flex align-items-center">
                        <h5>Checking your card</h5>
                        <Spinner animation="border" className="ms-2" />
                    </div>
                )}

                {error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Row>
                        {/* Left Section */}
                        <Col md={6}>
                            <h3>Checkout Summary</h3>
                            <Card className="checkout-card mb-4">
                                <Row>
                                    <Col xs={5}>
                                        <Image src={product.image} alt="Product" height="180" className="product-image" fluid />
                                    </Col>
                                    <Col xs={7}>
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="text-success fw-medium">₹ {product.price}</p>
                                    </Col>
                                </Row>
                            </Card>

                            <div className="d-flex align-items-center">
                                <h3>Billing Address</h3>
                                <Link to="/all-addresses/" className="section-link">
                                    Edit / Add Address
                                </Link>
                            </div>
                            <UserAddressComponent handleAddressId={handleAddressId} />
                        </Col>

                        {/* Right Section */}
                        <Col md={6}>
                            <h3>Payments Section</h3>
                            {success ? (
                                <ChargeCardComponent
                                    selectedAddressId={selectedAddressId}
                                    addressSelected={addressSelected}
                                    product={product}
                                />
                            ) : (
                                <CreateCardComponent
                                    addressSelected={addressSelected}
                                    stripeCards={stripeCards}
                                />
                            )}
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    )
}

export default CheckoutPage
