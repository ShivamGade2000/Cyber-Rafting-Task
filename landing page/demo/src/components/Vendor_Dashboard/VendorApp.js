// import React, { useState, useEffect } from 'react';
// import { Container, Navbar, Nav, Button } from 'react-bootstrap';
// import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
// import Profile from './Profile';
// import Requests from './Requests';
// import Quotations from './Quotations';
// import Orders from './Orders';
// import LogoutButton from './LogoutButton';
// import SendQuoteForm from './SendQuoteForm';
// import './VendorApp.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const VendorApp = () => {
//     const [showSendQuoteForm, setShowSendQuoteForm] = useState(false);
//     const [profile] = useState({
//         firstName: 'John',
//         lastName: 'Doe',
//         mobile: '1234567890',
//         email: 'john.doe@example.com',
//         company: 'Example Co.',
//         address: '123 Main St, Anytown, USA'
//     });
//     const [requests] = useState([
//         {
//             name: 'Jane Smith',
//             email: 'jane.smith@example.com',
//             mobile: '9876543210',
//             propertyType: 'Residential',
//             address: '456 Elm St, Othertown, USA',
//             electricityBill: '$150',
//             electricityConsumption: '350 kWh'
//         }
//     ]);
//     const [quotations] = useState([
//         {
//             name: 'Alice Johnson',
//             email: 'alice.johnson@example.com',
//             mobile: '1231231234',
//             company: 'Tech Solutions',
//             amount: '$5000',
//             deliveryDate: '2024-08-15',
//             quotationPDF: 'path/to/quotation1.pdf'
//         }
//     ]);
//     const [orders] = useState([
//         {
//             orderId: 'ORD123',
//             customerName: 'Bob Brown',
//             orderDate: '2024-07-20',
//             amount: '$1000',
//             status: 'Shipped'
//         }
//     ]);

//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         // Only navigate to the profile page if not already on a specific route
//         if (location.pathname === '/vendor-dashboard') {
//             navigate('/vendor-dashboard/profile');
//         }
//     }, [navigate, location.pathname]);

//     const handleBackClick = () => {
//         setShowSendQuoteForm(false);
//     };

//     const handleSendQuote = (request) => {

//         console.log('Sending quote for:', request);
//         setShowSendQuoteForm(true);
//         navigate('/SendQuoteForm');
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('userType');
//         navigate('/');
//     };

//     return (
//         <div className="d-flex flex-column min-vh-100">
//             <Navbar className="custom-navbar"  expand="lg">
//                 <Container className="d-flex justify-content-between align-items-center">
//                     <Navbar.Brand className="custom-brand" href="#home">Vendor Dashboard</Navbar.Brand>
//                     <Nav>
//                         {showSendQuoteForm ? (
//                             <Button variant="secondary" onClick={handleBackClick} className="me-2">
//                                 Back
//                             </Button>
//                         ) : (
//                             <LogoutButton onLogout={handleLogout} />
//                         )}
//                     </Nav>
//                 </Container>
//             </Navbar>
//             <Container fluid className="d-flex flex-grow-1">
//                 {!showSendQuoteForm && (
//                     <div className="custom-sidebar text-white p-3" style={{ width: '200px' }}>
//                         <Nav className="flex-column">
//                             <Nav.Link as={Link} to="/vendor-dashboard/profile" className="custom-nav-link">Profile</Nav.Link>
//                             <Nav.Link as={Link} to="/vendor-dashboard/requests" className="custom-nav-link">Requests</Nav.Link>
//                             <Nav.Link as={Link} to="/vendor-dashboard/quotations" className="custom-nav-link">Quotations</Nav.Link>
//                             <Nav.Link as={Link} to="/vendor-dashboard/orders" className="custom-nav-link">Orders</Nav.Link>
//                         </Nav>
//                     </div>
//                 )}
//                 <div className="flex-grow-1 p-4">
//                     {showSendQuoteForm ? (
//                         <SendQuoteForm onSubmit={(data) => console.log(data)} />
//                     ) : (
//                         <Routes>
//                             <Route path="profile" element={<Profile profile={profile} />} />
//                             <Route path="requests" element={<Requests requests={requests} onSendQuote={handleSendQuote} />} />
//                             <Route path="quotations" element={<Quotations quotations={quotations} />} />
//                             <Route path="orders" element={<Orders orders={orders} />} />
//                         </Routes>
//                     )}
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default VendorApp;
import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Profile from './Profile';
import Requests from './Requests';
import Quotations from './Quotations';
import Orders from './Orders';
import LogoutButton from './LogoutButton';
import SendQuoteForm from './SendQuoteForm';
import './VendorApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VendorApp = () => {
    const [profile] = useState({
        firstName: 'John',
        lastName: 'Doe',
        mobile: '1234567890',
        email: 'john.doe@example.com',
        company: 'Example Co.',
        address: '123 Main St, Anytown, USA'
    });
    const [requests] = useState([
        {
            id: 1,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            mobile: '9876543210',
            propertyType: 'Residential',
            address: '456 Elm St, Othertown, USA',
            electricityBill: '$150',
            electricityConsumption: '350 kWh'
        }
    ]);
    const [quotations] = useState([
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            mobile: '1231231234',
            company: 'Tech Solutions',
            amount: '$5000',
            deliveryDate: '2024-08-15',
            quotationPDF: 'path/to/quotation1.pdf'
        }
    ]);
    const [orders] = useState([
        {
            orderId: 'ORD123',
            customerName: 'Bob Brown',
            orderDate: '2024-07-20',
            amount: '$1000',
            status: 'Shipped'
        }
    ]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/vendor-dashboard') {
            navigate('/vendor-dashboard/profile');
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        console.log('token');
        localStorage.clear();
        navigate('/', { replace: true });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar className="custom-navbar" expand="lg">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand className="custom-brand" href="#home">Vendor Dashboard</Navbar.Brand>
                    <Nav>
                        <LogoutButton onLogout={handleLogout} />
                    </Nav>
                </Container>
            </Navbar>
            <Container fluid className="d-flex flex-grow-1">
                <div className="custom-sidebar text-white p-3" style={{ width: '200px' }}>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/vendor-dashboard/profile" className="custom-nav-link">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/vendor-dashboard/requests" className="custom-nav-link">Requests</Nav.Link>
                        <Nav.Link as={Link} to="/vendor-dashboard/quotations" className="custom-nav-link">Quotations</Nav.Link>
                        <Nav.Link as={Link} to="/vendor-dashboard/orders" className="custom-nav-link">Orders</Nav.Link>
                    </Nav>
                </div>
                <div className="flex-grow-1 p-4">
                    <Routes>
                        <Route path="profile" element={<Profile profile={profile} />} />
                        <Route path="requests" element={<Requests />} />
                        <Route path="quotations" element={<Quotations quotations={quotations} />} />
                        <Route path="orders" element={<Orders orders={orders} />} />
                        <Route path="send-quote-form/requestId" element={<SendQuoteForm />} />
                    </Routes>
                </div>
            </Container>
        </div>
    );
};

export default VendorApp;
