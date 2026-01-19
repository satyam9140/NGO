import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  // Demo featured projects
  const featured = [
    { id: 1, title: 'Rural School Renovation', org: 'BrightFuture Trust', raised: 112000, goal: 140000, imgAlt: 'school' },
    { id: 2, title: 'Clean Water Initiative', org: 'AquaCare', raised: 68500, goal: 125000, imgAlt: 'water' },
    { id: 3, title: 'Vaccination Drive', org: 'HealthForAll', raised: 45930, goal: 50000, imgAlt: 'health' },
  ]

  const testimonials = [
    { id: 1, quote: "I donated for the school renovation — the live updates and pictures made me feel connected.", author: "Priya • Mumbai" },
    { id: 2, quote: "Transparent budgets and project reports helped our company choose a CSR partner with confidence.", author: "Karan • Bengaluru" },
    { id: 3, quote: "Fast receipts and milestone updates — great experience.", author: "Fatima • Delhi" },
  ]

  // Counters + reveal / animation state
  const countersRef = useRef(null)
  const [counters, setCounters] = useState({ donations: 0, ngos: 0, satisfaction: 0, total: 0 })
  const target = { donations: 45000, ngos: 127, satisfaction: 98, total: 248430 }

  const revealRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Testimonials carousel index
  const [tIndex, setTIndex] = useState(0)

  // Theme toggle
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('hh-theme') || 'light' } catch { return 'light' }
  })

  // mark page mounted for CSS-driven animations
  useEffect(() => {
    document.documentElement.setAttribute('data-mounted', 'true')
  }, [])

  // theme persistence
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('hh-theme', theme) } catch {}
  }, [theme])

  // counters animate when visible
  useEffect(() => {
    if (!countersRef.current) return
    let started = false
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true
          const duration = 1400
          const start = performance.now()
          let raf = null
          const ease = t => 1 - Math.pow(1 - t, 3)
          const step = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const e = ease(t)
            setCounters({
              donations: Math.round(target.donations * e),
              ngos: Math.round(target.ngos * e),
              satisfaction: Math.round(target.satisfaction * e),
              total: Math.round(target.total * e),
            })
            if (t < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
          return () => cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.3 }
    )
    io.observe(countersRef.current)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // reveal project cards / progress bars
  useEffect(() => {
    if (!revealRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setRevealed(true)
      },
      { threshold: 0.2 }
    )
    io.observe(revealRef.current)
    return () => io.disconnect()
  }, [])

  // auto-advance testimonials
  useEffect(() => {
    const id = setInterval(() => setTIndex(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [testimonials.length])

  // attach lightweight tilt to project cards (progressive enhancement)
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.project-card'))
    const handlers = []
    nodes.forEach((el) => {
      const w = el.offsetWidth, h = el.offsetHeight
      function handleMove(e) {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / w
        const y = (e.clientY - r.top) / h
        const rx = (y - 0.5) * 6
        const ry = (x - 0.5) * -6
        el.style.transform = `translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`
      }
      function reset() { el.style.transform = '' }
      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', reset)
      handlers.push(() => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', reset)
      })
    })
    return () => handlers.forEach(h => h())
  }, [])

  // small confetti when donate clicked (lightweight DOM elements, removed after animation)
  function burstConfetti(x = window.innerWidth / 2, y = window.innerHeight / 3) {
    const colors = ['#60A5FA', '#6EE7B7', '#FCD34D', '#FB7185']
    const count = 18
    const root = document.createElement('div')
    root.className = 'hh-confetti-root'
    root.style.position = 'fixed'
    root.style.left = '0'
    root.style.top = '0'
    root.style.pointerEvents = 'none'
    document.body.appendChild(root)

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'hh-confetti'
      el.style.background = colors[i % colors.length]
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      const angle = (Math.random() * Math.PI * 2)
      const dist = 80 + Math.random() * 160
      el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`)
      el.style.setProperty('--ty', `${Math.sin(angle) * dist}px`)
      el.style.setProperty('--rot', `${Math.random() * 520}deg`)
      root.appendChild(el)
    }

    setTimeout(() => {
      root.remove()
    }, 1800)
  }

  // helper formatters
  const fmtINR = (n) => '₹ ' + n.toLocaleString('en-IN')
  const fmtShort = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K+' : `${n}`)

  // New content: impact highlights & partner logos
  const highlights = [
    { id: 1, title: '10,400+ Meals Served', detail: 'Emergency food drives in flood-affected districts.' },
    { id: 2, title: '3,200+ Students Supported', detail: 'Education kits distributed across 120 villages.' },
    { id: 3, title: '12 Health Camps', detail: 'Rural vaccination and awareness initiatives.' },
  ]

  const partners = ['AuditReady', 'SafePay', 'ImpactWatch', 'VolunteerNet', 'CSR Connect']

  // handler for donate buttons to both navigate (Link) and show confetti
  function handleDonateClick(e) {
    // small confetti at click location
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 3
    burstConfetti(x, y)
  }

  return (
    <main className="hh-container">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-left">
          <div className="top-row">
            <div className="eyebrow">Trusted · Transparent · Impactful</div>
            <div className="controls">
              <button
                aria-pressed={theme === 'dark'}
                className="theme-toggle"
                onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
                title="Toggle theme"
              >
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </div>

          <h1 id="hero-heading" className="hero-title">Support causes you care about — fast, transparent, and meaningful.</h1>

          <p className="hero-sub">
            HelpingHands links compassionate donors with verified NGOs. Track funds, view project outcomes, and receive milestone updates — every step is tracked with photos and reports.
          </p>

          <div className="hero-ctas" role="group" aria-label="Primary actions">
            <Link to="/donate" className="btn btn-primary" onClick={handleDonateClick}>Donate Now</Link>
            <Link to="/ngos" className="btn btn-ghost">Explore NGOs</Link>
            <Link to="/volunteer" className="btn btn-outline">Volunteer</Link>
          </div>

          <div className="counters" ref={countersRef} aria-live="polite">
            <div className="count">
              <div className="num">{fmtINR(counters.total)}</div>
              <div className="label">Total Donations</div>
            </div>
            <div className="count">
              <div className="num">{fmtShort(counters.ngos)}</div>
              <div className="label">Verified NGOs</div>
            </div>
            <div className="count">
              <div className="num">{fmtShort(counters.donations)}</div>
              <div className="label">Donations Tracked</div>
            </div>
            <div className="count">
              <div className="num">{counters.satisfaction}%</div>
              <div className="label">Donor Satisfaction</div>
            </div>
          </div>

          <div className="highlights" aria-hidden="false">
            {highlights.map(h => (
              <div key={h.id} className="highlight reveal">
                <strong>{h.title}</strong>
                <p>{h.detail}</p>
              </div>
            ))}
          </div>

          <div className="partners" aria-hidden="true">
            {partners.map((p, idx) => (
              <span key={idx} className="partner-pill">{p}</span>
            ))}
          </div>
        </div>

        <aside className="hero-card" aria-label="Featured projects and progress" ref={revealRef}>
          <div className="card-head">
            <div>
              <div className="card-title">This month's spotlight</div>
              <div className="card-sub muted">Hand-picked projects with verified outcomes</div>
            </div>
            <div className="pill">Verified</div>
          </div>

          <div className="featured-list">
            {featured.map((p) => {
              const pct = Math.round((p.raised / p.goal) * 100)
              return (
                <article key={p.id} className={`project-card ${revealed ? 'reveal' : ''}`} tabIndex={0}>
                  <div className="thumb" aria-hidden="true">
                    <svg viewBox="0 0 100 60" className="proj-svg" preserveAspectRatio="none">
                      <rect width="100" height="60" rx="8" fill={`url(#g-${p.id})`} opacity="0.14" />
                      <defs>
                        <linearGradient id={`g-${p.id}`} x1="0" x2="1">
                          <stop offset="0" stopColor="#60A5FA" stopOpacity="0.95" />
                          <stop offset="1" stopColor="#6EE7B7" stopOpacity="0.95" />
                        </linearGradient>
                      </defs>
                      <text x="8" y="36" fontSize="10" fill="rgba(2,6,23,0.18)">{p.imgAlt}</text>
                    </svg>
                  </div>

                  <div className="project-body">
                    <h3 className="project-title">{p.title}</h3>
                    <div className="meta">{p.org} • <strong>{fmtINR(p.raised)}</strong></div>

                    <div className="prog-wrap" aria-hidden="true">
                      <div className="pbar">
                        <div
                          className="pfill"
                          style={{ width: revealed ? `${pct}%` : '6%' }}
                        />
                      </div>
                      <div className="ptext">{pct}%</div>
                    </div>

                    <div className="project-actions">
                      <Link to={`/projects/${p.id}`} className="btn sm">View</Link>
                      <Link to="/donate" className="btn sm primary-outline" onClick={handleDonateClick}>Donate</Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="card-foot">
            <Link to="/projects" className="link">See all projects</Link>

            <div className="progress-mini" aria-hidden="true">
              <div className="mini-bar">
                <div className="mini-fill" style={{ width: revealed ? '68%' : '6%' }} />
              </div>
              <div className="mini-text">Monthly goal: ₹ 3,65,000</div>
            </div>
          </div>
        </aside>
      </section>

      <section className="home-cta" aria-labelledby="cta-heading">
        <div className="cta-left">
          <h2 id="cta-heading">Ready to make an impact?</h2>
          <p className="muted">Choose a project, donate securely, and receive milestone updates — every step is tracked.</p>
        </div>
        <div className="cta-actions">
          <Link to="/projects" className="btn lg btn-primary">Explore Projects</Link>
          <Link to="/how-it-works" className="btn lg btn-ghost">How it works</Link>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe to newsletter">
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" placeholder="Your email for impact updates" required />
            <button className="btn subscribe" onClick={(e) => { handleDonateClick(e); /* friendly confetti for subscribe too */ }}>Subscribe</button>
          </form>
        </div>
      </section>

      <section className="testimonials" aria-labelledby="test-heading">
        <h2 id="test-heading">Donor stories</h2>

        <div className="test-carousel" role="region" aria-roledescription="carousel" aria-label="Donor testimonials">
          <button className="t-prev" aria-label="Previous" onClick={() => setTIndex(i => (i - 1 + testimonials.length) % testimonials.length)}>‹</button>

          <blockquote className="test reveal" key={testimonials[tIndex].id}>
            <p>{testimonials[tIndex].quote}</p>
            <footer>{testimonials[tIndex].author}</footer>
            <div className="stamp">Verified update</div>
          </blockquote>

          <button className="t-next" aria-label="Next" onClick={() => setTIndex(i => (i + 1) % testimonials.length)}>›</button>

          <div className="dots" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === tIndex ? 'on' : ''}`}
                onClick={() => setTIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-selected={i === tIndex}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}