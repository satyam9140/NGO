import React, { useEffect, useState } from 'react'
import { donationHistory } from '../../api/donation.api'
import Loader from '../common/Loader'

export default function DonationHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await donationHistory()
        setHistory(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <Loader />
  if (!history.length) return <div>No donations yet</div>

  return (
    <div className="card">
      <h2>Your Donations</h2>
      <ul>
        {history.map(d => <li key={d._id}>{d.amount} to {d.ngoName} on {new Date(d.createdAt).toLocaleString()}</li>)}
      </ul>
    </div>
  )
}