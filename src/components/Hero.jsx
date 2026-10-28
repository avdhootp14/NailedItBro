import { useState, useCallback, useEffect } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './NuriaHero.css'

// Comprehensive Founder-Led Services Data with Deep Specs & Outcomes
const SERVICES = [
  {
    id: 'web',
    num: '01',
    badge: 'High-Converting Web',
    name: 'Website Dev',
    title: 'Website Design & Development',
    accent: '#FF5E14',
    description:
      'Custom-designed business websites and web platforms that load sub-second, work seamlessly on every device, and rank on Google. Zero bloated templates—clean code, high conversion, and real enquiries.',
    deliverables: ['Sub-second Load', 'SEO & Schema', 'Responsive Mobile UX', 'Headless CMS & Forms'],
    techStack: ['React 19', 'Vite', 'Framer Motion', 'Vanilla / CSS'],
    timeline: '1 – 2 Weeks Sprint',
    outcome: 'Top 1% PageSpeed score & verified inbound leads.',
    target: '#work',
  },
  {
    id: 'app',
    num: '02',
    badge: 'Android & iOS Native',
    name: 'Mobile Apps',
    title: 'Mobile App Engineering',
    accent: '#FF5E14',
    description:
      'Smooth Android and cross-platform native apps built from a single high-performance codebase. Offline caching, instant push notifications, and high-throughput cloud backends from prototype to Play Store.',
    deliverables: ['Play Store Ready', '60 FPS Native UI', 'Offline First Cache', 'Cloud API Sync'],
    techStack: ['Flutter / React Native', 'Node.js', 'Supabase', 'Cloud Sync'],
    timeline: '3 – 4 Weeks MVP',
    outcome: 'Buttery 60fps gestures & production store build.',
    target: '#services',
  },
  {
    id: 'ai',
    num: '03',
    badge: 'Smart QR & AI',
    name: 'AI & QR Tools',
    title: 'QR Solutions & AI Automation',
    accent: '#FF5E14',
    description:
      'Digital menus, automated appointment scheduling, WhatsApp workflows, and intelligent customer capture tools that handle repetitive tasks so you stop answering the same questions every day.',
    deliverables: ['Digital QR Portals', 'Auto Bookings', 'WhatsApp Workflows', 'Instant Lead Capture'],
    techStack: ['WhatsApp Cloud API', 'LLM Agent APIs', 'Dynamic QR Engine', 'Webhooks'],
    timeline: '3 – 5 Days Setup',
    outcome: '24/7 automated customer responses with 0 manual effort.',
    target: '#services',
  },
  {
    id: 'game',
    num: '04',
    badge: '3D Interactive',
    name: '3D Games',
    title: '3D Mobile Game Development',
    accent: '#FF5E14',
    description:
      'Custom 3D gameplay, realistic physics, responsive touch gestures, and optimized rendering engines designed to run fluidly on mid-range smartphones without battery burn or frame drops.',
    deliverables: ['Custom 3D Physics', 'Touch Controls', 'Mid-Range Phone 60fps', 'Multiplayer Engine'],
    techStack: ['Unity / Three.js', 'WebGL', 'Blender 3D', 'Haptics & Audio'],
    timeline: '4 – 6 Weeks Sprint',
    outcome: 'High-retention mobile gamified experience.',
    target: '#services',
  },
  {
    id: 'social',
    num: '05',
    badge: 'Omnichannel Growth',
    name: 'Social Media',
    title: 'Social Media & Growth Marketing',
    accent: '#FF5E14',
    description:
      'High-retention short-form video production, creator distribution, and tracked growth campaigns designed to turn passive viewers into qualified customer enquiries and measurable revenue.',
    deliverables: ['Short-form Video', 'Multi-Platform Reach', 'Tracked Ads Funnel', 'Clear ROI Reports'],
    techStack: ['Premiere / After Effects', 'Meta Ads Manager', 'Shorts / Reels', 'Attribution Tracking'],
    timeline: 'Monthly Growth Sprints',
    outcome: 'Consistent high-intent client pipeline.',
    target: '#services',
  },
]

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [blueprintOpen, setBlueprintOpen] = useState(false)

  const activeService = SERVICES[activeIdx]

  // Auto-cycle through services every 5.5s unless hovered or paused
  useEffect(() => {
    if (isPaused || blueprintOpen) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused, blueprintOpen])

  // Close blueprint on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setBlueprintOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleServiceSelect = useCallback((idx) => {
    setActiveIdx(idx)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % SERVICES.length)
  }, [])

  const handleScroll = useCallback((target) => {
    scrollToTarget(target || '#work')
  }, [])

  return (
    <section
      className="nuria-viewport-hero"
      id="top"
      data-theme="dark"
      aria-labelledby="hero-title"
    >
      {/* Brand Electric Orange Warm Ambient Lighting */}
      <div className="nuria-backdrop" aria-hidden="true" />
      <div className="nuria-ambient-spot" aria-hidden="true" />
      <div className="nuria-vignette" aria-hidden="true" />

      {/* ==================================================================
          WIDESCREEN 3-MODULE GRID:
          Left: Service Navigator Deck | Center: Hero Typography & CTAs | Right: Live Service Dossier
          ================================================================== */}
      <div
        className="nuria-studio-grid"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ----------------------------------------------------------------
            LEFT FLANK: Interactive Service Index (01 to 05)
            ---------------------------------------------------------------- */}
        <aside className="nuria-side-deck" aria-label="Studio Services Index">
          <div className="nuria-side-deck__eyebrow">
            <span>Our Expertise</span>
            <span>05 Services</span>
          </div>

          <div className="nuria-side-deck__list" role="tablist" aria-label="Services List">
            {SERVICES.map((srv, idx) => {
              const isActive = idx === activeIdx
              return (
                <button
                  key={srv.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`nuria-side-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleServiceSelect(idx)}
                  onMouseEnter={() => handleServiceSelect(idx)}
                >
                  <span className="nuria-side-item__num">{srv.num}</span>
                  <span className="nuria-side-item__name">{srv.name}</span>
                  <span className="nuria-side-item__beacon" aria-hidden="true" />
                  {isActive && !isPaused && (
                    <span className="nuria-side-item__progress" aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="nuria-side-deck__footer">
            <button
              type="button"
              className="nuria-side-deck__specs-btn"
              onClick={() => setBlueprintOpen(true)}
              aria-label="View Full Service Blueprint"
            >
              <span>View Full Specs</span>
              <span className="nuria-deck-icon" aria-hidden="true">↗</span>
            </button>
          </div>
        </aside>

        {/* ----------------------------------------------------------------
            CENTER STAGE: Architectural Outfit Typography + 3D Stickers + CTAs
            ---------------------------------------------------------------- */}
        <div className="nuria-center-wrap">
          <div className="nuria-hero-canvas">
            {/* STICKER 1: Avatar Circle (Top Left Shoulder) */}
            <m.div
              className="nuria-sticker sticker-avatar"
              tabIndex={0}
              role="button"
              aria-label="Nailed It Bro Studio Mascot"
              drag
              dragConstraints={{ top: -16, bottom: 16, left: -16, right: 16 }}
              dragElastic={0.2}
              animate={{
                y: [0, -8, 0],
                rotate: [-4.5, -3, -4.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.2,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: 1.14,
                rotate: 0,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="sticker-avatar__circle">
                <img
                  src="/avatar_front_3d.png"
                  alt="Nailed It Bro Mascot"
                  draggable="false"
                />
              </div>
              <div className="nuria-sticker__tooltip">Nailed It Bro 🔨</div>
            </m.div>

            {/* STICKER 2: Available for Work Pill (Top Center) */}
            <m.div
              className="nuria-sticker sticker-available"
              role="button"
              tabIndex={0}
              drag
              dragConstraints={{ top: -12, bottom: 12, left: -12, right: 12 }}
              dragElastic={0.2}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.6,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              whileHover={{
                scale: 1.1,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToTarget('#contact')}
            >
              <div className="sticker-available__pill">
                <span className="sticker-available__dot" aria-hidden="true" />
                <span>Available for work</span>
              </div>
              <div className="nuria-sticker__tooltip">Available for Q4 Projects</div>
            </m.div>

            {/* STICKER 3: Website Dev 3D Blue Squircle (Top Right Shoulder) */}
            <m.div
              className="nuria-sticker sticker-web"
              role="button"
              tabIndex={0}
              drag
              dragConstraints={{ top: -16, bottom: 16, left: -16, right: 16 }}
              dragElastic={0.2}
              animate={{
                y: [0, -9, 0],
                rotate: [6, 7.5, 6],
              }}
              transition={{
                repeat: Infinity,
                duration: 5.4,
                ease: 'easeInOut',
                delay: 0.8,
              }}
              whileHover={{
                scale: 1.14,
                rotate: 0,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleServiceSelect(0)}
            >
              <div className="nuria-squircle-badge squircle-web">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="nuria-sticker__tooltip">Website Design &amp; Dev</div>
            </m.div>

            {/* STICKER 4: Retro Pixel Hand Cursor (Bottom Left Shoulder) */}
            <m.div
              className="nuria-sticker sticker-cursor"
              role="button"
              tabIndex={0}
              drag
              dragConstraints={{ top: -16, bottom: 16, left: -16, right: 16 }}
              dragElastic={0.2}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.8,
                ease: 'easeInOut',
                delay: 1.2,
              }}
              whileHover={{
                scale: 1.15,
                rotate: -8,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll('#work')}
            >
              <svg
                className="sticker-cursor__svg"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 2V12H9V14H11V16H13V18H15V22H19V16H17V14H15V12H13V10H11V8H9V2H7Z"
                  fill="#FFFFFF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 1V13H8V15H10V17H12V19H14V23H20V15H18V13H16V11H14V9H12V7H10V1H6ZM8 3H8.99V7H11V9H13V11H15V13H17V15H19V21H15V17H13V15H11V13H9V3H8Z"
                  fill="#121216"
                />
              </svg>
              <div className="nuria-sticker__tooltip">Explore Work</div>
            </m.div>

            {/* STICKER 5: Mobile App 3D Squircle (Bottom Right Shoulder) */}
            <m.div
              className="nuria-sticker sticker-app"
              role="button"
              tabIndex={0}
              drag
              dragConstraints={{ top: -16, bottom: 16, left: -16, right: 16 }}
              dragElastic={0.2}
              animate={{
                y: [0, -9, 0],
                rotate: [-4.5, -3, -4.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
                delay: 0.6,
              }}
              whileHover={{
                scale: 1.14,
                rotate: 0,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleServiceSelect(1)}
            >
              <div className="nuria-squircle-badge squircle-app">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5E14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
                </svg>
              </div>
              <div className="nuria-sticker__tooltip">Mobile Apps · Android &amp; iOS</div>
            </m.div>

            {/* Modern Architectural Typography with Outfit Font */}
            <h1 className="nuria-giant-type" id="hero-title">
              <span className="nuria-type-line">DIGITAL</span>
              <span className="nuria-type-line">STUDIO</span>
            </h1>

            {/* Signature Cursive Italic Script with Breathing Space */}
            <div className="nuria-script-line serif">
              <span>with taste &amp; rigour</span>
            </div>
          </div>

          {/* Clean Dual CTAs with Generous Vertical Clearance */}
          <div className="nuria-cta-row">
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="nuria-primary-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#contact')
                }}
              >
                <span>Start a Project</span>
                <span className="nuria-arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href="#work"
                className="nuria-ghost-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#work')
                }}
              >
                <span>Explore Selected Work</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* ----------------------------------------------------------------
            RIGHT FLANK: Dynamic Live Service Dossier Card with Animated Arrivals
            ---------------------------------------------------------------- */}
        <aside
          className="nuria-side-dossier"
          aria-label="Active Service Details"
        >
          {/* Top Dossier Bar: Tag, Timer & Manual Play/Pause / Step Controls */}
          <div className="nuria-dossier-top">
            <span className="nuria-dossier-tag">
              <span className="nuria-dossier-tag__dot" aria-hidden="true" />
              <span>{activeService.num} / {activeService.badge}</span>
            </span>

            <div className="nuria-dossier-controls">
              <button
                type="button"
                className="nuria-dossier-ctrl-btn"
                onClick={() => setIsPaused((prev) => !prev)}
                title={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
                aria-label={isPaused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
              >
                {isPaused ? '▶' : '⏸'}
              </button>
              <button
                type="button"
                className="nuria-dossier-ctrl-btn"
                onClick={handlePrev}
                title="Previous service"
                aria-label="Previous service"
              >
                ←
              </button>
              <button
                type="button"
                className="nuria-dossier-ctrl-btn"
                onClick={handleNext}
                title="Next service"
                aria-label="Next service"
              >
                →
              </button>
            </div>
          </div>

          {/* Animated Arrival Section for Service Content */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="nuria-dossier-body"
            >
              <h2 className="nuria-dossier-title">{activeService.title}</h2>

              <p className="nuria-dossier-desc">{activeService.description}</p>

              <div className="nuria-dossier-deliverables">
                {activeService.deliverables.map((item, dIdx) => (
                  <span key={dIdx} className="nuria-deliverable-chip">
                    {item}
                  </span>
                ))}
              </div>
            </m.div>
          </AnimatePresence>

          {/* Dossier Actions: Direct Blueprint Inspection & Target Link */}
          <div className="nuria-dossier-footer">
            <button
              type="button"
              className="nuria-dossier-action"
              onClick={() => handleScroll(activeService.target)}
            >
              <span>Explore Projects</span>
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              className="nuria-dossier-inspect-btn"
              onClick={() => setBlueprintOpen(true)}
              title="Inspect Full Blueprint & Specs"
            >
              <span>Inspect Scope</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </aside>
      </div>

      {/* ==================================================================
          OUT-OF-THE-BOX SERVICE BLUEPRINT MODAL / SPECIFICATION DRAWER
          ================================================================== */}
      <AnimatePresence>
        {blueprintOpen && (
          <div className="nuria-modal-backdrop" onClick={() => setBlueprintOpen(false)}>
            <m.div
              className="nuria-blueprint-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="blueprint-modal-title"
            >
              <div className="nuria-blueprint-header">
                <div className="nuria-blueprint-badge">
                  <span className="nuria-dossier-tag__dot" aria-hidden="true" />
                  <span>{activeService.num} — {activeService.badge}</span>
                </div>
                <button
                  type="button"
                  className="nuria-blueprint-close"
                  onClick={() => setBlueprintOpen(false)}
                  aria-label="Close Service Blueprint"
                >
                  ✕
                </button>
              </div>

              <h3 id="blueprint-modal-title" className="nuria-blueprint-title">
                {activeService.title}
              </h3>
              <p className="nuria-blueprint-desc">
                {activeService.description}
              </p>

              <div className="nuria-blueprint-grid">
                <div className="nuria-blueprint-col">
                  <h4 className="nuria-blueprint-col__title">Included Deliverables</h4>
                  <ul className="nuria-blueprint-checklist">
                    {activeService.deliverables.map((deliv, i) => (
                      <li key={i}>
                        <span className="nuria-check" aria-hidden="true">✓</span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="nuria-blueprint-col">
                  <h4 className="nuria-blueprint-col__title">Engine &amp; Tech Stack</h4>
                  <div className="nuria-blueprint-chips">
                    {activeService.techStack.map((tech, i) => (
                      <span key={i} className="nuria-tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="nuria-blueprint-meta-item">
                    <span className="nuria-meta-label">Typical Turnaround</span>
                    <span className="nuria-meta-val">{activeService.timeline}</span>
                  </div>

                  <div className="nuria-blueprint-meta-item">
                    <span className="nuria-meta-label">Target Result</span>
                    <span className="nuria-meta-val">{activeService.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="nuria-blueprint-actions">
                <a
                  href="#contact"
                  className="nuria-primary-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    setBlueprintOpen(false)
                    scrollToTarget('#contact')
                  }}
                >
                  <span>Book Free Consultation for this Service →</span>
                </a>
                <button
                  type="button"
                  className="nuria-ghost-btn"
                  onClick={() => setBlueprintOpen(false)}
                >
                  Back to Studio
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================
          Refined Studio Meta Bar at Bottom Viewport Edge
          ================================================================== */}
      <footer className="nuria-bottom-bar container">
        <span className="nuria-bottom-bar__services">
          Websites · Mobile Apps · QR Automation · 3D Games · Social Media
        </span>

        <button
          type="button"
          className="nuria-bottom-bar__scroll"
          onClick={() => scrollToTarget('#manifesto')}
          aria-label="Scroll to explore"
        >
          <span className="nuria-bottom-bar__scroll-line" aria-hidden="true" />
          <span>Scroll to explore</span>
        </button>

        <span className="nuria-bottom-bar__loc">
          Mumbai &amp; Worldwide
        </span>
      </footer>
    </section>
  )
}
