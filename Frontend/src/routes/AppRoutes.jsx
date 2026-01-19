import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import NGOList from '../components/ngo/NGOList'
import NGOProfile from '../components/ngo/NGOProfile'
import Donate from '../components/donation/Donate'
import DonationHistory from '../components/donation/DonationHistory'
import Receipt from '../components/donation/Receipt'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ngos" element={<NGOList />} />
      <Route path="/ngos/:id" element={<NGOProfile />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/donations" element={<DonationHistory />} />
      <Route path="/donations/:id/receipt" element={<Receipt />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}