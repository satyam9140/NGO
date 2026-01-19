import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../common/Carousel'

// You can change these image URLs; these are public Unsplash images used as demonstration.
const carouselImages = [
  'https://images.unsplash.com/photo-1509099836639-18ba4c1f0d2d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1600&auto=format&fit=crop'
]

const sampleWork = [
  { id: 1, title: 'School renovation', detail: 'Renovated 3 classrooms and supplied furniture.' },
  { id: 2, title: 'Clean water project', detail: 'Installed 10 community water filters.' },
  { id: 3, title: 'Medical camp', detail: 'Organised free health camps in 6 villages.' }
]

export default function HomeHero() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20, alignItems: 'start', marginBottom: 20 }}>
      <div>
        <h1>HelpingHands — Real impact, transparent reporting</h1>
        <p style={{ color: 'var(--muted)' }}>
          We connect donors with verified NGOs, publish project outcomes, and share receipts. Support causes that matter.
        </p>

        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Link to="/donate" className="btn btn-primary">Donate Now</Link>
          <Link to="/ngos" className="btn">Explore NGOs</Link>
          <Link to="/volunteer" className="btn btn-outline">Volunteer</Link>
        </div>

        <div style={{ marginTop: 18 }}>
          <h3 style={{ marginBottom: 8 }}>Work we recently completed</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {sampleWork.map(w => (
              <div key={w.id} className="card" style={{ padding: 12 }}>
                <strong>{w.title}</strong>
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>{w.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside>
        <Carousel images={carouselImages} height={360} />
        <div className="card" style={{ marginTop: 12 }}>
          <h4 style={{ marginTop: 0 }}>Our impact at a glance</h4>
          <ul>
            <li>10,000+ meals distributed</li>
            <li>3,200+ students helped</li>
            <li>12 health camps</li>
          </ul>
        </div>
      </aside>
    </section>
  )
}