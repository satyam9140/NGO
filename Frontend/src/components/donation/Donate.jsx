import React, { useState, useEffect } from 'react'
import { listNGOs } from '../../api/ngo.api'
import { createDonation } from '../../api/donation.api'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../common/Loader'

export default function Donate(){
  const [ngos, setNgos] = useState([])
  const [form, setForm] = useState({ ngoId: '', amount: 500, method: 'stripe' })
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await listNGOs()
        setNgos(data)
        if (data[0]) setForm(f => ({ ...f, ngoId: data[0]._id }))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <Loader />

  const submit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Please login to donate')
    setProcessing(true)
    try {
      const { data } = await createDonation(form)
      // if paymentUrl present, redirect
      if (data.paymentUrl) window.location.href = data.paymentUrl
      else if (data.clientSecret) {
        // for Stripe client secret flow: you would handle stripe sdk here
        alert('Payment initiated. Implement Stripe client SDK to complete checkout.')
      } else {
        alert('Donation created successfully!')
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Donation failed')
    } finally { setProcessing(false) }
  }

  return (
    <div className="container">
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:'1rem'}}>
        <section className="card">
          <h2 style={{marginTop:0}}>Make a Donation</h2>
          <p style={{color:'var(--muted)'}}>Choose an NGO, amount and payment method. Donations are securely processed.</p>

          <form onSubmit={submit} style={{marginTop:12}}>
            <label>Choose NGO</label>
            <select value={form.ngoId} onChange={e => setForm({...form, ngoId: e.target.value})}>
              {ngos.map(n => <option key={n._id} value={n._id}>{n.name}</option>)}
            </select>

            <label style={{marginTop:12}}>Amount (INR)</label>
            <input type="number" min="10" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} />

            <label style={{marginTop:12}}>Payment method</label>
            <select value={form.method} onChange={e => setForm({...form, method: e.target.value})}>
              <option value="stripe">Stripe</option>
              <option value="razorpay">Razorpay</option>
              <option value="manual">Manual / Bank Transfer</option>
            </select>

            <div style={{marginTop:16,display:'flex',gap:8,alignItems:'center'}}>
              <button className="btn btn-primary" type="submit" disabled={processing}>{processing ? 'Processing…' : 'Proceed to Pay'}</button>
              <button type="button" className="btn" onClick={() => { setForm(f => ({...f, amount:100})) }}>Quick ₹100</button>
            </div>
          </form>
        </section>

        <aside className="payment-card card">
          <h3 style={{marginTop:0}}>Secure Payments</h3>
          <p style={{color:'var(--muted)'}}>We use Stripe & Razorpay for secure card and UPI payments. Receipts are generated automatically for each completed donation.</p>

          <div style={{marginTop:12,display:'grid',gap:8}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:700}}>You give</div>
              <div>₹ {form.amount}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{color:'var(--muted)'}}>Processing fee</div>
              <div style={{color:'var(--muted)'}}>₹ {Math.round(form.amount*0.02)}</div>
            </div>
            <hr style={{border:'none',borderTop:'1px solid rgba(255,255,255,0.03)'}} />
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontWeight:800}}>
              <div>Total</div>
              <div>₹ {Math.round(form.amount + form.amount*0.02)}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}