import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient.js';
import DealerNavbar from '../DealerUI/DealerNavbar.js';
import { useNavigate } from 'react-router-dom';

const DealerInventory = () => {
    const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const dealerName = localStorage.getItem('name');
  const navigate = useNavigate();;

  const handleInventory = async () => {
    try {
  
      const { data } = await supabase
        .from('Dealer_Inventory')
        .select('*') 
      .eq('brand', dealerName);

    console.log(data);
    setCarData(data);
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };



  useEffect(() => {
    
    handleInventory();
  }, []); 

  return (
    <div className='invcntr'>
       <DealerNavbar />
      <h2  className='fnt'style={{textAlign:'center', color:'white'}}>Available Cars</h2>
    
      {carData && (
        <div className='crdcontainer'>
          {carData.map((car) => (
            <CarCard key={car.vin} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

function CarCard({ car,}) {
  const {vehicle_name, price,image_path,stocks, brand } = car;

 
  return (
    <div className='dealerinvcrd fnt' >
      {image_path && <img src={image_path} alt={vehicle_name} className='bgcrd' style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '7px' }} />}
      <h4>{brand} {vehicle_name}</h4>
      <h5>₱{price}</h5>
      
      {stocks > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>Stocks: {stocks}</p>
        </div>
      )}
  
      {stocks <= 0 && (
        <h5>Sold Out</h5>
      )}
    </div>
  );
}
export default DealerInventory;
