import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Card, Button, Modal, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductDetailsPage({ history, match }) {
    const dispatch = useDispatch()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const handleCloseDeleteModal = () => setShowDeleteModal(false)
    const handleShowDeleteModal = () => setShowDeleteModal(true)

    const { loading, error, product } = useSelector(state => state.productDetailsReducer)
    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { success: productDeletionSuccess } = useSelector(state => state.deleteProductReducer)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match])

    useEffect(() => {
        if (productDeletionSuccess) {
            alert('Product deleted successfully.')
            history.push('/')
        }
    }, [productDeletionSuccess, history])

    const confirmDelete = () => {
        dispatch(deleteProduct(match.params.id))
        handleCloseDeleteModal()
    }

    return (
        <div className="product-details-page">
            <style jsx>{`
                /* Scoped styles for product details page only */
                .product-details-page {
                  background: #f8fafc;
                  min-height: 100vh;
                  padding: 2rem 0 4rem;
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }

                .product-container {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 0 1.5rem;
                }

                .loading-container {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 60vh;
                  flex-direction: column;
                  gap: 1.5rem;
                }

                .loading-content {
                  text-align: center;
                  background: #ffffff;
                  padding: 3rem;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                  border: 1px solid #e5e7eb;
                }

                .loading-spinner {
                  color: #2563eb !important;
                  width: 3rem;
                  height: 3rem;
                  margin-bottom: 1rem;
                }

                .loading-text {
                  color: #374151;
                  font-size: 1.1rem;
                  font-weight: 500;
                  margin: 0;
                }

                .breadcrumb-nav {
                  margin-bottom: 2.5rem;
                  font-size: 0.875rem;
                  font-weight: 500;
                }

                .breadcrumb-nav a {
                  color: #2563eb;
                  text-decoration: none;
                  font-weight: 500;
                  transition: color 0.2s ease;
                }

                .breadcrumb-nav a:hover {
                  color: #1d4ed8;
                  text-decoration: underline;
                }

                .breadcrumb-separator {
                  margin: 0 0.75rem;
                  color: #6b7280;
                }

                .breadcrumb-current {
                  color: #111827;
                  font-weight: 600;
                }

                .product-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 4rem;
                  background: #ffffff;
                  border-radius: 8px;
                  padding: 3rem;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                  border: 1px solid #e5e7eb;
                }

                @media (max-width: 968px) {
                  .product-grid {
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                    padding: 2rem;
                  }
                }

                .image-container {
                  position: relative;
                  overflow: hidden;
                  border-radius: 8px;
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                }

                .product-image {
                  width: 100%;
                  height: auto;
                  max-height: 500px;
                  object-fit: cover;
                  border-radius: 8px;
                  transition: transform 0.3s ease;
                  cursor: zoom-in;
                }

                .product-image:hover {
                  transform: scale(1.02);
                }

                .image-skeleton {
                  width: 100%;
                  height: 400px;
                  background: #f3f4f6;
                  border-radius: 8px;
                  position: relative;
                  overflow: hidden;
                }

                .image-skeleton::after {
                  content: '';
                  position: absolute;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                  animation: shimmer 1.5s infinite;
                }

                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }

                .product-info {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                }

                .product-title {
                  font-size: 2.5rem;
                  font-weight: 700;
                  color: #111827;
                  margin: 0 0 1.5rem;
                  line-height: 1.2;
                  letter-spacing: -0.025em;
                }

                @media (max-width: 768px) {
                  .product-title {
                    font-size: 2rem;
                  }
                }

                .price-container {
                  margin-bottom: 2rem;
                }

                .price {
                  font-size: 2.25rem;
                  font-weight: 700;
                  color: #059669;
                  margin-bottom: 0.5rem;
                  display: block;
                  letter-spacing: -0.025em;
                }

                .price-label {
                  font-size: 0.875rem;
                  color: #6b7280;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                }

                .description {
                  font-size: 1rem;
                  line-height: 1.6;
                  color: #374151;
                  margin-bottom: 2.5rem;
                  font-weight: 400;
                }

                .stock-badge {
                  display: inline-flex;
                  align-items: center;
                  padding: 0.5rem 1rem;
                  background: #dcfdf7;
                  color: #065f46;
                  border: 1px solid #a7f3d0;
                  border-radius: 6px;
                  font-size: 0.875rem;
                  font-weight: 600;
                  margin-bottom: 2rem;
                }

                .out-of-stock-badge {
                  display: inline-flex;
                  align-items: center;
                  padding: 0.5rem 1rem;
                  background: #fef2f2;
                  color: #991b1b;
                  border: 1px solid #fecaca;
                  border-radius: 6px;
                  font-size: 0.875rem;
                  font-weight: 600;
                  margin-bottom: 2rem;
                }

                .button-group {
                  display: flex;
                  gap: 1rem;
                  flex-wrap: wrap;
                  margin-top: auto;
                }

                .btn-primary {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0.875rem 1.75rem;
                  background: #2563eb;
                  color: #ffffff;
                  border: none;
                  border-radius: 6px;
                  font-weight: 600;
                  font-size: 1rem;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  cursor: pointer;
                  min-width: 180px;
                  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }

                .btn-primary:hover {
                  background: #1d4ed8;
                  color: #ffffff;
                  text-decoration: none;
                  transform: translateY(-1px);
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .btn-secondary {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0.875rem 1.75rem;
                  background: #ffffff;
                  color: #374151;
                  border: 1px solid #d1d5db;
                  border-radius: 6px;
                  font-weight: 600;
                  font-size: 1rem;
                  text-decoration: none;
                  transition: all 0.2s ease;
                  cursor: pointer;
                  min-width: 120px;
                }

                .btn-secondary:hover {
                  background: #f9fafb;
                  color: #111827;
                  border-color: #9ca3af;
                  transform: translateY(-1px);
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }

                .btn-danger {
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  padding: 0.875rem 1.75rem;
                  background: #ffffff;
                  color: #dc2626;
                  border: 1px solid #dc2626;
                  border-radius: 6px;
                  font-weight: 600;
                  font-size: 1rem;
                  transition: all 0.2s ease;
                  cursor: pointer;
                  min-width: 120px;
                }

                .btn-danger:hover {
                  background: #dc2626;
                  color: #ffffff;
                  transform: translateY(-1px);
                  box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
                }

                /* Modal Styles */
                .modal-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.5);
                  z-index: 1050;
                }

                .modal-content {
                  background: #ffffff;
                  border-radius: 8px;
                  border: 1px solid #e5e7eb;
                  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                }

                .modal-header {
                  border-bottom: 1px solid #e5e7eb;
                  padding: 1.5rem 2rem;
                  border-radius: 8px 8px 0 0;
                }

                .modal-title {
                  color: #dc2626;
                  font-weight: 700;
                  font-size: 1.25rem;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }

                .modal-body {
                  padding: 2rem;
                  font-size: 1rem;
                  color: #374151;
                  line-height: 1.6;
                }

                .modal-footer {
                  border-top: 1px solid #e5e7eb;
                  padding: 1.5rem 2rem;
                  border-radius: 0 0 8px 8px;
                  display: flex;
                  justify-content: flex-end;
                  gap: 1rem;
                }

                .error-container {
                  max-w: 600px;
                  margin: 4rem auto;
                  padding: 0 1.5rem;
                }

                /* Bootstrap component overrides */
                .product-details-page .spinner-border {
                  color: #2563eb;
                  width: 3rem;
                  height: 3rem;
                }

                .product-details-page .alert {
                  border-radius: 6px;
                  border: 1px solid;
                  font-weight: 500;
                }

                .product-details-page .alert-danger {
                  background-color: #fef2f2;
                  border-color: #fecaca;
                  color: #991b1b;
                }

                .product-details-page .alert-info {
                  background-color: #eff6ff;
                  border-color: #bfdbfe;
                  color: #1e40af;
                }
            `}</style>

            <div className="product-container">
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-content">
                            <Spinner animation="border" className="loading-spinner" />
                            <p className="loading-text">Loading product details...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <Message variant="danger">{error}</Message>
                    </div>
                ) : product ? (
                    <>
                        {/* Breadcrumb */}
                        <nav className="breadcrumb-nav" aria-label="breadcrumb">
                            <Link to="/">Home</Link>
                            <span className="breadcrumb-separator">/</span>
                            <Link to="/pets">Pets</Link>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-current">{product.name}</span>
                        </nav>

                        <div className="product-grid">
                            <div className="image-container">
                                {!imageLoaded && <div className="image-skeleton"></div>}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                    onLoad={() => setImageLoaded(true)}
                                    style={{ display: imageLoaded ? 'block' : 'none' }}
                                />
                            </div>

                            <div className="product-info">
                                <div>
                                    <h1 className="product-title">{product.name}</h1>

                                    <div className="price-container">
                                        <span className="price-label">Price</span>
                                        <div className="price">₹{product.price?.toLocaleString()}</div>
                                    </div>

                                    {product.stock > 0 ? (
                                        <div className="stock-badge">
                                            In Stock ({product.stock} available)
                                        </div>
                                    ) : (
                                        <div className="out-of-stock-badge">
                                            Out of Stock
                                        </div>
                                    )}

                                    <p className="description">{product.description}</p>
                                </div>

                                <div className="button-group">
                                    {product.stock > 0 ? (
                                        <>
                                            <Link
                                                to={`${product.id}/checkout/`}
                                                className="btn-primary"
                                            >
                                                Purchase Now
                                            </Link>

                                            {userInfo && userInfo.admin && (
                                                <>
                                                    <button
                                                        className="btn-secondary"
                                                        onClick={() => history.push(`/product-update/${product.id}`)}
                                                        type="button"
                                                    >
                                                        Edit Product
                                                    </button>

                                                    <button
                                                        className="btn-danger"
                                                        onClick={handleShowDeleteModal}
                                                        type="button"
                                                    >
                                                        Delete Product
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <div className="out-of-stock-message">
                                            <p style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: '600' }}>
                                                This item is currently out of stock
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delete confirmation modal */}
                        <Modal
                            show={showDeleteModal}
                            onHide={handleCloseDeleteModal}
                            centered
                            className="product-details-page"
                        >
                            <Modal.Header closeButton className="modal-header">
                                <Modal.Title className="modal-title">
                                    Delete Confirmation
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modal-body">
                                Are you sure you want to delete <strong>"{product.name}"</strong>?
                                <br /><br />
                                This action cannot be undone.
                            </Modal.Body>
                            <Modal.Footer className="modal-footer">
                                <Button
                                    variant="danger"
                                    onClick={confirmDelete}
                                    className="btn-danger"
                                >
                                    Delete Product
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseDeleteModal}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <div className="error-container">
                        <Message variant="info">Product not found.</Message>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailsPage