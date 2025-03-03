import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/account/Login';
import DataProvider from './context/DataProvider';
import Home from './component/home/Home';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          {/* Set Login as the default page */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
