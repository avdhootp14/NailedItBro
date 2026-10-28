import { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './SkyHero.css'

// 5 Core Founder-Led Services Data
const SERVICES = [
  {
    id: 'web',
    num: 1,
    category: '01 · Web Design',
    title: 'Website Dev',
    headline: 'Websites That Actually Convert',
    thumbnail: '/web.png',
    description:
      'Custom business websites and web platforms engineered for sub-second load times, fluid mobile responsiveness, and high Google search rankings.',
    deliverables: ['Sub-second Load Speed', 'SEO & Schema Markup', 'Fluid Mobile UX', 'Headless CMS & Forms'],
    techStack: ['React 19', 'Next.js', 'Vite', 'Framer Motion'],
    timeline: '1 – 2 Weeks Sprint',
    outcome: 'Top 1% PageSpeed score & verified inbound client enquiries.',
    target: '#work',
  },
  {
    id: 'app',
    num: 2,
    category: '02 · Mobile Engineering',
    title: 'Mobile Apps',
    headline: 'Mobile Apps Built For Scale',
    thumbnail: '/pet.png',
    description:
      'Smooth Android and cross-platform native apps built from a single high-performance codebase with offline caching and real-time push backends.',
    deliverables: ['Play Store Ready Build', '60 FPS Gesture Engine', 'Offline First Cache', 'Cloud API Sync'],
    techStack: ['Flutter', 'React Native', 'Node.js', 'Supabase'],
    timeline: '3 – 4 Weeks MVP',
    outcome: 'Buttery gesture navigation and production-ready app store launch.',
    target: '#services',
  },
  {
    id: 'ai',
    num: 3,
    category: '03 · AI & Smart QR',
    title: 'AI & QR Tools',
    headline: 'Smart AI & QR Automating Growth',
    thumbnail: '/qr.png',
    description:
      'Digital menus, automated appointment scheduling, WhatsApp workflows, and intelligent customer capture tools that eliminate repetitive tasks.',
    deliverables: ['Dynamic QR Portals', 'Automated Bookings', 'WhatsApp Workflows', 'Instant Lead Capture'],
    techStack: ['WhatsApp Cloud API', 'LLM Agent APIs', 'Dynamic QR Engine', 'Webhooks'],
    timeline: '3 – 5 Days Setup',
    outcome: '24/7 automated customer responses with zero manual workload.',
    target: '#services',
  },
  {
    id: 'game',
    num: 4,
    category: '04 · 3D Games',
    title: '3D Games',
    headline: '3D Games With Fluid Physics',
    thumbnail: '/game.png',
    description:
      'Custom 3D gameplay, realistic physics, responsive touch gestures, and optimized rendering engines designed to run fluidly on mid-range smartphones.',
    deliverables: ['Custom 3D Physics', 'Touch Gestures', 'Mid-Range Phone 60fps', 'Multiplayer Engine'],
    techStack: ['Unity', 'Three.js', 'WebGL', 'Blender 3D'],
    timeline: '4 – 6 Weeks Sprint',
    outcome: 'High-retention interactive mobile gaming experience.',
    target: '#services',
  },
  {
    id: 'social',
    num: 5,
    category: '05 · Social Growth',
    title: 'Social Media',
    headline: 'Content That Drives Revenue',
    thumbnail: '/social.png',
    description:
      'High-retention short-form video production, creator distribution, and tracked growth campaigns designed to turn viewers into paying clients.',
    deliverables: ['Short-form Video', 'Multi-Platform Reach', 'Tracked Ads Funnel', 'Clear ROI Reports'],
    techStack: ['Premiere Pro', 'After Effects', 'Meta Ads Manager', 'Shorts / Reels'],
    timeline: 'Monthly Growth Sprints',
    outcome: 'Consistent high-intent qualified client pipeline.',
    target: '#services',
  },
]

const TECH_PARTNERS = [
  'REACT 19',
  'NEXT.JS',
  'FLUTTER',
  'NODE.JS',
  'UNITY 3D',
  'SUPABASE',
  'VERCEL',
  'SHOPIFY',
  'PYTHON',
]

export default function Hero({ ready }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [hasModelViewer, setHasModelViewer] = useState(false)

  const active = SERVICES[activeIdx]

  useEffect(() => {
    if (typeof window !== 'undefined' && customElements.get('model-viewer')) {
      setHasModelViewer(true)
    } else {
      const timer = setTimeout(() => {
        if (customElements.get('model-viewer')) setHasModelViewer(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleCardClick = useCallback((idx) => {
    setActiveIdx(idx)
    setModalOpen(true)
  }, [])

  const handleScroll = useCallback((target) => {
    scrollToTarget(target || '#work')
  }, [])

  return (
    <section
      className="sky-hero-section"
      id="top"
      aria-label="Nailed It Bro 3D Studio Hero"
    >
      {/* ==================================================================
          MAIN WARM BEIGE HERO CARD
          - Palette: Warm Beige (#FAF7F2 / #F2EDE4), Electric Orange (#FF5E14), Obsidian (#141312)
          - Shadows: Multi-tiered diffuse 3D floating shadows from Solma reference
          - Atmosphere: Soft warm ambient lighting & subtle cream depth
          ================================================================== */}
      <div className="sky-hero-card">
        {/* Warm Ambient Radial Flares */}
        <div className="sky-ambient-overlay" aria-hidden="true">
          <div className="sky-ambient-glow sky-ambient-glow--top" />
          <div className="sky-ambient-glow sky-ambient-glow--floor" />
        </div>

        {/* ================================================================
            TOP SECTION: Eyebrow + Signature Headline + Subtitle + Actions
            ================================================================ */}
        <div className="sky-hero-top">
          <div className="sky-eyebrow">
            <span className="sky-eyebrow-dot" aria-hidden="true" />
            <span className="sky-eyebrow-text">DEFINE YOUR DIGITAL PRESENCE</span>
          </div>

          <h1 className="sky-headline" id="hero-title">
            <span className="sky-headline-line">Websites That</span>
            <span className="sky-headline-line">
              Actually Convert<span className="sky-brand-dot">.</span>
            </span>
          </h1>

          <p className="sky-subtitle">
            Custom business websites and web platforms engineered for sub-second load times, fluid mobile responsiveness, and high Google search rankings.
          </p>

          <div className="sky-actions-row">
            <Magnetic strength={0.25}>
              <button
                type="button"
                className="sky-cta-pill"
                onClick={() => handleScroll('#contact')}
                aria-label="Start a project with Nailed It Bro"
              >
                <span>Start a Project</span>
                <span className="sky-cta-arrow" aria-hidden="true">→</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                type="button"
                className="sky-play-btn"
                onClick={() => handleScroll('#work')}
                aria-label="View showcase portfolio"
                title="View selected work"
              >
                <svg className="sky-play-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* ================================================================
            CENTER 3D STAGE (Solma 3D Amphitheater + Foreground 3D Mascot)
            - Background: 5 Curved 3D Cards with image-only showcase and deep drop shadows
            - Foreground: Big real-time 3D mascot (mascot.glb) facing front with contact floor shadow
            ================================================================ */}
        <div className="sky-3d-stage">
          {/* 5 BACKGROUND PERSPECTIVE CARDS IN 3D CURVED ARC (IMAGE-ONLY, NO TEXT) */}
          <div className="sky-cards-arc" role="region" aria-label="Our 5 Showcase Projects">
            {SERVICES.map((srv, idx) => {
              const isActive = idx === activeIdx
              return (
                <div
                  key={srv.id}
                  role="button"
                  tabIndex={0}
                  className={`sky-service-card sky-card--${idx + 1} ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCardClick(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(idx)
                    }
                  }}
                  title={`Click to inspect ${srv.title} specs`}
                  aria-label={`${srv.title}: ${srv.headline}`}
                >
                  <img
                    src={srv.thumbnail}
                    alt={`${srv.title} Showcase`}
                    className="sky-card-img"
                    loading="eager"
                  />
                </div>
              )
            })}
          </div>

          {/* FOREGROUND: BIGGER REAL-TIME 3D MASCOT (mascot.glb) WITH CONTACT FLOOR SHADOW */}
          <div className="sky-mascot-wrap">
            <div className="sky-mascot-shadow" aria-hidden="true" />
            {hasModelViewer ? (
              <model-viewer
                src="/mascot.glb"
                alt="Nailed It Bro 3D Studio Mascot"
                camera-controls
                auto-rotate
                rotation-per-second="12deg"
                camera-orbit="90deg 75deg 105%"
                disable-zoom
                interaction-prompt="none"
                shadow-intensity="1.3"
                shadow-softness="0.85"
                exposure="1.05"
                environment-image="neutral"
                className="sky-mascot-model"
              >
                <img
                  src="/avatar_front_3d.png"
                  alt="3D Mascot Fallback"
                  className="sky-mascot-fallback"
                  slot="poster"
                />
              </model-viewer>
            ) : (
              <img
                src="/avatar_front_3d.png"
                alt="Nailed It Bro 3D Mascot"
                className="sky-mascot-fallback"
              />
            )}
          </div>
        </div>

        {/* ================================================================
            BOTTOM SECTION: 99% Satisfaction Stat + Community Avatars & Cases
            ================================================================ */}
        <div className="sky-hero-bottom">
          {/* Bottom Left: 99% Satisfaction + 5 Circular Service Selector Icon Pills */}
          <div className="sky-bottom-left">
            <div className="sky-big-stat">99%</div>
            <div className="sky-stat-label">Satisfaction for our services</div>

            <div className="sky-service-pills-row" role="tablist" aria-label="Service Selector">
              {SERVICES.map((srv, idx) => {
                const isActive = idx === activeIdx
                return (
                  <button
                    key={srv.id}
                    type="button"
                    className={`sky-icon-circle ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveIdx(idx)
                      setModalOpen(true)
                    }}
                    title={srv.title}
                    aria-label={`View ${srv.title} details`}
                  >
                    {idx === 0 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
                        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                    {idx === 3 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <line x1="6" y1="12" x2="10" y2="12" />
                        <line x1="8" y1="10" x2="8" y2="14" />
                        <circle cx="15" cy="11" r="1" />
                        <circle cx="18" cy="13" r="1" />
                      </svg>
                    )}
                    {idx === 4 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 7l-7 5 7 5V7z" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom Right: Discover More / 50+ Projects + Avatars + Subtext */}
          <div className="sky-bottom-right">
            <a
              href="#work"
              className="sky-discover-card"
              onClick={(e) => {
                e.preventDefault()
                handleScroll('#work')
              }}
              aria-label="Discover selected client projects"
            >
              <div className="sky-discover-header">
                <span className="sky-discover-title">Discover More</span>
                <span className="sky-discover-arrow" aria-hidden="true">→</span>
              </div>

              <div className="sky-discover-body">
                <div className="sky-avatars-group">
                  <img
                    src="/avatar_front_3d.png"
                    alt="Founder Avatar"
                    className="sky-avatar-chip"
                  />
                  <img
                    src="/avatar_fl_3d.png"
                    alt="Studio Team"
                    className="sky-avatar-chip"
                  />
                  <img
                    src="/pet.png"
                    alt="Client Project"
                    className="sky-avatar-chip"
                  />
                </div>

                <div className="sky-discover-meta">
                  <span className="sky-discover-tag">Selected Cases</span>
                  <span className="sky-discover-sub">Explore 50+ client projects</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* ==================================================================
          BOTTOM META BAR (From Image 2: Social Follow Pill | Tech Stack Ticker)
          ================================================================== */}
      <footer className="sky-bottom-bar" aria-label="Studio Credentials">
        <div className="sky-follow-pill">
          <span className="sky-follow-label">Follow</span>
          <div className="sky-social-icons">
            <a
              href="https://instagram.com/nailedit.bro"
              target="_blank"
              rel="noopener noreferrer"
              className="sky-social-link"
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://facebook.com/naileditbro"
              target="_blank"
              rel="noopener noreferrer"
              className="sky-social-link"
              aria-label="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/naileditbro"
              target="_blank"
              rel="noopener noreferrer"
              className="sky-social-link"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.53-1.53c0-.85-.68-1.54-1.53-1.54a1.54 1.54 0 0 0-1.54 1.54c0 .85.69 1.53 1.54 1.53m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
            <a
              href="https://wa.me/919405527181"
              target="_blank"
              rel="noopener noreferrer"
              className="sky-social-link"
              aria-label="WhatsApp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="sky-bar-divider" aria-hidden="true" />

        <div className="sky-tech-track" aria-label="Technologies used">
          {TECH_PARTNERS.map((tech) => (
            <span key={tech} className="sky-tech-item">
              {tech}
            </span>
          ))}
        </div>
      </footer>

      {/* ==================================================================
          INTERACTIVE SERVICE BLUEPRINT & SCOPE MODAL (Triggered by any card)
          ================================================================== */}
      <AnimatePresence>
        {modalOpen && (
          <div className="sky-modal-backdrop" onClick={() => setModalOpen(false)}>
            <m.div
              className="sky-blueprint-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="sky-modal-title"
            >
              <div className="sky-modal-header">
                <div className="sky-modal-badge">
                  <span>0{active.num} — {active.category}</span>
                </div>
                <button
                  type="button"
                  className="sky-modal-close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close Blueprint Modal"
                >
                  ✕
                </button>
              </div>

              <h2 id="sky-modal-title" className="sky-modal-title">
                {active.headline}
              </h2>

              <p className="sky-modal-desc">{active.description}</p>

              <div className="sky-modal-grid">
                <div>
                  <h3 className="sky-modal-col__title">Included Deliverables</h3>
                  <ul className="sky-modal-checklist">
                    {active.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="sky-modal-check" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="sky-modal-col__title">Core Tech Stack</h3>
                  <div className="sky-modal-chips">
                    {active.techStack.map((tech, idx) => (
                      <span key={idx} className="sky-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="sky-modal-meta-row">
                    <span className="sky-modal-meta-label">Typical Sprint</span>
                    <span className="sky-modal-meta-val">{active.timeline}</span>
                  </div>

                  <div className="sky-modal-meta-row">
                    <span className="sky-modal-meta-label">Target Result</span>
                    <span className="sky-modal-meta-val">{active.outcome}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className="sky-modal-cta"
                  onClick={() => {
                    setModalOpen(false)
                    handleScroll('#contact')
                  }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Book Free Consultation for this Service →</span>
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
