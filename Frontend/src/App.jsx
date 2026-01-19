import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}