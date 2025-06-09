import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Modal, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import { deleteUserAddress, getAllAddress, checkTokenValidation, logout } from '../actions/userActions';
import { DELETE_USER_ADDRESS_RESET, GET_SINGLE_ADDRESS_RESET } from '../constants';
import { useHistory } from 'react-router-dom';
import CreateAddressComponent from '../components/CreateAddressComponent';

function AllAddressesOfUserPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [deleteAddress, setDeleteAddress] = useState({});
    const [createAddress, setCreateAddress] = useState(false);
    const [show, setShow] = useState(false);

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer);
    const { error: tokenError } = checkTokenValidationReducer;

    const userLoginReducer = useSelector(state => state.userLoginReducer);
    const { userInfo } = userLoginReducer;

    const getAllAddressesOfUserReducer = useSelector(state => state.getAllAddressesOfUserReducer);
    const { addresses, loading: loadingAllAddresses } = getAllAddressesOfUserReducer;

    const deleteUserAddressReducer = useSelector(state => state.deleteUserAddressReducer);
    const { success: addressDeletionSuccess } = deleteUserAddressReducer;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            dispatch(checkTokenValidation());
            dispatch(getAllAddress());
            dispatch({ type: GET_SINGLE_ADDRESS_RESET });
        }
    }, [dispatch, history, userInfo, addressDeletionSuccess]);

    useEffect(() => {
        if (userInfo && tokenError === "Request failed with status code 401") {
            alert("Session expired, please login again.");
            dispatch(logout());
            history.push("/login");
            window.location.reload();
        }
        // eslint-disable-next-line
    }, [tokenError, userInfo]);

    useEffect(() => {
        if (addressDeletionSuccess) {
            alert("Address successfully deleted.");
            dispatch({ type: DELETE_USER_ADDRESS_RESET });
            dispatch(getAllAddress());
        }
        // eslint-disable-next-line
    }, [addressDeletionSuccess]);

    const deleteAddressHandler = (address) => {
        setDeleteAddress(address);
        setShow(true);
    };

    const confirmDelete = (id) => {
        dispatch(deleteUserAddress(id));
        setShow(false);
    };

    const toggleCreateAddress = () => {
        setCreateAddress(!createAddress);
    };

    return (
        <div className="address-bg">
            {/* Inline CSS for the page */}
            <style>{`
        .address-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%);
          padding: 2rem 0;
        }
        .address-container {
          max-width: 700px;
          margin: auto;
        }
        .address-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1d3557;
          margin-bottom: 2rem;
          text-align: center;
          letter-spacing: 1px;
        }
        .address-card {
          border: none;
          border-radius: 1rem;
          background: #fff;
          box-shadow: 0 4px 24px 0 rgba(30, 64, 175, 0.07);
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          transition: box-shadow 0.2s;
        }
        .address-card:hover {
          box-shadow: 0 8px 32px 0 rgba(30, 64, 175, 0.13);
        }
        .address-actions {
          margin-top: 1rem;
          display: flex;
          gap: 1.5rem;
        }
        .delete-btn, .edit-btn {
          cursor: pointer;
          font-size: 1.25rem;
          transition: color 0.2s, transform 0.1s;
        }
        .delete-btn {
          color: #e63946;
        }
        .delete-btn:hover {
          color: #b91c1c;
          transform: scale(1.1);
        }
        .edit-btn {
          color: #2563eb;
        }
        .edit-btn:hover {
          color: #1d3557;
          transform: scale(1.1);
        }
        .add-address-btn {
          background: linear-gradient(90deg, #2563eb 0%, #1d3557 100%);
          border: none;
          border-radius: 0.7rem;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 0.7rem 1.5rem;
          margin-bottom: 2rem;
          color: #fff;
          transition: background 0.2s, transform 0.1s;
        }
        .add-address-btn:hover, .add-address-btn:focus {
          background: linear-gradient(90deg, #1d3557 0%, #2563eb 100%);
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>

            {/* Delete Confirmation Modal */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fas fa-exclamation-triangle text-warning me-2"></i>
                        Delete Address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this address?
                    <br />
                    <strong>
                        {deleteAddress.house_no}, {deleteAddress.city}, {deleteAddress.state}
                    </strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => confirmDelete(deleteAddress.id)}>
                        Confirm Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container className="address-container">
                <div className="address-title">Your Saved Addresses</div>

                {loadingAllAddresses && (
                    <div className="d-flex align-items-center mb-3">
                        <h5 className="me-3 mb-0">Getting addresses</h5>
                        <Spinner animation="border" />
                    </div>
                )}

                {createAddress ? (
                    <CreateAddressComponent toggleCreateAddress={toggleCreateAddress} />
                ) : (
                    <Button className="add-address-btn" onClick={toggleCreateAddress}>
                        <i className="fas fa-plus me-2"></i>Add New Address
                    </Button>
                )}

                {!createAddress && addresses && addresses.length === 0 && (
                    <Card className="address-card mb-3">
                        <div className="text-center py-3">
                            <i className="fas fa-map-marker-alt fa-2x mb-2 text-secondary"></i>
                            <div>No addresses found. Add your first address!</div>
                        </div>
                    </Card>
                )}

                {!createAddress && addresses && addresses.map((address, idx) => (
                    <Card className="address-card mb-4" key={idx}>
                        <Row>
                            <Col md={9}>
                                <div>
                                    <strong>Name:</strong> {address.name}
                                </div>
                                <div>
                                    <strong>Phone:</strong> +91 {address.phone_number}
                                </div>
                                <div>
                                    <strong>Address:</strong> {address.house_no}, {address.landmark && <>near {address.landmark}, </>}{address.city}, {address.state}, {address.pin_code}
                                </div>
                            </Col>
                            <Col md={3} className="address-actions align-items-end d-flex justify-content-end">
                                <span
                                    className="delete-btn"
                                    title="Delete Address"
                                    onClick={() => deleteAddressHandler(address)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                                <span
                                    className="edit-btn"
                                    title="Edit Address"
                                    onClick={() => history.push(`/all-addresses/${address.id}/`)}
                                >
                                    <i className="fas fa-edit"></i>
                                </span>
                            </Col>
                        </Row>
                    </Card>
                ))}
            </Container>
        </div>
    );
}

export default AllAddressesOfUserPage;
