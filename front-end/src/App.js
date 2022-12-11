import React from 'react';
import Userlogin from './page/userlogin/Userlogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from '../src/page/user/User';
import Admin from '../src/page/admin/Admin';


function App() {
  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Userlogin />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
