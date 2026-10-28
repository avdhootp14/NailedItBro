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
    category: '01 · Web',
    title: 'Website Dev',
    headline: 'Websites That Actually Convert',
    metric: '99% Speed',
    thumbnail: '/web.png',
    description:
      'Custom business websites and web platforms engineered for sub-second load times, fluid mobile responsiveness, and high Google search rankings.',
    deliverables: ['Sub-second Load Speed', 'SEO & Schema Markup', 'Fluid Mobile UX', 'Headless CMS & Forms'],
    techStack: ['React 19', 'Vite', 'Framer Motion', 'Vanilla CSS'],
    timeline: '1 – 2 Weeks Sprint',
    outcome: 'Top 1% PageSpeed score & verified inbound client enquiries.',
    target: '#work',
  },
  {
    id: 'app',
    num: 2,
    category: '02 · Mobile',
    title: 'Mobile Apps',
    headline: 'Mobile Apps Built For Scale',
    metric: '60 FPS Native',
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
    category: '03 · AI/QR',
    title: 'AI & QR Tools',
    headline: 'Smart AI & QR Automating Growth',
    metric: '24/7 Engine',
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
    category: '04 · 3D',
    title: '3D Games',
    headline: '3D Games With Fluid Physics',
    metric: 'Mobile 60fps',
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
    category: '05 · Growth',
    title: 'Social Media',
    headline: 'Content That Drives Revenue',
    metric: 'Tracked ROI',
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

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [hasModelViewer, setHasModelViewer] = useState(false)

  const active = SERVICES[activeIdx]

  useEffect(() => {
    // Check if customElements has registered model-viewer
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
      {/* Side Vertical Edge Badges */}
      <div className="sky-edge-left" aria-hidden="true">
        <span className="sky-heart-icon">♥</span>
        <span>Follow for more</span>
      </div>

      <div className="sky-edge-right" aria-hidden="true">
        <span>Nailed It Bro · Digital Studio</span>
      </div>

      {/* ==================================================================
          MAIN SKY HERO CARD: Soft Blue Atmospheric Canvas
          ================================================================== */}
      <div className="sky-hero-card">
        {/* Sky Clouds and Atmospheric Lighting */}
        <div className="sky-clouds-overlay" aria-hidden="true" />

        {/* Top-Left Sparkle Accent */}
        <div className="sky-sparkle-badge" aria-hidden="true">
          <svg className="sky-sparkle-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        {/* ================================================================
            TOP SECTION: Centered Headline + Subtitle + Action CTA
            ================================================================ */}
        <div className="sky-hero-top">
          <h1 className="sky-headline" id="hero-title">
            <span className="sky-headline-line">Digital Studio redefined.</span>
            <span className="sky-headline-line">Engineered with taste &amp; rigour.</span>
          </h1>

          <p className="sky-subtitle">
            From first prototype to global launch, Nailed It Bro engineers custom websites, mobile apps, and smart automations for growing businesses.
          </p>

          <Magnetic strength={0.25}>
            <button
              type="button"
              className="sky-cta-pill"
              onClick={() => handleScroll('#contact')}
              aria-label="Start a project with Nailed It Bro"
            >
              <span>Start a Project</span>
              <span className="sky-cta-arrow" aria-hidden="true">↗</span>
            </button>
          </Magnetic>
        </div>

        {/* ================================================================
            CENTER 3D STAGE:
            Foreground: 3D Mascot Character (mascot.glb)
            Background: 5 Curved 3D Perspective Service Cards in an Arc
            ================================================================ */}
        <div className="sky-3d-stage">
          {/* 5 BACKGROUND CARDS IN 3D CURVED PERSPECTIVE ARC */}
          <div className="sky-cards-arc" role="region" aria-label="Our 5 Core Services">
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
                  aria-label={`${srv.title}: ${srv.description}`}
                >
                  <div className="sky-card-head">
                    <span className="sky-card-category">{srv.category}</span>
                    <span className="sky-card-num">0{srv.num}</span>
                  </div>

                  <h3 className="sky-card-title">{srv.title}</h3>

                  <div className="sky-card-thumb-wrap">
                    <img
                      src={srv.thumbnail}
                      alt={`${srv.title} Thumbnail`}
                      className="sky-card-thumb"
                      loading="eager"
                    />
                  </div>

                  <div className="sky-card-meta">
                    <span>Performance</span>
                    <span className="sky-card-metric">{srv.metric}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* FOREGROUND: Real-Time 3D Mascot Character (mascot.glb) */}
          <div className="sky-mascot-wrap">
            {hasModelViewer ? (
              <model-viewer
                src="/mascot.glb"
                alt="Nailed It Bro 3D Studio Mascot"
                camera-controls
                auto-rotate
                rotation-per-second="16deg"
                camera-orbit="90deg 75deg 105%"
                disable-zoom
                interaction-prompt="none"
                shadow-intensity="1.2"
                shadow-softness="0.9"
                exposure="1.08"
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
            BOTTOM SECTION: Left 99% Satisfaction Stat + Right Community Stats
            ================================================================ */}
        <div className="sky-hero-bottom">
          {/* Bottom Left: 99% Satisfaction + 5 Service Pill Icons */}
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

          {/* Bottom Right: Star Rating + 50+ Projects + Avatars + Subtext */}
          <div className="sky-bottom-right">
            <div className="sky-right-meta-row">
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

              <div className="sky-counter-val">50+</div>
            </div>

            <p className="sky-proof-sub">
              Our user community keeps growing,
              <br />
              proof we build digital products that <strong>scale seamlessly</strong>.
            </p>
          </div>
        </div>
      </div>

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
                  className="sky-cta-pill"
                  onClick={() => {
                    setModalOpen(false)
                    handleScroll('#contact')
                  }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Book Free Consultation for this Service ↗</span>
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
