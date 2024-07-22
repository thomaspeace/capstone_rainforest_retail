import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './styles/OrderList.css';  // Import the external stylesheet

const OrderList = ({ orders }) => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    const newSortedOrders = [...orders].sort((a, b) => {
      const aValue = a[sortField] ?? '';
      const bValue = b[sortField] ?? '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc'
          ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
          : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
      }
    });

    setSortedOrders(newSortedOrders);
  }, [orders, sortField, sortDirection]);

  const handleSort = (field) => {
    setSortDirection(field === sortField && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <div className='order-list'>
        <Navbar className="order-list-navbar">
          <Nav className="order-list-nav">
            <Navbar.Text className="order-list-nav-item">
              <strong>Order ID</strong>
              <Button variant="link" onClick={() => handleSort('id')} className='order-list-navbar-button'>
                {sortField === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </Button>
            </Navbar.Text>
            <Navbar.Text className="order-list-nav-item">
              <strong>Delivery Date</strong>
              <Button variant="link" onClick={() => handleSort('dateToDeliver')} className='order-list-navbar-button'>
                {sortField === 'dateToDeliver' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </Button>
            </Navbar.Text>
            <Navbar.Text className="order-list-nav-item">
              <strong>Status</strong>
              <Button variant="link" onClick={() => handleSort('deliveryStatus')} className='order-list-navbar-button'>
                {sortField === 'deliveryStatus' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </Button>
            </Navbar.Text>
          </Nav>
        </Navbar>

        <Row>
          {sortedOrders.map((order) => (
            <Col key={order.id} xs={12} sm={6} md={4} className="order-list-col">
              <Card className="order-list-card">
                <Card.Body>
                  <Card.Title className="order-list-card-title">Order ID: {order.id}</Card.Title>
                  <Card.Subtitle className="order-list-card-subtitle text-muted mb-1">
                    Delivery Date: {formatDate(order.dateToDeliver)}
                  </Card.Subtitle>
                  <Card.Subtitle className="order-list-card-subtitle text-muted mb-2">
                    Status: {order.deliveryStatus || 'N/A'}
                  </Card.Subtitle>
                  <div className="order-list-card-button-container">
                    <Link to={`/orders/${order.id}`}>
                      <Button className='button'>View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default OrderList;



// const OrderList = ({ orders }) => {
//   const [sortField, setSortField] = useState('id');
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [sortedOrders, setSortedOrders] = useState([]);

//   // Use useEffect to update sortedOrders when orders, sortField, or sortDirection change
//   useEffect(() => {
//     // Create a new sorted array without mutating the original orders
//     const newSortedOrders = [...orders].sort((a, b) => {
//       // Handle potential missing data by using nullish coalescing operator
//       const aValue = a[sortField] ?? '';
//       const bValue = b[sortField] ?? '';

//       // Compare values based on their types
//       if (typeof aValue === 'string' && typeof bValue === 'string') {
//         return sortDirection === 'asc' 
//           ? aValue.localeCompare(bValue) 
//           : bValue.localeCompare(aValue);
//       } else {
//         return sortDirection === 'asc' 
//           ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
//           : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
//       }
//     });

//     setSortedOrders(newSortedOrders);
//   }, [orders, sortField, sortDirection]);

//   const handleSort = (field) => {
//     setSortDirection(field === sortField && sortDirection === 'asc' ? 'desc' : 'asc');
//     setSortField(field);
//   };

//   // Helper function to format date strings
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className="order-list">
//       <h2>Order List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>
//               ID 
//               <button onClick={() => handleSort('id')}>
//                 {sortField === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
//               </button>
//             </th>
//             <th>
//               Delivery Date 
//               <button onClick={() => handleSort('dateToDeliver')}>
//                 {sortField === 'dateToDeliver' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
//               </button>
//             </th>
//             <th>
//               Status 
//               <button onClick={() => handleSort('deliveryStatus')}>
//                 {sortField === 'deliveryStatus' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
//               </button>
//             </th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedOrders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               {/* Use formatDate helper function to display the date */}
//               <td>{formatDate(order.dateToDeliver)}</td>
//               {/* Display delivery status, fallback to 'N/A' if not available */}
//               <td>{order.deliveryStatus || 'N/A'}</td>
//               <td>
//                 <Link to={`/orders/${order.id}`}>View Details</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderList;