import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './registrationForm.css'; 

function CustomerRegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

   
    // First name validation: must be provided, contain only letters and spaces
    if (!firstName) {
      errors.firstName = 'First name is required';
  } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      errors.firstName = 'First name should contain only letters and spaces';
  }

  // Last name validation: must be provided, contain only letters and spaces
  if (!lastName) {
      errors.lastName = 'Last name is required';
  } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      errors.lastName = 'Last name should contain only letters and spaces';
  }

    // Mobile number validation: must be exactly 10 digits and cannot be all zeros
    if (!mobile) {
        errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile)) {
        errors.mobile = 'Mobile number must be exactly 10 digits and contain only numbers';
    } else if (/^0{10}$/.test(mobile)) {
        errors.mobile = 'Mobile number cannot be all zeros';
    }

    // Email validation: must follow a standard email format
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = 'Invalid email address';
    }

    // City validation: only letters allowed
    if (!city) {
        errors.city = 'City is required';
    } else if (!/^[a-zA-Z\s]+$/.test(city)) {
        errors.city = 'City name should contain only letters';
    }

    // Pincode validation: must be exactly 6 digits and contain only numbers
    if (!pincode) {
        errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(pincode)) {
        errors.pincode = 'Pincode must be exactly 6 digits and contain only numbers';
    }

    // Password validation: minimum 8 characters
    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation: must match the password
    if (!confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const response = await axios.post('http://localhost:8282/csubmit', {
          firstName,
          lastName,
          mobile,
          email,
          city,
          pincode,
          password
        });
        setSuccess('Registration Successful !!');
        
        navigate('/loginform'); // Redirect after successful submission
        console.log(response.data); // Handle success response
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        // Handle error response
      }
    }
  };
  
  return (
    <section className="gradient-custom">
      <div className="container py-5 h-150 ">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Customer Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control form-control-lg"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        
                        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control form-control-lg"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        
                        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="mobile">Mobile</label>
                        <input
                          type="tel"
                          id="mobile"
                          className="form-control form-control-lg"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                       
                        {errors.mobile && <div style={{ color: 'red' }}>{errors.mobile}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          className="form-control form-control-lg"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        
                        {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="pincode">Pincode</label>
                        <input
                          type="text"
                          id="pincode"
                          className="form-control form-control-lg"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                        
                        {errors.pincode && <div style={{ color: 'red' }}>{errors.pincode}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control form-control-lg"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        
                        {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <input
                      data-mdb-ripple-init
                      className="btn btn-primary btn-lg"
                      type="submit"
                      value="Submit"
                    />
                    {success && <div style={{ color: 'green' }}>{success}</div>}
                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerRegistrationForm;
