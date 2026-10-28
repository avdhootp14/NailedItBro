import { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './SkyHero.css'

// 5 Core Founder-Led Services Data (Strictly Authentic Nailed It Bro Content)
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
      }, 800)
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
      aria-label="Nailed It Bro Digital Studio Hero"
    >
      {/* ==================================================================
          WARM LUXURY AMBIENCE (Full Bleed, No Nested Boxes)
          ================================================================== */}
      <div className="sky-ambient-layer" aria-hidden="true">
        <div className="sky-ambient-glow sky-ambient-glow--top" />
        <div className="sky-ambient-glow sky-ambient-glow--clouds" />
        <div className="sky-ambient-glow sky-ambient-glow--floor" />
      </div>



      {/* ==================================================================
          CENTER 3D STAGE (Solma 3D Amphitheater Arc + Half-Body 3D Mascot)
          - Background: 5 Curved 3D Cards in an arc with deep floating drop shadows
          - Foreground: Big Zoomed Half-Body Mascot (waist/stomach up) in square area
          ================================================================== */}
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

        {/* FOREGROUND: SQUARE-WISE BIGGER, ZOOMED-IN HALF-BODY 3D MASCOT (0deg FRONT FACING) */}
        <div className="sky-mascot-wrap">
          {hasModelViewer ? (
            <model-viewer
              src="/mascot.glb"
              alt="Nailed It Bro 3D Studio Mascot"
              camera-controls
              camera-orbit="0deg 78deg 44%"
              camera-target="0m 0.32m 0m"
              min-camera-orbit="auto auto 32%"
              max-camera-orbit="auto auto 60%"
              disable-zoom
              interaction-prompt="none"
              shadow-intensity="0"
              shadow-softness="0"
              exposure="1.08"
              environment-image="neutral"
              loading="eager"
              reveal="auto"
              className="sky-mascot-model"
              style={{ '--progress-bar-color': 'transparent', '--progress-bar-height': '0px' }}
            >
              <img
                src="/avatar_front_clean.png"
                alt="3D Mascot Fallback"
                className="sky-mascot-fallback"
                slot="poster"
              />
            </model-viewer>
          ) : (
            <img
              src="/avatar_front_clean.png"
              alt="Nailed It Bro 3D Mascot"
              className="sky-mascot-fallback"
            />
          )}
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
