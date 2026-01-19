import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getReceipt } from '../../api/donation.api'
import Loader from '../common/Loader'

export default function Receipt() {
  const { id } = useParams()
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await getReceipt(id)
      setReceipt(data)
    })()
  }, [id])

  if (!receipt) return <Loader />
  return (
    <div className="card receipt">
      <h2>Donation Receipt</h2>
      <p>Donation ID: {receipt._id}</p>
      <p>Amount: {receipt.amount}</p>
      <p>NGO: {receipt.ngoName}</p>
      <p>Date: {new Date(receipt.createdAt).toLocaleString()}</p>
    </div>
  )
}