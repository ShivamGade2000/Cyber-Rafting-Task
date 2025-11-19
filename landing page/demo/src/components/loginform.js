import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginForm.css';


function Loginform({ setUserType }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
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
        // Send login request to the backend
        const response = await axios.post('http://localhost:8282/login', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',  // Ensure this header is set
          },
        });
        
        
        console.log('data fetched');

        // Extract the token and role from the response
       // const { token, role } = response.data;
      //  if (!token || !role) {
      //   throw new Error('Login failed: Token or role missing in response');
      //   }

      console.log('data fetched');
       
        // Save the token to localStorage or sessionStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        if (!localStorage.getItem("token") || !localStorage.getItem("role")) {
          throw new Error('Login failed: Token or role missing in response');
        }

        console.log('data fetched');

        console.log('data fetched');
        //console.log({role});
        setUserType(localStorage.getItem("role"));
        if (localStorage.getItem("role") === 'vendor') {
          navigate('/vendor-dashboard');
        } else if (localStorage.getItem("role") === 'customer') {
          navigate('/customer-dashboard');
        } else {
          navigate('/'); 
        }

      } catch (error) {
        setErrors({ form: 'Invalid email or password' });
      }
  
      console.log({
        email,
        password
      });
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (!forgotPasswordEmail) {
      setErrors({ forgotPasswordEmail: 'Email is required' });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(forgotPasswordEmail)) {
      setErrors({ forgotPasswordEmail: 'Invalid email address' });
    } else {
      // Send forgot password email to the server
      try {
        await axios.post('http://your-api-url.com/forgot-password', { email: forgotPasswordEmail });
        console.log('Forgot password email sent:', forgotPasswordEmail);
        setForgotPassword(false); // Close the modal after sending the email
      } catch (error) {
        setErrors({ forgotPasswordEmail: 'Failed to send email. Please try again.' });
      }
    }
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    navigate('/Registration');
  };

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="solarLogo.webp" style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The SunriseSolar Team</h4>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <p>Please login to your account</p>
                        <label className="form-label" htmlFor="form2Example11">Email</label>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Username"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                         
                          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                        </div>
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">Password</label>
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                          />
                          
                          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log in</button>
                          {/* <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => setForgotPassword(true)}
                          >
                            Forgot Password?
                          </button> */}
                          {errors.form && <div style={{ color: 'red' }}>{errors.form}</div>}
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger" onClick={handleCreateNew}>Create new</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Embrace the Power of the Sun: The Future of Energy</h4>
                      <p className="small mb-0 text-white">Imagine a world where energy is clean, abundant, and sourced directly from the sun. 
                        Solar energy isn't just a vision of the future; it's a powerful, renewable resource transforming our world today.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {forgotPassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Forgot Password</h5>
              <button type="button" className="close" onClick={() => setForgotPassword(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleForgotPassword}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    value={forgotPasswordEmail}
                    onChange={(event) => setForgotPasswordEmail(event.target.value)}
                    placeholder="Enter email"
                  />
                  <label className="form-label">Enter your email</label>
                  {errors.forgotPasswordEmail && (
                    <div style={{ color: 'red' }}>{errors.forgotPasswordEmail}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">Send Forgot Password Email</button>
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={() => setForgotPassword(false)}
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loginform;
