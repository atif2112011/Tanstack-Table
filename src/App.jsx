import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Menu from './components/Menu'
import MainBody from './components/MainBody'
import People from './pages/People.jsx'
import Dashboard from './pages/Dashboard.jsx';

function App() {
  

  return (
    <BrowserRouter>
 <div className='flex flex-col bg-primary-500 w-screen h-screen'>
  <Navbar></Navbar>
  <div className='flex h-full'>
    <Menu></Menu>
    <MainBody>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/people" element={<People/>} />
              {/* Add a default route */}
              <Route path="/" element={<Dashboard />} />
      </Routes>
    </MainBody>
  </div>
 </div>
 </BrowserRouter>
  )
}

export default App
