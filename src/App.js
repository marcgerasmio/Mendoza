import { Routes, Route } from "react-router-dom";
import './App.css';


import Login from './components/Login';
import DealerHome from "./components/DealerUI/Dealerhome";
import UserHome from "./components/UserUI/Userhome";
import DealerConfirm from "./components/DealerUI/DealerConfirm";
import DealerInventory from "./components/DealerUI/DealerInventory";
import Logout from "./components/Logout";
import UserBrand from "./components/UserUI/UserBrand";
import UserConfirm from "./components/UserUI/UserConfirm";
import UserHistory from "./components/UserUI/UserHistory";  
import DealerSales from "./components/DealerUI/DealerSales";

function App() {
  return (
   <>
   <Routes>
    <Route path="/" element = {<Login />}/>
    <Route path="/logout" element = {<Logout/>}/>

    {/* Dealer Routes */}
    <Route path="/dealerhome" element = {<DealerHome />}/>
    <Route path="/dealerconfirm" element = {<DealerConfirm />}/>
    <Route path="/dealerinventory" element = {<DealerInventory />}/>
    <Route path="/dealersales" element = {<DealerSales/>}/>
    
    {/* User Routes */}
    <Route path="/userhome" element = {<UserHome />}/>
    <Route path="/userbrand" element = {<UserBrand/>}/>
    <Route path="/userconfirm" element = {<UserConfirm />}/>
    <Route path="/userhistory" element = {<UserHistory />}/>








    
   </Routes>
   </>
  );
}

export default App;
