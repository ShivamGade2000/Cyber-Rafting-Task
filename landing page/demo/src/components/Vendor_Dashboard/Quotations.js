import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotations.css';

const QuotationsPage = () => {
    const [quotations, setQuotations] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://localhost:8282/vendor/getquotes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('API Response:', response.data);

                if (response.data && response.data.length > 0) {
                    setQuotations(response.data);
                } else {
                    setMessage('No quotations available.');
                }
            } catch (error) {
                console.error('Error fetching quotations:', error);
                setMessage('Error fetching quotations.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuotations();
    }, []);

    const handleDelete = async (quotationId) => {
        try {
            console.log('Quotation ID to delete:', quotationId);
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found, please log in again.');
            }

            if (!quotationId || isNaN(quotationId)) {
                console.error('Invalid quotationId:', quotationId);
                setMessage('Invalid quotation ID.');
                return;
            }

             // Confirm before deletion
            //  const isConfirmed = window.confirm('Are you sure you want to delete this request?');
            //  if (!isConfirmed) {
            //      return; // Exit if the user cancels the deletion
            //  }

            await axios.get(`http://localhost:8282/vendor/deletequote/${Number(quotationId)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update state by filtering out the deleted quotation
            setQuotations((prevQuotations) => prevQuotations.filter((q) => q.qId !== quotationId));
        } catch (error) {
            console.error('Error deleting quotation:', error);
            setMessage('Error deleting quotation.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (message) {
        return <div>{message}</div>;
    }

    if (!quotations.length) {
        return <div>No quotations available.</div>;
    }

    const columns = [
        'Name', 'Email', 'Mobile', 'Company', 'Amount', 'Delivery Date', 'Actions'
    ];

    return (
        <div className="container-xl px-4 mt-4">
            <h2>Quotations</h2>
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
                            <td>{quotation.customer.firstName} {quotation.customer.lastName}</td>
                            <td>{quotation.customer.email}</td>
                            <td>{quotation.customer.mobile}</td>
                            <td>{quotation.vendor.company}</td>
                            <td>{quotation.price}</td>
                            <td>{quotation.deliverydate}</td>
                            <td>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(quotation.qId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotationsPage;
