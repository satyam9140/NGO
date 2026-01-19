import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createDonation } from '../api/donation.api'
import Loader from '../components/common/Loader'

// PaymentPortal acts as a dummy payment provider for testing.
// It accepts the donation details (via location.state) and simulates payment processing.
export default function PaymentPortal() {
  const location = useLocation()
  const navigate = useNavigate()
  const initial = location.state || { ngoId: '', amount: 500, method: 'dummy' }
  const [form, setForm] = useState(initial)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)

  const doPayment = async () => {
    if (!form.ngoId) return setError('NGO not selected')
    setProcessing(true)
    setError(null)
    try {
      // For dummy flow we set method to 'manual' (backend handles non-stripe/non-razorpay as simple creation)
      const payload = { ngoId: form.ngoId, amount: Number(form.amount), method: 'manual' }
      const { data } = await createDonation(payload)
      // show success and move to donations page (or receipt)
      alert('Payment simulated — donation created.')
      navigate('/donations')
    } catch (err) {
      setError(err?.response?.data?.message || 'Payment failed')
    } finally {
      setProcessing(false)
    }
  }

  if (!form) return <Loader />

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Dummy Payment Portal</h2>
        <p style={{ color: 'var(--muted)' }}>This simulates a payment flow for development/testing. No real card used.</p>

        {error && <div style={{ background: '#3b0000', padding: 8, borderRadius: 8, color: '#ffdede' }}>{error}</div>}

        <label>NGO ID</label>
        <input value={form.ngoId} onChange={e => setForm({ ...form, ngoId: e.target.value })} placeholder="Enter NGO id or leave as seeded id (seed1/seed2)" />

        <label style={{ marginTop: 12 }}>Amount (INR)</label>
        <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={doPayment} disabled={processing}>
            {processing ? 'Processing…' : 'Simulate Payment'}
          </button>
          <button className="btn" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}