import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import './styles/VanList.css';

const VanList = ({ vans }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedVans, setSortedVans] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All'); // State for selected region
  const [filteredVans, setFilteredVans] = useState([]); // State for filtered vans

  useEffect(() => {
    const newSortedVans = [...vans].sort((a, b) => {
      const aValue = a.id ?? '';  // returns an empty string if van id is null
      const bValue = b.id ?? '';  // returns an empty string if van id is null

      return sortDirection === 'asc'
        // if a is less than b, return -1, which means a is before b
        // if a is greater than b, retirn 1, meaning a comes after b
        // 0 if equal
        ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
        : (bValue < aValue ? -1 : bValue > aValue ? 1 : 0);
    });

    setSortedVans(newSortedVans);
  }, [vans, sortDirection]);

  useEffect(() => {
    // Filter vans by selected region
    if (selectedRegion === 'All') {
      setFilteredVans(sortedVans);
    } else {
      setFilteredVans(
        sortedVans.filter(van => van.regionalHub.region === selectedRegion)
      );
    }
  }, [sortedVans, selectedRegion]);

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  // Get unique regions for the dropdown
  const regions = Array.from(new Set(vans.map(van => van.regionalHub.region)));

  return (
    <Container>
      <div className="van-list">
        <h2 className="van-list-title">Van List</h2>
        <Navbar className="van-list-navbar">
          <Nav className="van-list-nav">
            <Navbar.Text className="van-list-nav-item">
              <strong>Van ID</strong>
              <Button variant="link" onClick={handleSort} className='van-list-navbar-button'>
                {sortDirection === 'asc' ? '▲' : '▼'}
              </Button>
            </Navbar.Text>
            <Navbar.Text className="van-list-nav-item">
              <Dropdown>
                <Dropdown.Toggle className="van-list-dropdown">
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
          {filteredVans.map((van) => (
            <Col key={van.id} xs={12} sm={6} md={4} className="van-list-col">
              <Card className="van-list-card">
                <Card.Body>
                  <Card.Title className="van-list-card-title">Van ID: {van.id}</Card.Title>
                  <Card.Subtitle className="van-list-card-subtitle text-muted mb-2">
                    Regional Hub: {van.regionalHub.region}
                  </Card.Subtitle>
                  <Card.Subtitle className="van-list-card-subtitle text-muted mb-1">
                    Cluster: {van.clusteredOrder ? van.clusteredOrder.id : 'Not Assigned'}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default VanList;



// import React from 'react';
// import { Card, Container, Row, Col } from 'react-bootstrap';
// import './styles/VanList.css';


// const VanList = ({ vans }) => {
//   return (
//     <Container>
//       <div className="van-list">
//         <h2 className="van-list-title">Van List</h2>
//         <Row>
//           {vans.map((van) => (
//             <Col key={van.id} xs={12} sm={6} md={4} className="van-list-col">
//               <Card className="van-list-card">
//                 <Card.Body>
//                   <Card.Title className="van-list-card-title">Van ID: {van.id}</Card.Title>
//                   <Card.Subtitle className="van-list-card-subtitle text-muted mb-2">
//                     Regional Hub: {van.regionalHub.region}
//                   </Card.Subtitle>
//                   <Card.Subtitle className="van-list-card-subtitle text-muted mb-1">
//                     Cluster: {van.clusteredOrder ? van.clusteredOrder.id : 'Not Assigned'}
//                   </Card.Subtitle>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </Container>
//   );
// };

// export default VanList;
