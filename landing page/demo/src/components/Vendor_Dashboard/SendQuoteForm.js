import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SendQuoteForm = () => {
    const navigate = useNavigate();
    const { requestId } = useParams(); // Get requestId from URL parameters
    const [formData, setFormData] = useState({
        price: '',
        deliveryDate: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        
        // Price validation
        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
        }
    
        // Delivery date validation
        if (!formData.deliveryDate) {
            newErrors.deliveryDate = 'Delivery date is required';
        } else {
            const currentDate = new Date();
            const deliveryDate = new Date(formData.deliveryDate);
    
            // Set the time of both dates to midnight to ignore time differences
            currentDate.setHours(0, 0, 0, 0);
            deliveryDate.setHours(0, 0, 0, 0);
    
            if (deliveryDate < currentDate) {
                newErrors.deliveryDate = 'Delivery date cannot be in the past';
            }
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            if (!requestId) {
                console.error('No requestId provided');
                return;
            }

            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`http://localhost:8282/vendor/submitquote/${Number(requestId)}`, {
                    price: formData.price,
                    deliverydate: formData.deliveryDate
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                // Handle success
                setSuccess('Quote submitted successfully!');
                navigate(-1);
                console.log('Response:', response);
            } catch (error) {
                console.error('Error submitting quote:', error);
                setErrors({ ...errors, server: 'Error submitting quote.' });
            }
        }
    };
    // const formatDate = (date) => {
    //     const d = new Date(date);
    //     const day = String(d.getDate()).padStart(2, '0');
    //     const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    //     const year = d.getFullYear();
    //     return `${day}-${month}-${year}`;
    // };

    return (
        <div className="container-xl px-4 mt-4">
            <div className="card border-primary">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Send Quote</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {success && <div className="alert alert-success">{success}</div>}
                        {errors.server && <div className="alert alert-danger">{errors.server}</div>}
                        
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input 
                                type="number" 
                                id="price" 
                                name="price" 
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`} 
                                value={formData.price}
                                onChange={handleChange} 
                                required 
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                            <input 
                                type="date" 
                                id="deliveryDate" 
                                name="deliveryDate" 
                                className={`form-control ${errors.deliveryDate ? 'is-invalid' : ''}`} 
                                value={formData.deliveryDate}
                                onChange={handleChange} 
                                required 
                            />
                            {errors.deliveryDate && <div className="invalid-feedback">{errors.deliveryDate}</div>}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => window.history.back()} // Navigate back to the previous page
                            >
                                Back
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendQuoteForm;
