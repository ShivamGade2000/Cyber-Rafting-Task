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

                const response = await axios.get('http://localhost:8282/vendor/getVendor', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setMessage('Error fetching profile.');
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
                                {/* Form Group (username) */}
                                {/* <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                    <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={profile.username} readOnly />
                                </div> */}
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (first name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={profile.fName} readOnly />
                                    </div>
                                    {/* Form Group (last name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                        <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={profile.lName} readOnly />
                                    </div>
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (organization name) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
                                        <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value={profile.company} readOnly />
                                    </div>
                                    {/* Form Group (location) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                        <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value={profile.address} readOnly />
                                    </div>
                                </div>
                                {/* Form Group (email address) */}
                                <div className="mb-3">
                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                    <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={profile.email} readOnly />
                                </div>
                                {/* Form Row */}
                                <div className="row gx-3 mb-3">
                                    {/* Form Group (phone number) */}
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value={profile.mobile} readOnly />
                                    </div>
                                    {/* Form Group (birthday) */}
                                    {/* <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                        <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={profile.birthday} readOnly />
                                    </div> */}
                                </div>
                                {/* Save changes button */}
                                {/* <button className="btn btn-primary" type="button">Save changes</button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
