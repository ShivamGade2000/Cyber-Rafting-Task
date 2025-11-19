import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please log in again.');
                }

                const response = await axios.get('http://localhost:8282/customer/getcustomer', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                console.log('Fetched profile data:', response.data);

                const customerData = response.data;

                // Assuming these are the fields in your Customer object
                const profileData = {
                    firstName: customerData.firstName || 'John',
                    lastName: customerData.lastName || 'Doe',
                    mobile: customerData.mobile || '1234567890',
                    email: customerData.email || 'john.doe@example.com',
                    city: customerData.city || 'New York',
                    pincode: customerData.pincode || '10001'
                };

                setProfile(profileData);

            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, []); 

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-xl px-4 mt-4">
            {/* Account page navigation */}
            <nav className="nav nav-borders">
                <a className="nav-link active ms-0" href="#profile">Profile</a>
            </nav>
            <hr className="mt-0 mb-4" />
            <div className="row">
                <div className="col-xl-4">
                    {/* Profile picture card */}
                    <div className="card mb-4 mb-xl-0">
                        <div className="card-body text-center">
                            {/* Profile picture image */}
                            <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            {/* Profile picture help block */}
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    {/* Account details card */}
                    <div className="card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form>
                                {/* Form Group (first name) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                                    <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={profile.firstName} readOnly />
                                </div>
                                {/* Form Group (last name) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                    <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={profile.lastName} readOnly />
                                </div>
                                {/* Form Group (phone number) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputPhone">Phone Number</label>
                                    <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={profile.mobile} readOnly />
                                </div>
                                {/* Form Group (email address) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email Address</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={profile.email} readOnly />
                                </div>
                                {/* Form Group (organization name) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputCompanyName">City</label>
                                    <input className="form-control" id="inputCompanyName" type="text" placeholder="Enter your company name" value={profile.city} readOnly />
                                </div>
                                {/* Form Group (address) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputAddress">Pincode</label>
                                    <input className="form-control" id="inputAddress" type="text" placeholder="Enter your address" value={profile.pincode} readOnly />
                                </div>
                                {/* Save changes button */}
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
