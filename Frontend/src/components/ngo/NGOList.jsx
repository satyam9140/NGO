import React, { useEffect, useState } from 'react'
import { listNGOs } from '../../api/ngo.api'
import { Link } from 'react-router-dom'
import Loader from '../common/Loader'

export default function NGOList(){
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await listNGOs()
        setNgos(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <Loader />
  if (!ngos.length) return <div className="container card">No NGOs found</div>

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2 style={{margin:0}}>Verified NGOs</h2>
        <div style={{color:'var(--muted)'}}>Showing {ngos.length} organizations</div>
      </div>

      <div className="grid">
        {ngos.map(n => (
          <article key={n._id} className="card ngo-card" aria-labelledby={`ngo-${n._id}`}>
            <div className="ngo-title">
              <h3 id={`ngo-${n._id}`} style={{margin:0}}>{n.name}</h3>
              <div className="ngo-badge">{n.approved ? 'Verified' : 'Pending'}</div>
            </div>
            <p style={{color:'var(--muted)'}}>{n.mission || n.description?.slice(0,120)}</p>
            <div style={{marginTop:'auto',display:'flex',gap:8,alignItems:'center'}}>
              <Link to={`/ngos/${n._id}`} className="btn">View</Link>
              <span style={{color:'var(--muted)',fontSize:'.9rem'}}>Contact: {n.contactEmail || '—'}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}