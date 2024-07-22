import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderList = ({ orders }) => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="order-list">
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>ID</th>
            <th onClick={() => handleSort('dateToDeliver')}>Delivery Date</th>
            <th onClick={() => handleSort('deliveryStatus')}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.dateToDeliver).toLocaleDateString()}</td>
              <td>{order.deliveryStatus}</td>
              <td>
                <Link to={`/orders/${order.id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;