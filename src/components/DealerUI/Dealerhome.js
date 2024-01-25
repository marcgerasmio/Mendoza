import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from './DealerNavbar.js';
import { useNavigate } from 'react-router-dom';

const DealerHome = () => {
    const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const dealerName = localStorage.getItem('name');
  const navigate = useNavigate();;

  const handleLogin = async () => {
    try {
  
      const { data } = await supabase
        .from('Vehicles')
        .select('*') 
      .eq('brand', dealerName);

    console.log(data);
    setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };




  const onClickBuyNow = (car) => {
    const { brand, vehicle_name, car_style, price, VIN,image_path } = car;
    localStorage.setItem('brand', brand);
    localStorage.setItem('vehicle_name', vehicle_name);
    localStorage.setItem('car_style', car_style);
    localStorage.setItem('price', price);
    localStorage.setItem('VIN', VIN);
    localStorage.setItem('image_path', image_path);
  navigate('/dealerconfirm');

  
  };

  useEffect(() => {
    
    handleLogin();
  }, []); 

  return (
    <div className='bg-container'>
       <DealerNavbar />
       <h2 className='fnt mb-4' style={{textAlign:'center', color:'white'}}>Company Cars</h2>
      {carData && (
        <div className='crdcontainer'>
          {carData.map((car) => (
            <CarCard key={car.vin} car={car} onClickBuyNow={onClickBuyNow} />
          ))}
        </div>
      )}
    </div>
  );
};

function CarCard({ car, onClickBuyNow }) {
  const {vehicle_name, price,image_path, brand, stocks  } = car;

  const handleBuyNowClick = () => {
    onClickBuyNow(car);
  };

  return (
    <div className='dealercrd fnt'>
    {image_path && <img src={image_path} alt={vehicle_name} className = 'bgcrd' style={{ maxWidth: '100%', borderRadius:'10px', marginBottom:'7px' ,  }} />}
    <h4>{brand}  {vehicle_name}</h4>
    <h5>₱{price}</h5>
    <p>Stocks: {stocks}</p>
      <button className='dlrbtn' onClick={handleBuyNowClick}>Buy Now</button>

  </div>
  );
}
export default DealerHome;
