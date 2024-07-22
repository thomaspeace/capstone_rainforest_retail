import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = ({ order, selectOrder }) => {
  const { id } = useParams();

  useEffect(() => {
    selectOrder(id);
  }, [id, selectOrder]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Delivery Date:</strong> {new Date(order.dateToDeliver).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {order.deliveryStatus}</p>
      <h3>Delivery Address</h3>
      <p>{order.deliveryAddress.line}</p>
      <p>{order.deliveryAddress.postcode}</p>
      <p>Latitude: {order.deliveryAddress.latitude}</p>
      <p>Longitude: {order.deliveryAddress.longitude}</p>
      <h3>Regional Hub</h3>
      <p>{order.regionalHub.region}</p>
      <Link to="/orders">Back to Order List</Link>
    </div>
  );
};

export default OrderDetails;