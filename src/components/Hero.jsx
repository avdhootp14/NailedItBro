import { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './NovaHero.css'

// 5 Core Founder-Led Services Data
const SERVICES = [
  {
    id: 'web',
    num: 1,
    eyebrow: 'DEFINE YOUR DIGITAL PRESENCE',
    line1: 'Websites That',
    line2: 'Actually Convert.',
    description:
      'Custom business websites and web platforms engineered for sub-second load times, fluid mobile responsiveness, and high Google search rankings.',
    image: '/web.png',
    badge: 'Sub-second Load',
    deliverables: ['Sub-second Load Speed', 'SEO & Schema Markup', 'Fluid Mobile UX', 'Headless CMS & Forms'],
    techStack: ['React 19', 'Vite', 'Framer Motion', 'Vanilla CSS'],
    timeline: '1 – 2 Weeks Sprint',
    outcome: 'Top 1% PageSpeed score & verified inbound client enquiries.',
    target: '#work',
  },
  {
    id: 'app',
    num: 2,
    eyebrow: 'NATIVE PERFORMANCE & SCALE',
    line1: 'Mobile Apps',
    line2: 'Built For Scale.',
    description:
      'Smooth Android and cross-platform native apps built from a single high-performance codebase with offline caching and real-time push backends.',
    image: '/pet.png',
    badge: '60 FPS Native UI',
    deliverables: ['Play Store Ready Build', '60 FPS Gesture Engine', 'Offline First Cache', 'Cloud API Sync'],
    techStack: ['Flutter', 'React Native', 'Node.js', 'Supabase'],
    timeline: '3 – 4 Weeks MVP',
    outcome: 'Buttery gesture navigation and production-ready app store launch.',
    target: '#services',
  },
  {
    id: 'ai',
    num: 3,
    eyebrow: 'SMART AUTOMATION ENGINES',
    line1: 'Smart AI & QR',
    line2: 'Automating Growth.',
    description:
      'Digital menus, automated appointment scheduling, WhatsApp workflows, and intelligent customer capture tools that eliminate repetitive tasks.',
    image: '/qr.png',
    badge: '24/7 Automation',
    deliverables: ['Dynamic QR Portals', 'Automated Bookings', 'WhatsApp Workflows', 'Instant Lead Capture'],
    techStack: ['WhatsApp Cloud API', 'LLM Agent APIs', 'Dynamic QR Engine', 'Webhooks'],
    timeline: '3 – 5 Days Setup',
    outcome: '24/7 automated customer responses with zero manual workload.',
    target: '#services',
  },
  {
    id: 'game',
    num: 4,
    eyebrow: 'IMMERSIVE 3D EXPERIENCES',
    line1: '3D Games With',
    line2: 'Fluid Physics.',
    description:
      'Custom 3D gameplay, realistic physics, responsive touch gestures, and optimized rendering engines designed to run fluidly on mid-range smartphones.',
    image: '/game.png',
    badge: 'Mobile 60fps',
    deliverables: ['Custom 3D Physics', 'Touch Gestures', 'Mid-Range Phone 60fps', 'Multiplayer Engine'],
    techStack: ['Unity', 'Three.js', 'WebGL', 'Blender 3D'],
    timeline: '4 – 6 Weeks Sprint',
    outcome: 'High-retention interactive mobile gaming experience.',
    target: '#services',
  },
  {
    id: 'social',
    num: 5,
    eyebrow: 'HIGH-RETENTION MARKETING',
    line1: 'Content That',
    line2: 'Drives Revenue.',
    description:
      'High-retention short-form video production, creator distribution, and tracked growth campaigns designed to turn viewers into paying clients.',
    image: '/social.png',
    badge: 'Tracked ROI',
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

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const active = SERVICES[activeIdx]

  // Gentle auto-cycle through services every 5.5s unless hovered or modal open
  useEffect(() => {
    if (isPaused || modalOpen) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused, modalOpen])

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleStepClick = useCallback((idx) => {
    setActiveIdx(idx)
  }, [])

  const handleScroll = useCallback((target) => {
    scrollToTarget(target || '#work')
  }, [])

  return (
    <section
      className="nova-hero-section"
      id="top"
      aria-label="Nailed It Bro Studio Hero"
    >
      {/* ==================================================================
          MAIN HERO CARD: Full-Bleed Screen-Fitted Image + Screen Overlay
          ================================================================== */}
      <div
        className="nova-hero-card"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-Screen Fitted Background Image Layer with Cross-fade */}
        <div className="nova-bg-layer" aria-hidden="true">
          <AnimatePresence mode="wait">
            <m.img
              key={active.id}
              src={active.image}
              alt={`${active.line1} ${active.line2} Full Screen Background`}
              className="nova-bg-image"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
        </div>

        {/* Deep Multi-directional Cinematic Screen Overlay */}
        <div className="nova-screen-overlay" aria-hidden="true" />
        <div className="nova-screen-vignette" aria-hidden="true" />

        {/* Floating Live Status Badge at Top-Right */}
        <div className="nova-card-top-bar">
          <div className="nova-float-badge">
            <span className="nova-float-badge__dot" aria-hidden="true" />
            <span>{active.badge}</span>
          </div>
        </div>

        {/* ================================================================
            HERO CARD CONTENT GRID (Bottom-Left Headline | Bottom-Right Dossier)
            ================================================================ */}
        <div className="nova-card-content">
          {/* --------------------------------------------------------------
              LEFT COLUMN: Stepper (1 to 5) + Eyebrow + Headline + Action CTAs
              -------------------------------------------------------------- */}
          <div className="nova-left-cluster">
            {/* Vertical Stepper with Connected Line */}
            <div className="nova-stepper" role="tablist" aria-label="Services Stepper">
              <div className="nova-stepper-line" aria-hidden="true" />
              {SERVICES.map((srv, idx) => {
                const isActive = idx === activeIdx
                return (
                  <button
                    key={srv.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`nova-step-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleStepClick(idx)}
                    title={`Service 0${srv.num}: ${srv.line1} ${srv.line2}`}
                    aria-label={`Select service 0${srv.num}`}
                  >
                    {srv.num}
                  </button>
                )
              })}
            </div>

            {/* Headline and Eyebrow Stack with Cascade Transition */}
            <div className="nova-typography-stack">
              <AnimatePresence mode="wait">
                <m.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="nova-eyebrow">
                    <span className="nova-eyebrow__dot" aria-hidden="true" />
                    <span>0{active.num} — {active.eyebrow}</span>
                  </div>

                  <h1 className="nova-headline" id="hero-title">
                    <span className="nova-headline-line">{active.line1}</span>
                    <span className="nova-headline-line">
                      {active.line2.replace(/\.$/, '')}
                      <span className="nova-period">.</span>
                    </span>
                  </h1>
                </m.div>
              </AnimatePresence>

              {/* Action Buttons: Pill CTA + Circular Play Button */}
              <div className="nova-actions-row">
                <Magnetic strength={0.2}>
                  <a
                    href="#contact"
                    className="nova-primary-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToTarget('#contact')
                    }}
                  >
                    <span>Start a Project</span>
                    <span className="nova-btn-arrow" aria-hidden="true">→</span>
                  </a>
                </Magnetic>

                <button
                  type="button"
                  className="nova-play-btn"
                  onClick={() => setModalOpen(true)}
                  title="View Full Scope & Blueprint"
                  aria-label="View Service Details and Blueprint"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------
              RIGHT COLUMN: Rating Proof + Description + Deliverables + Explore ↗
              -------------------------------------------------------------- */}
          <div className="nova-right-dossier">
            {/* Social Proof & Rating Row */}
            <div className="nova-proof-row">
              <div className="nova-avatars-group">
                <img
                  src="/avatar_front_3d.png"
                  alt="Founder Avatar"
                  className="nova-avatar-chip"
                />
                <img
                  src="/avatar_fl_3d.png"
                  alt="Studio Team"
                  className="nova-avatar-chip"
                />
                <img
                  src="/pet.png"
                  alt="Client Project"
                  className="nova-avatar-chip"
                />
              </div>

              <div className="nova-rating-info">
                <div className="nova-stars" aria-label="5 star rating">★★★★★</div>
                <span className="nova-proof-text">4.9/5 · 50+ Projects Shipped</span>
              </div>
            </div>

            {/* Service Description with Animated Fade */}
            <AnimatePresence mode="wait">
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="nova-description">{active.description}</p>

                <div className="nova-deliverables-wrap">
                  {active.deliverables.map((deliv, idx) => (
                    <span key={idx} className="nova-deliverable-chip">
                      {deliv}
                    </span>
                  ))}
                </div>
              </m.div>
            </AnimatePresence>

            {/* Explore Project Action Button */}
            <button
              type="button"
              className="nova-dossier-btn"
              onClick={() => handleScroll(active.target)}
            >
              <span>Explore {active.line1} Work</span>
              <span className="nova-dossier-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================
          BOTTOM META BAR: Social Follow Pill | Tech & Brand Partners
          ================================================================== */}
      <footer className="nova-bottom-bar" aria-label="Studio Credentials">
        {/* Social Follow Pill */}
        <div className="nova-follow-pill">
          <span className="nova-follow-label">Follow</span>
          <div className="nova-social-icons">
            <a
              href="https://instagram.com/nailedit.bro"
              target="_blank"
              rel="noopener noreferrer"
              className="nova-social-link"
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
              className="nova-social-link"
              aria-label="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/naileditbro"
              target="_blank"
              rel="noopener noreferrer"
              className="nova-social-link"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="nova-social-link"
              aria-label="WhatsApp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="nova-bar-divider" aria-hidden="true" />

        {/* Tech Stack & Brand Marquee */}
        <div className="nova-logos-wrap" aria-label="Technology Stack">
          <div className="nova-logos-track">
            {TECH_PARTNERS.map((partner, i) => (
              <span key={i} className="nova-logo-item">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* ==================================================================
          INTERACTIVE SERVICE BLUEPRINT & SCOPE MODAL (Triggered by ▶ Button)
          ================================================================== */}
      <AnimatePresence>
        {modalOpen && (
          <div className="nova-modal-backdrop" onClick={() => setModalOpen(false)}>
            <m.div
              className="nova-blueprint-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="nova-modal-title"
            >
              <div className="nova-modal-header">
                <div className="nova-modal-badge">
                  <span>0{active.num} — {active.eyebrow}</span>
                </div>
                <button
                  type="button"
                  className="nova-modal-close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close Blueprint Modal"
                >
                  ✕
                </button>
              </div>

              <h2 id="nova-modal-title" className="nova-modal-title">
                {active.line1} {active.line2}
              </h2>

              <p className="nova-modal-desc">{active.description}</p>

              <div className="nova-modal-grid">
                <div>
                  <h3 className="nova-modal-col__title">Included Deliverables</h3>
                  <ul className="nova-modal-checklist">
                    {active.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="nova-modal-check" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="nova-modal-col__title">Core Tech Stack</h3>
                  <div className="nova-modal-chips">
                    {active.techStack.map((tech, idx) => (
                      <span key={idx} className="nova-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="nova-modal-meta-row">
                    <span className="nova-modal-meta-label">Typical Sprint</span>
                    <span className="nova-modal-meta-val">{active.timeline}</span>
                  </div>

                  <div className="nova-modal-meta-row">
                    <span className="nova-modal-meta-label">Target Result</span>
                    <span className="nova-modal-meta-val">{active.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="nova-modal-actions">
                <a
                  href="#contact"
                  className="nova-primary-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    setModalOpen(false)
                    scrollToTarget('#contact')
                  }}
                >
                  <span>Book Free Consultation for this Service →</span>
                </a>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
