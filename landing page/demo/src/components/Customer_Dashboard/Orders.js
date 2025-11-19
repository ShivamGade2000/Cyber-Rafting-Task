// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('No token found, please log in again.');
//                 }

//                 const response = await axios.get('http://localhost:8282/customer/getorders', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 setOrders(response.data);
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//                 setMessage('Error fetching orders.');
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleCompletePayment = async (oid) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found, please log in again.');
//             }

//             // Send request to update order status
//             await axios.get(`http://localhost:8282/customer/completepayment/${Number(oid)}`, 
            
//              {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             setMessage('Order status updated successfully.');
//         } catch (error) {
//             console.error('Error updating order status:', error);
//             setMessage('Error updating order status.');
//         }
//     };

//     return (
//         <div className="container-xl px-4 mt-4">
//             <div className="card mb-4">
//                 <div className="card-body">
//                     <h2>Orders</h2>
//                     {message && (
//                         <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} alert-dismissible`} role="alert">
//                             {message}
//                             <button type="button" className="btn-close" aria-label="Close" onClick={() => setMessage('')}></button>
//                         </div>
//                     )}
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>Quotation ID</th>
//                                 <th>Customer Name</th>
//                                 <th>Vendor Name</th>
//                                 <th>Company</th>
//                                 <th>Site Address</th>
//                                 <th>Amount</th>
//                                 <th>Order Status</th>
//                                 <th>Payment Status</th>
//                                 <th>Order Date</th>
//                                 <th>Action</th> {/* New column for actions */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                           {orders.map((order) => (
//                             <tr key={order.oId}>
//                                 <td>{order.quotation.qId}</td><td>{order.customer.firstName} {order.customer.lastName}</td>
//                                 <td>{order.vendor.fName} {order.vendor.lName}</td>
//                                 <td>{order.quotation.vendor.company}</td>
//                                 <td>{order.quotation.vendor.address}</td>
//                                 <td>{order.quotation.price}</td>
//                                 <td>{order.orderStatus}</td>
//                                 <td>{order.paymentStatus}</td>
//                                 <td>{order.orderDate}</td>
//                                 <td>
//     {(order.paymentStatus === 'Pending' || (order.paymentStatus === 'Requested')) && (
//         <button
//             className="btn btn-primary"
//             onClick={() => handleCompletePayment(order.oId)}
//         >
//             Complete Payment
//         </button>
//     )}
// </td>

//                              </tr>
//                             ))}
//                         </tbody>

//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Orders;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cvv: '',
        expiryDate: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://localhost:8282/customer/getorders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setMessage('Error fetching orders.');
            }
        };

        fetchOrders();
    }, []);

    const handleCompletePayment = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setPaymentDetails({
            cardNumber: '',
            cvv: '',
            expiryDate: ''
        });
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validatePaymentDetails = () => {
        const errors = {};
        const { cardNumber, cvv, expiryDate } = paymentDetails;

        if (!/^\d{16}$/.test(cardNumber)) {
            errors.cardNumber = 'Credit card number must be exactly 16 digits';
        }

        if (!/^\d{3}$/.test(cvv)) {
            errors.cvv = 'CVV must be exactly 3 digits';
        }

        // Validate expiry date format
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        errors.expiryDate = 'Expiry date must be in MM/YY format';
    } else {
        // Extract month and year from the expiry date
        const [month, year] = expiryDate.split('/').map(Number);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-based month

        // Get the current year and month
        const currentYearShort = currentYear % 100; // Last two digits of the current year

        // Check if the expiry date is in the past
        if (year < currentYearShort || (year === currentYearShort && month < currentMonth)) {
            errors.expiryDate = 'Expiry date cannot be in the past';
        }
    }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePaymentDetails()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found, please log in again.');
            }

            // Dummy API call (not actually sending payment details)
            await axios.get(`http://localhost:8282/customer/completepayment/${Number(selectedOrder.oId)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setMessage('Order status updated successfully.');
            handleModalClose();
        } catch (error) {
            console.error('Error updating order status:', error);
            setMessage('Error updating order status.');
        }
    };

    return (
        <div className="container-xl px-4 mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h2>Orders</h2>
                    {message && (
                        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} alert-dismissible`} role="alert">
                            {message}
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setMessage('')}></button>
                        </div>
                    )}
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Quotation ID</th>
                                <th>Customer Name</th>
                                <th>Vendor Name</th>
                                <th>Company</th>
                                <th>Site Address</th>
                                <th>Amount</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Order Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.oId}>
                                    <td>{order.quotation.qId}</td>
                                    <td>{order.customer.firstName} {order.customer.lastName}</td>
                                    <td>{order.vendor.fName} {order.vendor.lName}</td>
                                    <td>{order.quotation.vendor.company}</td>
                                    <td>{order.quotation.vendor.address}</td>
                                    <td>{order.quotation.price}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>{order.orderDate}</td>
                                    <td>
                                        {(order.paymentStatus === 'Pending' || order.paymentStatus === 'Requested') && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleCompletePayment(order)}
                                            >
                                                Complete Payment
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Payment Details */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Complete Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCardNumber">
                            <Form.Label>Credit Card Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.cardNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cardNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.cvv}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cvv}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formExpiryDate">
                            <Form.Label>Expiry Date (MM/YY)</Form.Label>
                            <Form.Control
                                type="text"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={handleInputChange}
                                isInvalid={!!formErrors.expiryDate}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.expiryDate}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Orders;
