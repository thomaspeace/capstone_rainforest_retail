import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderList = ({ orders }) => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedOrders, setSortedOrders] = useState([]);

  // Use useEffect to update sortedOrders when orders, sortField, or sortDirection change
  useEffect(() => {
    // Create a new sorted array without mutating the original orders
    const newSortedOrders = [...orders].sort((a, b) => {
      // Handle potential missing data by using nullish coalescing operator
      const aValue = a[sortField] ?? '';
      const bValue = b[sortField] ?? '';

      // Compare values based on their types
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

  // Helper function to format date strings
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="order-list">
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>
              ID 
              <button onClick={() => handleSort('id')}>
                {sortField === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </button>
            </th>
            <th>
              Delivery Date 
              <button onClick={() => handleSort('dateToDeliver')}>
                {sortField === 'dateToDeliver' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </button>
            </th>
            <th>
              Status 
              <button onClick={() => handleSort('deliveryStatus')}>
                {sortField === 'deliveryStatus' ? (sortDirection === 'asc' ? '▲' : '▼') : '⇅'}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              {/* Use formatDate helper function to display the date */}
              <td>{formatDate(order.dateToDeliver)}</td>
              {/* Display delivery status, fallback to 'N/A' if not available */}
              <td>{order.deliveryStatus || 'N/A'}</td>
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