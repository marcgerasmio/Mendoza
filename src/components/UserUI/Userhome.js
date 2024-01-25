import { Card, Container, Button, Stack } from 'react-bootstrap';
import UserNavbar from './usernavbar.js';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './User.css';

function UserHome(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const setDealerName = async (brand) => {
        console.log(`Card clicked for brand: ${brand}`);
        localStorage.setItem('brand',brand);
        navigate('/userbrand');
      };
    
    return(
        <>
        <div className='brndcntr'>
        <UserNavbar />
        <Container className='mt-4'>
            <Stack direction="horizontal">
    <div className="p-2">
      {}
      <div >
      <Card className="card-productsaudi mt-3" style={{height:'100%'}}>
        <h2 className='mt-5 mb-5'>AUDI</h2>
        <Button 
        onClick={() => setDealerName('Audi')}
  variant='outline-dark'
        className='btnhm'
        >
          Learn More
          </Button>
          <Card.Body className="card-contents">
            {}
          </Card.Body>
        </Card>
      </div>
    </div>
    <div className="p-2">
      {}
      <div >
      <Card className="card-productsbentley mt-3"style={{height:'100%'}}>
        <h2 className='mt-5 mb-5'>VOLKSWAGEN</h2>
        <Button 
        onClick={() => setDealerName('Volkswagen')}
variant='outline-dark'
        className='btnhm'
        >
          Learn More
          </Button>
          <Card.Body className="card-contents">
            {}
          </Card.Body>
        </Card>
      </div>
    </div>
    <div className="p-2">
      {}
      <div >
      <Card className="card-productsvolkswagen mt-3" style={{height:'100%'}}>
        <h2 className='mt-5 mb-5'>BENTLEY</h2>
        <Button 
        onClick={() => setDealerName('Bentley')}
  variant='outline-dark'
        className='btnhm'
        >
          Learn More
          </Button>
          <Card.Body className="card-contents">
            {}
          </Card.Body>
        </Card>
      </div>
    </div>
    <div className="p-2">
      {}
      <div >
      <Card className="card-productsporsche mt-3"style={{height:'100%'}}>
        <h2 className='mt-5 mb-5'>PORSCHE</h2>
        <Button 
        onClick={() => setDealerName('Porsche')}
variant='outline-dark'
        className='btnhm'
        >
          Learn More
          </Button>
          <Card.Body className="card-contents">
            {}
          </Card.Body>
        </Card>
      </div>
    </div>
    <div className="p-2">
      {}
      <div >
      <Card className="card-productslamborghini mt-3" style={{height:'100%'}}>
        <h2 className='mt-5 mb-5'>LAMBORGHINI</h2>
        <Button
        onClick={() => setDealerName('Lamborghini')}
        variant='outline-dark'
        className='btnhm'
        >
          Learn More
          </Button>
          <Card.Body className="card-contents">
            {}
          </Card.Body>
        </Card>
      </div>
    </div>
             
              
            </Stack>
        </Container>
        </div>
        </>
    )
}
export default UserHome;