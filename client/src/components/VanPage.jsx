import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './styles/VanPage.css'

const VanPage = ({ vans, setOrderToDelivered, setOrderToNotDelivered, orders }) => {
  const { id } = useParams();
  const [van, setVan] = useState(null);
  const [loading, setLoading] = useState(true);

  const getVanById = (id) => {
    const vanId = parseInt(id, 10); 
    return vans.find((van) => van.id === vanId);
  };

  useEffect(() => {

    console.log("Orders or vans changed:", orders, vans);

    const fetchedVan = getVanById(id);
    if (fetchedVan) {
      setVan(fetchedVan);
    }
    setLoading(false);
  }, [id, vans]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!van) {
    return <p>Van not found</p>;
  }

  const handleOrderDelivered = (order) => {
    setOrderToDelivered(order.id);
  };

  const handleOrderNotDelivered = (order) => {
    setOrderToNotDelivered(order.id);
  };

  const isOrderActionable = (order) => {
    return order.dateToDeliver === new Date().toISOString().split('T')[0] && order.deliveryStatus !== 'DELIVERED';
  };

  return (
    <Container>
      <div className="van-page">
        <h2 className="van-page-title">Van {van.id}</h2>
        <Row>
          {van.clusteredOrder.listOfOrders.map((order) => (
            <Col key={order.id} xs={12} sm={6} md={4} className="van-page-col">
              <Card className="van-page-card">
                <Card.Body>
                  <Card.Title className="van-page-card-title">Order ID: {order.id}</Card.Title>
                  <Card.Subtitle className="van-page-card-subtitle text-muted mb-2">
                    Status: {order.deliveryStatus || 'N/A'}
                  </Card.Subtitle>
                  <Card.Body className="van-page-card-subtitle text-muted">
                    {order && (
                      <>
                        <p id="two">Delivery Address:</p>
                        <ul id="one">
                          <li>{order.deliveryAddress.line}</li>
                          <li>{order.deliveryAddress.postcode}</li>
                        </ul>
                      </>
                    )}
                  </Card.Body>
                  <div className="van-page-card-button-container">
                    <Button
                      className="button"
                      onClick={() => handleOrderDelivered(order)}
                      disabled={!isOrderActionable(order)}
                    >
                      Delivered
                    </Button>
                  </div>
                  <div className="van-page-card-button-container">
                    <Button
                      className="button mt-2"
                      onClick={() => handleOrderNotDelivered(order)}
                      disabled={!isOrderActionable(order)}
                    >
                      Not Delivered
                    </Button>
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

export default VanPage;





// import { useState, useEffect } from "react";
// import { Button, Card, Col, Container, Row } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// const VanPage = ({ vans, setOrderToDelivered, setOrderToNotDelivered, orders }) => {
//   const { id } = useParams();
//   const [van, setVan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getVanById = (id) => {
//     const vanId = parseInt(id, 10); 
//     return vans.find((van) => van.id === vanId);
//   };

//   useEffect(() => {
//     if (vans && vans.length > 0) {
//       const fetchedVan = getVanById(id);
//       setVan(fetchedVan);
//       setLoading(false);
//     } else {
//       setLoading(false);  
//     }
//   }, [id, vans, orders]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }


//   if (!van) {
//     return <p>Van not found</p>;
//   }

//   const handleOrderDelivered = (order) => {
//     setOrderToDelivered(order.id)
//   }

//   const handleOrderNotDelivered = (order) => {
//     setOrderToNotDelivered(order.id)
//   }

//   const isOrderActionable = (order) => {
//     return order.dateToDeliver === new Date().toISOString().split('T')[0] || order.deliveryStatus === 'DELIVERED';
//   };

//   return (
//     <>
//     <Container>
//         <div className="van-page">
//             <h2>Van Page</h2>
//             <Row>
//             {van.clusteredOrder.listOfOrders.map((order) => (
//             <Col key={order.id} xs={12} sm={6} md={4} className="order-list-col">
//             <Card className="order-list-card">
//               <Card.Body>
//                 <Card.Title className="order-list-card-title">Order ID: {order.id}</Card.Title>
//                 <Card.Subtitle className="order-list-card-subtitle text-muted mb-2">
//                     Status: {order.deliveryStatus || 'N/A'}
//                 </Card.Subtitle>
//                 <Card.Body className="order-list-card-subtitle text-muted mb-2">
//                 {order && (
//                     <>
//                     <p>Delivery Address:</p>
//                     <ul>
//                         <li>{order.deliveryAddress.line}</li>
//                         <li>{order.deliveryAddress.postcode}</li>
//                     </ul>
//                     </>
//                 )}
//                 </Card.Body>
//                 <div className="order-list-card-button-container">
//                   <Button className='button' onClick={() => handleOrderDelivered(order)} disabled={!isOrderActionable(order)}>Delivered</Button>
//                 </div>
//                 <div className="order-list-card-button-container">
//                   <Button className='button mt-2' onClick={() => handleOrderNotDelivered(order)} disabled={!isOrderActionable(order)}>Not Delivered</Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//           ))}
//         </Row>
//         </div>

//     </Container>
//     </>
//   );
// };

// export default VanPage;
