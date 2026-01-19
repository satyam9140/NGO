import React, { useEffect, useRef, useState } from 'react'
import './About.css'

export default function About() {
  // Animated counters targets
  const targets = useRef({
    ngos: 1200,
    donations: 45000,
    satisfaction: 98,
  })

  const [counts, setCounts] = useState({ ngos: 0, donations: 0, satisfaction: 0 })

  useEffect(() => {
    let rafId = null
    const start = performance.now()
    const duration = 1400

    function step(now) {
      const t = Math.min((now - start) / duration, 1)
      // easeOutCubic
      const ease = 1 - Math.pow(1 - t, 3)

      setCounts({
        ngos: Math.round(targets.current.ngos * ease),
        donations: Math.round(targets.current.donations * ease),
        satisfaction: Math.round(targets.current.satisfaction * ease),
      })

      if (t < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const fmt = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K+'
    return n.toString()
  }

  return (
    <section className="about-card" aria-labelledby="about-heading">
      <div className="about-visual" aria-hidden="true">
        {/* decorative illustrative SVG with subtle animation */}
        <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HelpingHands illustration">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stopColor="#6EE7B7" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0" stopColor="#FDE68A" />
              <stop offset="1" stopColor="#FDBA74" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          <rect x="30" y="30" width="840" height="460" rx="28" fill="url(#g1)" opacity="0.12" />
          <g transform="translate(60,60)" fill="none" stroke="#0F172A" strokeOpacity="0.06" strokeWidth="6" strokeLinecap="round">
            <path d="M60 320 C180 220, 420 220, 540 320" />
            <circle cx="140" cy="120" r="42" />
            <circle cx="420" cy="160" r="28" />
          </g>

          <g transform="translate(160,110)">
            <rect x="0" y="190" width="140" height="110" rx="14" fill="#0F172A" fillOpacity="0.88" />
            <rect x="180" y="140" width="140" height="160" rx="14" fill="#0F172A" fillOpacity="0.88" />
            <rect x="360" y="170" width="140" height="130" rx="14" fill="#0F172A" fillOpacity="0.88" />
            <circle cx="70" cy="70" r="44" fill="#fff" opacity="0.12" />
            <g transform="translate(70,70)">
              <circle r="18" fill="url(#g2)" style={{ transformOrigin: 'center', animation: 'float 6s ease-in-out infinite' }} />
            </g>
          </g>

          <g transform="translate(560,30)">
            <circle r="80" cx="80" cy="80" fill="#fff" opacity="0.04" />
            <g transform="translate(20,160)" fill="#0F172A" fillOpacity="0.9">
              <path d="M0 120 h110 v16 a12 12 0 0 1 -12 12 h-86 z" />
            </g>
          </g>
        </svg>
      </div>

      <div className="about-content">
        <header>
          <h2 id="about-heading">About HelpingHands</h2>
          <p className="lead">
            We connect compassionate donors with verified NGOs to make giving simple, transparent, and impactful.
            Track donations, view project-level results, and join a community committed to measurable change.
          </p>
        </header>

        <div className="badges" aria-hidden="false">
          <span className="badge">Mission-driven</span>
          <span className="badge">Verified Partners</span>
          <span className="badge">Secure Payments</span>
          <span className="badge">Volunteer Matches</span>
        </div>

        <ul className="features" aria-label="How HelpingHands helps">
          <li>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L15 8H9L12 2Z" />
            </svg>
            <div>
              <h3>Verified NGOs</h3>
              <p>Every partner is vetted — profiles, audits, and impact reports available for full transparency.</p>
            </div>
          </li>

          <li>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
            </svg>
            <div>
              <h3>Transparent Giving</h3>
              <p>See where funds go — project-level budgets, milestones, and progress updates with real photos and reports.</p>
            </div>
          </li>

          <li>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6v9a4 4 0 0 1-4 4H8l-4 3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <div>
              <h3>Flexible Support</h3>
              <p>One-time donations, recurring support, or volunteer matches — choose how you make an impact.</p>
            </div>
          </li>

          <li>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zM6 20v-1c0-2.21 3.58-4 6-4s6 1.79 6 4v1H6z" />
            </svg>
            <div>
              <h3>Community Verified</h3>
              <p>User reviews, impact stories and on-the-ground updates help verify outcomes beyond paperwork.</p>
            </div>
          </li>
        </ul>

        <div className="stats-cta">
          <div className="stats" role="list" aria-label="HelpingHands statistics">
            <div className="stat" role="listitem" aria-label={`${counts.ngos} verified NGOs`}>
              <strong>{fmt(counts.ngos)}</strong>
              <span>Verified NGOs</span>
            </div>
            <div className="stat" role="listitem" aria-label={`${counts.donations} donations tracked`}>
              <strong>{fmt(counts.donations)}</strong>
              <span>Donations tracked</span>
            </div>
            <div className="stat" role="listitem" aria-label={`${counts.satisfaction} percent donor satisfaction`}>
              <strong>{counts.satisfaction}%</strong>
              <span>Donor satisfaction</span>
            </div>
          </div>

          <div className="cta">
            <button className="btn primary">Donate Now</button>
            <button className="btn ghost">Become a Volunteer</button>
            <a className="cta-link" href="/projects">Explore Projects</a>
          </div>
        </div>

        <section className="impact">
          <h3>Our Impact</h3>
          <p className="impact-sub">We focus on measurable outcomes. Here are a few recent achievements:</p>

          <ul className="impact-list" role="list">
            <li role="listitem">
              <strong>Clean Water</strong>
              <div className="progress" aria-hidden="true">
                <div className="fill" style={{ width: '82%' }} />
              </div>
              <span className="impact-meta">82% of target households reached</span>
            </li>

            <li role="listitem">
              <strong>Education</strong>
              <div className="progress" aria-hidden="true">
                <div className="fill" style={{ width: '67%' }} />
              </div>
              <span className="impact-meta">67% school improvement projects funded</span>
            </li>

            <li role="listitem">
              <strong>Health</strong>
              <div className="progress" aria-hidden="true">
                <div className="fill" style={{ width: '74%' }} />
              </div>
              <span className="impact-meta">74% vaccination campaign coverage</span>
            </li>
          </ul>
        </section>

        <section className="howworks" aria-labelledby="how-heading">
          <h3 id="how-heading">How it works</h3>
          <ol className="steps">
            <li>
              <span className="step-num">1</span>
              <div>
                <strong>Discover a project</strong>
                <p>Browse verified NGOs and projects with clear budgets and timelines.</p>
              </div>
            </li>
            <li>
              <span className="step-num">2</span>
              <div>
                <strong>Give securely</strong>
                <p>One-time or recurring options with secure payment processing and receipts.</p>
              </div>
            </li>
            <li>
              <span className="step-num">3</span>
              <div>
                <strong>Track outcomes</strong>
                <p>Receive milestone updates, photos, and impact reports on your donations.</p>
              </div>
            </li>
          </ol>
        </section>

        <aside className="testimonial" aria-label="Donor testimonial">
          <blockquote>
            "HelpingHands made it so easy to support a school renovation project — I got updates at every step
            and saw real photos of the kids using the new classroom."
          </blockquote>
          <cite>— Priya, donor</cite>
        </aside>

        <p className="small-note">
          Want to verify an NGO or suggest a partner? <a href="/contact">Contact us</a> — we review every submission.
        </p>
      </div>
    </section>
  )
}