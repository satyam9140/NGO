import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth.api'
import { useAuth } from '../../hooks/useAuth'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login({ email, password })
      localStorage.setItem('token', data.token)
      setUser(data.user)
      nav('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container">
      <div style={{maxWidth:520,margin:'2rem auto'}}>
        <div className="card" style={{display:'flex',gap:16,alignItems:'stretch'}}>
          <div style={{flex:1}}>
            <h2 style={{marginTop:0}}>Welcome back</h2>
            <p style={{color:'var(--muted)'}}>Sign in to continue donating and tracking your receipts.</p>

            {error && <div style={{background:'#3b0000',padding:8,borderRadius:8,color:'#ffdede'}}>{error}</div>}

            <form onSubmit={submit} style={{marginTop:12}}>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <label style={{marginTop:12}}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <button className="btn btn-primary">Login</button>
                <button type="button" className="btn" onClick={() => { setEmail('demo@demo.com'); setPassword('password123') }}>Demo</button>
              </div>
            </form>
          </div>

          <aside style={{width:220, padding:16, borderLeft:'1px solid rgba(255,255,255,0.03)'}}>
            <h4 style={{marginTop:0}}>New here?</h4>
            <p style={{color:'var(--muted)'}}>Create an account to manage donations and get receipts.</p>
            <a href="/auth/register" className="btn btn-primary" style={{display:'inline-block',marginTop:8}}>Create account</a>
          </aside>
        </div>
      </div>
    </div>
  )
}