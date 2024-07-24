import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Navbar, Nav, Modal, Dropdown } from 'react-bootstrap';
import './styles/OrderList.css'; // Import the external stylesheet

const OrderList = ({ orders }) => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedOrders, setSortedOrders] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('All'); // State for selected region
  const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered orders

  useEffect(() => {
    const newSortedOrders = [...orders].sort((a, b) => {
      const aValue = a[sortField] ?? ''; // returns an empty string if order id is null
      const bValue = b[sortField] ?? ''; // returns an empty string if odrer id is null


      // this is the sorting logic
      // check if they're strings, since strings are sorted differently to number s
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          // return -1 if a comes before b alphabetically
          // return 1 if a comes after b alphabetically
          // return 0 if a is equals b alphabetically
          ? aValue.localeCompare(bValue) // locale coompare takes into account case sensitvity
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc'
                // if a is less than b, return -1, which means a is before b
                // if a is greater than b, retirn 1, meaning a comes after b
                // 0 if equal i.e. order remains unchanged
          ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
          : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
      }
    });

    setSortedOrders(newSortedOrders);
  }, [orders, sortField, sortDirection]);

  useEffect(() => {
    // Filter orders by selected region
    if (selectedRegion === 'All') {
      setFilteredOrders(sortedOrders);
    } else {
      setFilteredOrders(
        sortedOrders.filter(order => order.regionalHub.region === selectedRegion)
      );
    }
  }, [sortedOrders, selectedRegion]);

  const handleSort = (field) => {
    setSortDirection(field === sortField && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  // Get unique regions for the dropdown
  const regions = Array.from(new Set(orders.map(order => order.regionalHub.region)));

  return (
    <Container>
      <div className='order-list'>
        <h2 className='order-list-title'>Order List</h2>
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
              <Button variant="link" id="goes-down" onClick={() => handleSort('deliveryStatus')} className='order-list-navbar-button'>
                {sortField === 'deliveryStatus' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </Button>
            </Navbar.Text>
            <Navbar.Text className="order-list-nav-item">
              <Dropdown>
                <Dropdown.Toggle className="order-list-dropdown" id='goes-down-2'>
                  Filter by Region
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleRegionSelect('All')}>All</Dropdown.Item>
                  {regions.map((region, index) => (
                    <Dropdown.Item key={index} onClick={() => handleRegionSelect(region)}>
                      {region}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Text>
          </Nav>
        </Navbar>

        <Row>
          {filteredOrders.map((order) => (
            <Col key={order.id} xs={12} sm={6} md={4} className="order-list-col">
              <Card className="order-list-card">
                <Card.Body>
                  <Card.Title className="order-list-card-title">Order ID: {order.id}</Card.Title>
                  <Card.Subtitle className="order-list-card-subtitle text-muted mb-2">
                    Delivery Date: {formatDate(order.dateToDeliver)}
                  </Card.Subtitle>
                  <Card.Subtitle className="order-list-card-subtitle text-muted mb-2">
                    Status: {order.deliveryStatus || 'N/A'}
                  </Card.Subtitle>
                  <div className="order-list-card-button-container">
                    <Button className='button' onClick={() => handleViewDetails(order)}>View Details</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Delivery Date:</strong> {formatDate(selectedOrder.dateToDeliver)}</p>
              <p><strong>Status:</strong> {selectedOrder.deliveryStatus || 'N/A'}</p>
              <p><strong>Regional Hub: </strong> {selectedOrder.regionalHub.region}</p>
              <p className='mt-5'><strong>Delivery Address:</strong></p>
              <p className='mx-4'>{selectedOrder.deliveryAddress.line}</p>
              <p className='mx-4'>{selectedOrder.deliveryAddress.postcode}</p>
              <p className='mx-4'>Latitude: {selectedOrder.deliveryAddress.latitude}</p>
              <p className='mx-4'>Longitude: {selectedOrder.deliveryAddress.longitude}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OrderList;





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Card, Button, Container, Row, Col, Navbar, Nav, Modal } from 'react-bootstrap';
// import './styles/OrderList.css';  // Import the external stylesheet

// const OrderList = ({ orders }) => {
//   const [sortField, setSortField] = useState('id');
//   const [sortDirection, setSortDirection] = useState('asc');
//   const [sortedOrders, setSortedOrders] = useState([]);
//   const [modalShow, setModalShow] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);


//   useEffect(() => {
//     const newSortedOrders = [...orders].sort((a, b) => {
//       const aValue = a[sortField] ?? '';
//       const bValue = b[sortField] ?? '';

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

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
