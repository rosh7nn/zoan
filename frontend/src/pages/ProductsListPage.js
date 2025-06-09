import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Button } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from "react-router-dom"
import { CREATE_PRODUCT_RESET } from '../constants'
import './ProductsListPage.css'

function ProductsListPage() {
    const history = useHistory()
    const searchTerm = history.location.search
    const dispatch = useDispatch()

    // products list reducer
    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products = [] } = productsListReducer // default to []



    // Parse search value from ?search=term
    let searchValue = ""
    if (searchTerm && searchTerm.includes("=")) {
        searchValue = decodeURIComponent(searchTerm.split("=")[1] || "")
    }

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({ type: CREATE_PRODUCT_RESET })
    }, [dispatch])

    // Filter products based on search term (case-insensitive)
    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    // Featured and remaining products
    const featuredProducts = filteredProducts.slice(0, 8)
    const remainingProducts = filteredProducts.slice(8)

    const showNothingMessage = () => (
        <div className="d-flex justify-content-center py-5">
            {!loading ? (
                <div className="text-center">
                    <div className="mb-4" style={{ fontSize: '4rem', opacity: 0.4 }}>🐾</div>
                    <h4 className="mb-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>No pets found</h4>
                    <Message variant='info'>Try adjusting your search or browse our featured pets</Message>
                </div>
            ) : ""}
        </div>
    )

    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-background">
                    <div className="hero-shapes">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="shape shape-3"></div>
                    </div>
                </div>
                <Container>
                    <Row className="align-items-center min-vh-100">
                        <Col lg={6} className="hero-content">
                            <div className="hero-badge">
                                🐾 Premium Pet Companions
                            </div>
                            <h1 className="hero-title">
                                Find Your Perfect
                                <span className="gradient-text"> Furry Friend </span>
                                Today
                            </h1>
                            <p className="hero-subtitle">
                                Discover loving cats and dogs from trusted breeders. Every pet comes with
                                health certificates and our lifetime support guarantee.
                            </p>
                            <div className="hero-stats">
                                <div className="stat-item">
                                    <div className="stat-number">500+</div>
                                    <div className="stat-label">Happy Families</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">50+</div>
                                    <div className="stat-label">Adorable Pets</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">4.9★</div>
                                    <div className="stat-label">Customer Rating</div>
                                </div>
                            </div>
                            <div className="hero-cta">
                                <Button className="cta-button primary" onClick={() => document.getElementById('pets').scrollIntoView({ behavior: 'smooth' })}>
                                    Browse Pets
                                </Button>
                                <Button className="cta-button secondary" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                                    Learn More
                                </Button>
                            </div>
                        </Col>
                        <Col lg={6} className="hero-visual d-none d-lg-block">
                            <div className="hero-image-container">
                                <div className="floating-card card-1">
                                    <div className="card-icon">🐱</div>
                                    <div className="card-text">Healthy Cats</div>
                                </div>
                                <div className="floating-card card-2">
                                    <div className="card-icon">🐶</div>
                                    <div className="card-text">Happy Dogs</div>
                                </div>
                                <div className="floating-card card-3">
                                    <div className="card-icon">🏥</div>
                                    <div className="card-text">Health Certified</div>
                                </div>
                                <div className="hero-graphic">
                                    <div className="graphic-circle"></div>
                                    <div className="graphic-dots"></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section className="features-section" id="about">
                <Container>
                    <div className="section-header text-center mb-5">
                        <h2 className="section-title">Why Choose Zoan</h2>
                        <p className="section-subtitle">Your trusted partner in finding the perfect pet companion</p>
                    </div>
                    <Row className="g-4">
                        {[
                            {
                                icon: '🏥',
                                title: 'Health Guaranteed',
                                desc: 'All pets come with complete health certificates and vaccinations from licensed veterinarians.'
                            },
                            {
                                icon: '🚚',
                                title: 'Safe Delivery',
                                desc: 'Climate-controlled transport with professional pet handlers for stress-free delivery.'
                            },
                            {
                                icon: '💝',
                                title: 'Lifetime Support',
                                desc: '24/7 support team and lifetime guidance for pet care, training, and health questions.'
                            }
                        ].map(({ icon, title, desc }, idx) => (
                            <Col key={idx} lg={4} md={6} sm={12}>
                                <div className="feature-card text-center p-4 h-100">
                                    <div className="feature-icon mb-3">{icon}</div>
                                    <h4 className="mb-3">{title}</h4>
                                    <p className="text-muted">{desc}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>


            {/* Featured Pets */}
            {!loading && featuredProducts.length > 0 && (
                <section id="pets" className="featured-section">
                    <Container>
                        <h2 className="section-title">Featured Pets</h2>
                        <Row>
                            {featuredProducts.map(product => (
                                <Col key={product.id} xl={3} lg={3} md={6} sm={12} className="product-wrapper">
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            )}
            {/* All Pets Section */}
            {!loading && remainingProducts.length > 0 && (
                <div className="all-products-section">
                    <Container>
                        <div className="section-header">
                            <h2 className="section-title">More Adorable Pets</h2>
                            <p className="section-subtitle">Discover more furry friends waiting to meet you</p>
                        </div>
                        <Row className="products-grid">
                            {remainingProducts.map((product) => (
                                <Col key={product.id} xl={3} lg={4} md={6} sm={6} xs={12}>
                                    <div className="product-wrapper">
                                        <Product product={product} />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            )}

            {/* No Pets Message */}
            {!loading && filteredProducts.length === 0 && (
                <div className="no-products-section">
                    {showNothingMessage()}
                </div>
            )}

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="newsletter-icon">🐾</div>
                            <h2 className="newsletter-title">Stay Connected</h2>
                            <p className="newsletter-subtitle">
                                Get updates on new arrivals, pet care tips, and exclusive offers for Zoan families.
                            </p>
                            <div className="newsletter-form">
                                <div className="form-group d-flex justify-content-center gap-2">
                                    <input type="email" placeholder="Enter your email address" className="email-input" />
                                    <Button className="subscribe-btn">Subscribe</Button>
                                </div>
                                <p className="privacy-text">We respect your privacy. Unsubscribe at any time.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="modern-footer" id="contact">
                <Container>
                    <Row className="footer-content">
                        <Col lg={4} md={6} className="footer-section">
                            <div className="footer-logo">
                                <span className="logo-icon">🐕</span>
                                <span className="logo-text">Zoan</span>
                            </div>
                            <p className="footer-description">
                                Connecting loving families with healthy, happy pets since 2020. Your trusted pet companion marketplace.
                            </p>
                            <div className="social-links">
                                <a href="#" className="social-link">📘</a>
                                <a href="#" className="social-link">📷</a>
                                <a href="#" className="social-link">🐦</a>
                                <a href="#" className="social-link">💼</a>
                            </div>
                        </Col>
                        <Col lg={2} md={3} className="footer-section">
                            <h5 className="footer-title">Quick Links</h5>
                            <ul className="footer-links">
                                <li><a href="#pets">Browse Pets</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>
                        </Col>
                        <Col lg={2} md={3} className="footer-section">
                            <h5 className="footer-title">Pet Care</h5>
                            <ul className="footer-links">
                                <li><a href="#">Health Guide</a></li>
                                <li><a href="#">Delivery Info</a></li>
                                <li><a href="#">Pet Insurance</a></li>
                                <li><a href="#">Training Tips</a></li>
                            </ul>
                        </Col>
                        <Col lg={4} md={6} className="footer-section">
                            <h5 className="footer-title">Contact Info</h5>
                            <div className="contact-info">
                                <p>📍 123 Pet Street, Animal City, AC 12345</p>
                                <p>📞 +1 (555) PET-ZOAN</p>
                                <p>✉️ hello@zoan.com</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Zoan. All rights reserved. | Licensed Pet Retailer</p>
                    </div>
                </Container>
            </footer>
        </div>
    )
}

export default ProductsListPage
