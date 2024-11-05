import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Register from "../src/Pages/Login/Register"
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
