import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Add axios for API calls



const PlaceOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { quotationID } =useParams();
    const QuotationID = Number(quotationID);
    console.log('Quotation ID from params:', QuotationID);
    const { quotation } = location.state || {}; // Extract quotation from location.state
    console.log('Received quotation:', quotation);
    const [isConfirming, setIsConfirming] = useState(true);

    
    const handleConfirm = async () => {
        try {
            console.log('Quotation ID from params:', QuotationID);
            console.log(quotation?.qId);
            // Ensure that quotation id is available and valid
            if (!quotation?.qId) {
                console.error('Invalid quotation ID');
                return;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await axios.get(`http://localhost:8282/customer/placeorder/${Number(quotation.qId)}`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/customer-dashboard/orders')
            console.log('Order placed:', response.data);
            setIsConfirming(false); // Update state to show success message
        } catch (error) {
            console.error('Error placing order:', error);
            // Handle error appropriately
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="container py-4">
            <div className="card border-primary">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Place Order</h2>
                </div>
                <div className="card-body">
                    {isConfirming ? (
                        <div>
                            <p className="lead">Are you sure you want to place the order !!</p>
                            {/* <ul>
                                <li><strong>Quotation ID:</strong> {quotation?.qId}</li>
                                <li><strong>Customer Name:</strong> {quotation?.customer.firstName}</li>
                                <li><strong>Vendor Name:</strong> {quotation?.vendor.fName}</li>
                                <li><strong>Company:</strong> {quotation?.vendor.company}</li>
                                <li><strong>Site Address:</strong> {quotation?.vendor.address}</li>
                                <li><strong>Amount:</strong> {quotation?.price}</li>
                            </ul> */}
                            <div className="d-flex justify-content-between mt-3">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleConfirm}
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="lead">Your order has been successfully placed!</p>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => navigate('/')}
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
