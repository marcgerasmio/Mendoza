import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import supabase from '../config/supabaseClient.js';
import NavbarMain from './DealerNavbar.js';

const DealerSales= () => {
  const [error, setError] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const name = localStorage.getItem('name');

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  const fetchPurchaseHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('Sales')
        .select('*')
        .eq('brand', name);

      if (error) {
        throw error;
      }

      setPurchaseHistory(data);
    } catch (error) {
      console.error('Error during fetching purchase history:', error.message);
      setError('An error occurred while fetching purchase history');
    }
  };

  useEffect(() => {
    fetchPurchaseHistory();
  }, [name]);

  return (
    <div className='hstry'>
      <NavbarMain />
      <h2 className='fnt mb-4 mt-4' style={{ textAlign: 'center', color:'white'}}>{name}'s Purchase History</h2>

      <Table className="table-container" bordered hover style={{ width: '75%', margin: 'auto', }}>
        <thead >
          <tr className='fnt'>
            <th>Customer</th>
            <th>Car Name</th>
            <th>Car Price</th>
            <th>Car Style</th>
            <th>Car Color</th>
            <th>Transmission Type</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.username}</td>
              <td>{purchase.vehicle_name}</td>
              <td>₱{purchase.price}</td>
              <td>{purchase.car_style}</td>
              <td>{purchase.color}</td>
              <td>{purchase.transmission}</td>
              <td>{formatDateTime(purchase.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DealerSales;
