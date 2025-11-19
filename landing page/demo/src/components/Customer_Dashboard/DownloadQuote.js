import React from 'react';

const DownloadQuote = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace this with actual data submission logic
        onSubmit({ /* form data */ });
    };

    return (
        <div className="container py-4">
            <h2 className="mb-3">Download Quote</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for downloading a quote */}
                <button type="submit" className="btn btn-primary mt-3">Download Quote</button>
            </form>
        </div>
    );
};

export default DownloadQuote;
