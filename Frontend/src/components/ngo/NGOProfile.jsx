import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNGO } from '../../api/ngo.api'
import Loader from '../common/Loader'

export default function NGOProfile() {
  const { id } = useParams()
  const [ngo, setNgo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getNGO(id)
        setNgo(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <Loader />
  if (!ngo) return <div>Not found</div>

  return (
    <div className="card">
      <h2>{ngo.name}</h2>
      <p><strong>Mission:</strong> {ngo.mission}</p>
      <p><strong>Contact:</strong> {ngo.contactEmail}</p>
      <p>{ngo.description}</p>
    </div>
  )
}