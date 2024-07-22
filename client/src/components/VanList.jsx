import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VanList = ({vans}) => {

  return (
    <div className="van-list">
      <h2>Van List</h2>
      <table>
        <thead>
          <tr>
            <th>Van ID</th>
            <th>Regional Hub</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {vans.map((van) => (
            <tr key={van.id}>
              <td>{van.id}</td>
              <td>{van.regionalHub.region}</td>
              <td>{van.clusteredOrder ? van.clusteredOrder.id : 'Not Assigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VanList;