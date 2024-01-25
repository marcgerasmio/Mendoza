import {Nav, Navbar, Image, Container, Dropdown} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { IoPersonCircle } from "react-icons/io5";
import './Dealer.css';

function NavbarMain(){
  // const [dealerName, setDealerName] = useState('');
  // const dealer_name= localStorage.getItem('dealer_name');
  // setDealerName(dealer_name);
  const [brandname, setbrandname] = useState('');

const brand = async()=>{
  const storedBrandName = localStorage.getItem('name');
  setbrandname(storedBrandName);
}

useEffect(() => {
  brand();
}, []);
  return (
    <div>
      <Navbar style={{
        display: 'flex',
        justifyContent: 'space-around',
        fontWeight: 'bold'
      }}>
        <Container>
            <h3 className='mt-2 fnt' style={{color:'white'}}>Urban Vehicles</h3>
            <Nav variant='underline' defaultActiveKey="/">
                <Nav.Link href="/dealerhome" className='text-white mt-2'>Buy Cars</Nav.Link>
                <Nav.Link href="/dealerinventory"  className='text-white mt-2'>Inventory</Nav.Link>
                <Nav.Link href="/dealersales"  className='text-white mt-2'>Sales</Nav.Link>
                <div/>
                <Dropdown className='mt-1'> 
  <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ display: 'flex', alignItems: 'center', height: '45px', paddingLeft:'0px' }}>
    <IoPersonCircle className='user-icon' />
    <p className='ml-2 mb-0 fnt'>{brandname}</p>
  </Dropdown.Toggle>
  <Dropdown.Menu style={{ textAlign: 'center' }}>
    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


            </Nav>
        </Container>  
      </Navbar>
      <hr/>
    </div>
  );
}

export default NavbarMain;