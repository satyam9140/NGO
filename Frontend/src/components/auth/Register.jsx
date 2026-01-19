import React, { useState } from 'react'
import { register } from '../../api/auth.api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
      nav('/auth/login')
    } catch (error) {
      setErr(error?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="container">
      <div style={{maxWidth:520,margin:'2rem auto'}}>
        <div className="card">
          <h2 style={{marginTop:0}}>Create account</h2>
          <p style={{color:'var(--muted)'}}>Join HelpingHands to support NGOs and track your donations.</p>
          {err && <div style={{background:'#3b0000',padding:8,borderRadius:8,color:'#ffdede'}}>{err}</div>}
          <form onSubmit={submit} style={{marginTop:12}}>
            <label>Name</label>
            <input value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
            <label style={{marginTop:12}}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
            <label style={{marginTop:12}}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} required />
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="btn btn-primary">Get Started</button>
              <button type="button" className="btn" onClick={() => { setForm({ name:'', email:'', password:'' }) }}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}