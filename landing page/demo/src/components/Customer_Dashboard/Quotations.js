import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [
    'Name', 'Email', 'Mobile', 'Company', 'Amount', 'Delivery Date',  'Actions'
];

const Quotations = () => {
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://localhost:8282/customer/getquotes', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setQuotations(response.data);
            } catch (error) {
                console.error('Error fetching quotations:', error);
                setMessage('Error fetching quotations.');
            }
        };

        fetchQuotations();
    }, []);

    const handlePlaceOrder = (quotation) => {
        if (!quotation || !quotation.qId) {
            console.error('Invalid quotation object:', quotation);
            return;
        }
        console.log('Navigating to place order with quotationID:', quotation.qId);
        console.log('Navigating to place order with quotation:', quotation);
        navigate(`/place-order/${Number(quotation.qId)}`, { state: { quotation } });
    };
    
    
    

    

    return (
        <div className="container py-4">
            <h2 className="mb-4">Quotations</h2>
            {message && (
                <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} alert-dismissible`} role="alert">
                    {message}
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setMessage('')}></button>
                </div>
            )}
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {quotations.map((quotation) => (
                        <tr key={quotation.qId}>
                            <td>{quotation.vendor.fName || 'N/A'}</td>
                            <td>{quotation.vendor.email || 'N/A'}</td>
                            <td>{quotation.vendor.mobile || 'N/A'}</td>
                            <td>{quotation.vendor.company || 'N/A'}</td>
                            <td>{quotation.price || 'N/A'}</td>
                            <td>{quotation.deliverydate || 'N/A'}</td>
                            <td>
                                <button 
                                    className="btn btn-primary me-2" 
                                    onClick={() => handlePlaceOrder(quotation)}
                                >
                                    Place Order
                                </button>
                                {/* <button 
                                    className="btn btn-success" 
                                    onClick={() => handleDownloadQuote(row)}
                                >
                                    Download Quote
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Quotations;
