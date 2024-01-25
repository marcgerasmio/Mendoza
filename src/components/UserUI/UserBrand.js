import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import UserNavbar from './usernavbar.js';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Button } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';

const UserBrand = () => {
  const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    const brand = localStorage.getItem('brand');
    try {
      const { data } = await supabase
      .from('Dealer_Inventory')
      .select('*')
      .eq('brand', brand);
      setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickBuyNow = (car) => {
    const { brand, vehicle_name, car_style, price, VIN, image_path } = car;
    localStorage.setItem('brand', brand);
    localStorage.setItem('vehicle_name', vehicle_name);
    localStorage.setItem('car_style', car_style);
    localStorage.setItem('price', price);
    localStorage.setItem('VIN', VIN);
    localStorage.setItem('image_path', image_path);
    navigate('/userconfirm');
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCarData = carData
    ? carData.filter((car) => {
        const byBrand = !selectedBrand || car.brand_name === selectedBrand;
        const bySearch = car.vehicle_name.toLowerCase().startsWith(searchQuery.toLowerCase());
        return byBrand && bySearch;
      })
    : [];

  return (
    <div className='invcntr'>
      <UserNavbar />

      <div>
        <div className='d-flex justify-content-end mx-5'> 
          <Form className='mb-3 w-20 mt-3'>
            <Form.Control
              type="search"
              placeholder="Search here. . ."
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
          </div>
          {filteredCarData && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center', gap:'30px', height:'120vh'}}>
              {filteredCarData.map((car) => (
                <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

function CarCard({ car, onClickBuyNow }) {
  const { vehicle_name, price, image_path, brand, stocks, vehicle_type } = car;

  const handleBuyNowClick = () => {
    onClickBuyNow(car);
  };

  return (
    <div className='usercrd fnt' style={{ textAlign: 'center' }}>
      {image_path && <img src={image_path} alt={vehicle_name} className='bgcrd' style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '7px' }} />}
      <h4>{brand} {vehicle_name}</h4>
   
  
      {stocks > 0 && (
        <div>
             <h5>₱{price}</h5>
          <p>Stocks: {stocks}</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className='dlrbtn' onClick={handleBuyNowClick}>Buy Now</button>
          </div>
        </div>
      )}
  
      {stocks <= 0 && (
        <h3>Sold Out</h3>
      )}
    </div>
  );
  
  
}

export default UserBrand;
