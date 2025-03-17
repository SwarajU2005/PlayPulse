import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/account/Login';
import DataProvider from './context/DataProvider';
import Home from './component/home/Home';
import OwnerProvider from './context/OwnerProvider';
import LoginAowner from './component/account/LoginAowner';
import Dashboard from './component/dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <OwnerProvider> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ownerlogin" element={<LoginAowner />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </OwnerProvider>
      </DataProvider>
    </BrowserRouter>
  );
  
}

export default App;
