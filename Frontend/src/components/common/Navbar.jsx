import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../../assets/logo.svg'

export default function Navbar(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)

  const onLogout = () => {
    logout()
    nav('/')
  }

  return (
    <header className="navbar" role="navigation" aria-label="main navigation">
      <div className="brand">
        <img src={Logo} alt="HelpingHands logo" />
        <div>
          <div className="title">HelpingHands</div>
          <div className="subtitle">Transparent donations, real impact</div>
        </div>
      </div>

      <nav>
        <ul className="nav-links" style={{display: open ? 'flex' : undefined}}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ngos">NGOs</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <div style={{fontSize:'.92rem', color:'#cfeff0', marginRight:6}}>Hi, {user.name}</div>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="btn">Login</Link>
            <Link to="/auth/register" className="btn btn-primary">Sign up</Link>
          </>
        )}
        <button className="btn" aria-label="menu" onClick={() => setOpen(s => !s)} style={{display:'none'}}>
          ☰
        </button>
      </div>
    </header>
  )
}