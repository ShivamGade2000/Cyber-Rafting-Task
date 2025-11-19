// src/Registration.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();

  return (
    <div className="container p-3" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h5 className="text-center mb-3">Choose Registration Type</h5>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={() => navigate('/custRegistration')}>
          Customer Registration
        </button>
        <button
          className="btn btn-secondary btn-sm"
          type="button"
          onClick={() => navigate('/VendorRegistration')}>
          Vendor Registration
        </button>
      </div>
    </div>
  );
}

export default Registration;
