import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const VanPage = ({ vans, setOrderToDelivered, setOrderToNotDelivered }) => {
  const { id } = useParams();
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);

  const getVanById = (id) => {
    const vanId = parseInt(id, 10); 
    return vans.find((van) => van.id === vanId);
  };

  useEffect(() => {
    if (vans && vans.length > 0) {
      const fetchedVan = getVanById(id);
      setVan(fetchedVan);
      setLoading(false);
    } else {
      setLoading(false);  
    }
  }, [id, vans]);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (!van) {
    return <p>Van not found</p>;
  }

  const handleOrderDelivered = (order) => {
    setOrderToDelivered(order.id)
  }

  const handleOrderNotDelivered = (order) => {
    setOrderToNotDelivered(order.id)
  }

  return (
    <>
    <Container>
        <div className="van-page">
            <h2>Van Page</h2>
            <Row>
            {van.clusteredOrder.listOfOrders.map((order) => (
            <Col key={order.id} xs={12} sm={6} md={4} className="order-list-col">
            <Card className="order-list-card">
              <Card.Body>
                <Card.Title className="order-list-card-title">Order ID: {order.id}</Card.Title>
                <Card.Subtitle className="order-list-card-subtitle text-muted mb-2">
                    Status: {order.deliveryStatus || 'N/A'}
                </Card.Subtitle>
                <Card.Body className="order-list-card-subtitle text-muted mb-2">
                {order && (
                    <>
                    <p>Delivery Address:</p>
                    <ul>
                        <li>{order.deliveryAddress.line}</li>
                        <li>{order.deliveryAddress.postcode}</li>
                    </ul>
                    </>
                )}
                </Card.Body>
                <div className="order-list-card-button-container">
                  <Button className='button' onClick={() => handleOrderDelivered(order)}>Delivered</Button>
                </div>
                <div className="order-list-card-button-container">
                  <Button className='button mt-2' onClick={() => handleOrderNotDelivered(order)}>Not Delivered</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          ))}
        </Row>
        </div>

    </Container>
    </>
  );
};

export default VanPage;
