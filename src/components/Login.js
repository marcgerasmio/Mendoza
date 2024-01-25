import React, { useState } from 'react';
import supabase from './config/supabaseClient.js';
import { useNavigate } from 'react-router-dom';
import { Card, Form, FloatingLabel, Row, Col, Button, InputGroup} from 'react-bootstrap';
import { FaCarSide } from "react-icons/fa";
import { RiUser3Line } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";  

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Users');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateUser = async () => {
    try {
      const { data } = await supabase
        .from('Users')
        .select('*')
        .eq('username', username)
        .single();

      if (data && data.password === password) {
        console.log('Login successful');
        console.log(data);
        const name = data.name;
        localStorage.setItem('name', name);
    console.log(name);
        navigate("/userhome");
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid email or password');
        console.log(data);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  const validateDealer = async () => {
    try {
      const { data } = await supabase
        .from('Dealers')
        .select('*')
        .eq('username', username)
        .single();

      if (data && data.password === password) {
        console.log('Login successful');
        console.log(data);
        const name = data.brand_name;
        localStorage.setItem('name', name);
    console.log(name);
    
        navigate("/dealerhome")
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid email or password');
        console.log(data);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred during login');
    }
  };

  const handleClick = () => {
    if (userType === "Users") {
      validateUser(); 
    } else {
     validateDealer();
    }
  };

  const handleuserType = (userType) => {
    console.log(userType);
    setUserType(userType);
  };


  return (
    <>
      <div className="login-container">
        <Card className="card-container">
          <Card.Body>
          <FaCarSide size={50} className="user-icon"  />
            <h2 className="title">Urban Vehicles</h2>

            <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">  <RiUser3Line /></InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
       <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">  <RiLockPasswordLine /></InputGroup.Text>
        <Form.Control
        type="password"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          value={password} onChange={(e) => setPassword(e.target.value)}
          
        />
      </InputGroup>
       <Row>
            <Col>
  <Button
    className="w-100 sbmbtn"
    variant="outline-primary"
    onClick={() => handleuserType('Users')}
  >
    Customer
  </Button>
</Col>
<Col>
  <Button
    className="w-100 sbmbtn mb-3"
    variant="outline-primary"
    onClick={() => handleuserType('Dealers')}
  >
    Dealer
  </Button>
</Col>

            </Row>

{/*  <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <CiUser />
              <Form.Control type="username" placeholder="name@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FloatingLabel> */}

            <Row>
              <Col>
                <Button type="submit" className="w-100 submit-button" onClick={handleClick}>
                  Login
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
