import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css'; // Import custom styles if needed

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://localhost:8282/vendor/getorders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching orders.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleRequestPayment = async(orderId) => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }
    
                // Send request to update order status
                await axios.get(`http://localhost:8282/vendor/finishorder/${Number(orderId)}`, 
                
                 {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setMessage('Order status updated successfully.');
            } catch (error) {
                console.error('Error updating order status:', error);
                setMessage('Error updating order status.');
            }
        
    };

    const columns = [
        'OrderId', 'QuotationId', 'Customer Name', 'Vendor Name', 'Company', 'Site Address', 'Amount', 'OrderStatus', 'Payment Status','OrderDate','Action'
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="orders">
            <h2>Orders</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.oId}>
                            <td>{order.oId}</td>
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
                                {order.paymentStatus === 'Pending' && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleRequestPayment(order.oId)}
                                    >
                                        Request Payment
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
