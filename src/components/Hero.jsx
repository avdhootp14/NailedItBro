import { useState, useCallback, useEffect, useRef } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { scrollToTarget, getLenis } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import HeroParticles from './HeroParticles'
import './SkyHero.css'

// 10 Core Founder-Led Services Data (5 Left, 5 Right flanking the mascot)
const SERVICES_LEFT = [
  {
    id: 'uiux',
    no: '01',
    category: 'Design Systems',
    title: 'UI/UX Design',
    desc: 'Human-centered interfaces, intuitive flows & scalable Figma design systems.',
    thumbnail: '/hero_studio_bg.png',
    tone: '#FF5E14',
    deliverables: ['User Journey Maps', 'High-Fidelity Prototypes', 'Figma Tokens'],
    timeline: '1 – 2 Weeks Sprint',
    outcome: 'Streamlined conversion funnel & verified brand delight.',
  },
  {
    id: 'web',
    no: '02',
    category: 'Engineering',
    title: 'Website Development',
    desc: 'Hyper-fast, editorial websites engineered for sub-second speeds & top SEO.',
    thumbnail: '/web.png',
    tone: '#FF6E26',
    deliverables: ['React 19 & Next.js', 'Headless CMS', 'Top 1% PageSpeed'],
    timeline: '2 – 3 Weeks MVP',
    outcome: 'Verified inbound client enquiries & high Google rankings.',
  },
  {
    id: 'apps',
    no: '03',
    category: 'Mobile Apps',
    title: 'Mobile Engineering',
    desc: 'Fluid iOS & Android cross-platform apps with 60/120fps gesture controls.',
    thumbnail: '/pet.png',
    tone: '#10B981',
    deliverables: ['Flutter & React Native', 'Offline Sync Engine', 'App Store Launch'],
    timeline: '3 – 4 Weeks MVP',
    outcome: 'Buttery gesture navigation and production-ready store release.',
  },
  {
    id: 'game',
    no: '04',
    category: '3D & Physics',
    title: '3D Game Development',
    desc: 'Physics-based mobile games, real-time 3D WebGL worlds & arcade mechanics.',
    thumbnail: '/game.png',
    tone: '#06B6D4',
    deliverables: ['Custom 3D Physics', 'Touch Gestures', 'WebGL Shaders'],
    timeline: '4 – 6 Weeks Sprint',
    outcome: 'High-retention interactive mobile gaming experience.',
  },
  {
    id: 'qr',
    no: '05',
    category: 'Smart Hardware',
    title: 'Dynamic QR Portals',
    desc: 'Dynamic QR ecosystems, scan-to-order menus & instant WhatsApp routing.',
    thumbnail: '/qr.png',
    tone: '#F59E0B',
    deliverables: ['Dynamic Redirection', 'Table Stands & NFC', 'Scan Analytics'],
    timeline: '3 – 5 Days Setup',
    outcome: '24/7 automated table bookings with zero manual workload.',
  },
]

const SERVICES_RIGHT = [
  {
    id: 'ai',
    no: '06',
    category: 'Autonomous AI',
    title: 'AI Automation',
    desc: 'Intelligent AI customer agents, automated bookings & CRM pipelines.',
    thumbnail: '/hero_studio_bg.png',
    tone: '#8B5CF6',
    deliverables: ['Custom AI Agents', 'WhatsApp Cloud API', 'Lead Auto-Routing'],
    timeline: '1 – 2 Weeks Setup',
    outcome: 'Eliminates repetitive client friction and runs 24/7.',
  },
  {
    id: 'social',
    no: '07',
    category: 'Viral Growth',
    title: 'Social Media Engine',
    desc: 'High-retention Reels, TikToks & Shorts video production & creator funnels.',
    thumbnail: '/social.png',
    tone: '#EC4899',
    deliverables: ['Short-form Video', 'Multi-Platform Reach', 'Tracked Ad Funnels'],
    timeline: 'Monthly Sprints',
    outcome: 'Consistent high-intent qualified client pipeline.',
  },
  {
    id: 'brand',
    no: '08',
    category: 'Brand Identity',
    title: 'Brand Positioning',
    desc: 'Iconic visual branding, typography pairing architecture & brand books.',
    thumbnail: '/avatar_front_clean.png',
    tone: '#FF7E36',
    deliverables: ['Brand Strategy', 'Logo & Identity System', 'Digital Guidelines'],
    timeline: '1 – 2 Weeks Sprint',
    outcome: 'Definitive visual authority in your industry.',
  },
  {
    id: 'crm',
    no: '09',
    category: 'Enterprise Tools',
    title: 'Custom CRM Dashboards',
    desc: 'Custom internal tools, customer relationship pipelines & analytics.',
    thumbnail: '/web.png',
    tone: '#3B82F6',
    deliverables: ['Custom Admin Dashboards', 'Client Portals', 'Automated Billing'],
    timeline: '3 – 4 Weeks MVP',
    outcome: 'Real-time financial clarity & operational leadership control.',
  },
  {
    id: 'ads',
    no: '10',
    category: 'Paid Acquisition',
    title: 'Google & Meta Ads',
    desc: 'Performance advertising with rigorous creative testing & ROAS scaling.',
    thumbnail: '/social.png',
    tone: '#E11D48',
    deliverables: ['Google Search & PMax', 'Meta Creative Testing', 'Pixel Optimization'],
    timeline: 'Ongoing Growth',
    outcome: 'Predictable, scalable customer acquisition.',
  },
]

export default function Hero({ ready }) {
  const containerRef = useRef(null)
  const [activeModalItem, setActiveModalItem] = useState(null)
  const [hasModelViewer, setHasModelViewer] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredCharIndex, setHoveredCharIndex] = useState(null)
  const backdropRef = useRef(null)
  const mouseVelocity = useRef({ vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0 })

  // Track global cursor velocity for Framer "HoverBump" physics
  useEffect(() => {
    const onPointerMove = (e) => {
      const now = performance.now()
      const dt = Math.max(8, now - (mouseVelocity.current.lastT || now))
      const dx = e.clientX - mouseVelocity.current.lastX
      const dy = e.clientY - mouseVelocity.current.lastY
      mouseVelocity.current = {
        vx: (dx / dt) * 1000,
        vy: (dy / dt) * 1000,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: now,
      }
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  // Exact Framer "HoverBumpImage" directional rush and spring return physics
  const handleBadgePointerEnter = (e) => {
    const badge = e.currentTarget
    const inner = badge.querySelector('.floating-badge-inner') || badge
    const rect = badge.getBoundingClientRect()
    const { vx, vy } = mouseVelocity.current
    const speed = Math.hypot(vx, vy)

    let dirX = 0
    let dirY = 0

    if (speed > 60) {
      dirX = vx / speed
      dirY = vy / speed
    } else {
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const d = Math.hypot(dx, dy) || 1
      dirX = dx / d
      dirY = dy / d
    }

    const maxOffset = 12
    const maxRotate = 3
    const speedNorm = Math.min(Math.max(speed / 900, 0.35), 1.0)
    const rushX = dirX * maxOffset * speedNorm
    const rushY = dirY * maxOffset * speedNorm

    // Cross-product for delicate rotational deflection
    const u = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const d = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    const p = Math.min(Math.max(dirX * d - dirY * u, -1), 1)
    const rushRotate = -p * maxRotate * speedNorm

    if (inner._bumpAnim) {
      inner._bumpAnim.cancel()
    }

    // Buttery-smooth deflection & return — STRICTLY scale(1), ZERO pop out
    inner._bumpAnim = inner.animate(
      [
        { transform: 'translate(0px, 0px) rotate(0deg)' },
        {
          transform: `translate(${rushX.toFixed(1)}px, ${rushY.toFixed(1)}px) rotate(${rushRotate.toFixed(1)}deg)`,
          offset: 0.32,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },
        {
          transform: `translate(${(-rushX * 0.12).toFixed(1)}px, ${(-rushY * 0.12).toFixed(1)}px) rotate(${(-rushRotate * 0.12).toFixed(1)}deg)`,
          offset: 0.68,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },
        {
          transform: 'translate(0px, 0px) rotate(0deg)',
          offset: 1.0,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },
      ],
      {
        duration: 800,
        fill: 'none',
      }
    )
  }

  // Smooth proximity cursor wave across NAILEDITBRO letters
  const handleBackdropMouseMove = (e) => {
    if (!backdropRef.current) return
    const letters = backdropRef.current.querySelectorAll('.backdrop-letter')
    if (!letters || letters.length === 0) return

    let closest = 0
    let minD = Infinity
    letters.forEach((el, idx) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const d = Math.hypot(e.clientX - cx, (e.clientY - cy) * 1.4)
      if (d < minD) {
        minD = d
        closest = idx
      }
    })
    if (minD < 130) {
      setHoveredCharIndex(closest)
    } else {
      setHoveredCharIndex(null)
    }
  }

  useEffect(() => {
    const updateProgress = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    const timer = setTimeout(() => {
      const lenis = getLenis()
      if (lenis) {
        lenis.on('scroll', updateProgress)
      }
    }, 200)

    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      clearTimeout(timer)
      const lenis = getLenis()
      if (lenis) lenis.off('scroll', updateProgress)
    }
  }, [])

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
      if (e.key === 'Escape') setActiveModalItem(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Thresholds for the 5 pairs of cards appearing one by one on scroll
  const pairThresholds = [0.16, 0.30, 0.44, 0.58, 0.72]

  return (
    <section
      ref={containerRef}
      className="sky-hero-scroll-container"
      id="top"
      aria-label="Nailed It Bro Digital Studio Hero & Services Showcase"
    >
      <div className="sky-hero-sticky-frame">
        {/* ==================================================================
            1. WARM LUXURY AMBIENCE & BRAND GRADIENT LAYERS
            ================================================================== */}
        <div className="sky-ambient-layer" aria-hidden="true">
          <div className="sky-ambient-glow sky-ambient-glow--top" />
          <div className="sky-ambient-glow sky-ambient-glow--mascot-halo" />
          <div className="sky-ambient-glow sky-ambient-glow--floor" />
        </div>

        {/* Tactile Texture Layer (Studio Dot-Grid & Fine Paper Grain) */}
        <div className="hero-canvas-texture" aria-hidden="true" />

        {/* Ambient Motion Particles Field (Digital Agency Tech Nodes & Star Sparks) */}
        <HeroParticles scrollProgress={scrollProgress} />

        {/* ==================================================================
            1B. MONUMENTAL BRAND BACKDROP (Behind Mascot in Darker Slate & Orange)
            Crazy kinetic wave & elastic magnetic spring hover animation
            Zero blur/glow shadows — razor-sharp modern vector typography
            ================================================================== */}
        <div
          ref={backdropRef}
          className="hero-mascot-brand-backdrop"
          role="img"
          aria-label="Nailed It Bro Studio Brand"
          style={{
            transform: `translateX(-50%) translateY(${scrollProgress * 20}px)`,
            opacity: Math.max(1 - scrollProgress * 1.6, 0.25),
          }}
          onMouseMove={handleBackdropMouseMove}
          onMouseLeave={() => setHoveredCharIndex(null)}
        >
          <div className="backdrop-floating-inner">
            <span className="backdrop-word backdrop-word--nailed">
              {'NAILEDIT'.split('').map((char, i) => {
                const dist = hoveredCharIndex !== null ? Math.abs(hoveredCharIndex - i) : null
                return (
                  <span
                    key={`n-${i}`}
                    className={`backdrop-letter backdrop-letter--nailed ${dist === 0 ? 'is-hovered' : dist === 1 ? 'is-neighbor-1' : dist === 2 ? 'is-neighbor-2' : ''}`}
                    style={{
                      '--hover-tilt': `${(i % 2 === 0 ? -1 : 1) * (3 + (i % 3) * 2)}deg`,
                      '--char-i': i,
                    }}
                    onMouseEnter={() => setHoveredCharIndex(i)}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
            <span className="backdrop-word backdrop-word--bro">
              {'BRO'.split('').map((char, i) => {
                const globalIndex = i + 8
                const dist = hoveredCharIndex !== null ? Math.abs(hoveredCharIndex - globalIndex) : null
                return (
                  <span
                    key={`b-${i}`}
                    className={`backdrop-letter backdrop-letter--bro ${dist === 0 ? 'is-hovered' : dist === 1 ? 'is-neighbor-1' : dist === 2 ? 'is-neighbor-2' : ''}`}
                    style={{
                      '--hover-tilt': `${(i % 2 === 0 ? 1 : -1) * (4 + i * 2)}deg`,
                      '--char-i': globalIndex,
                    }}
                    onMouseEnter={() => setHoveredCharIndex(globalIndex)}
                  >
                    {char}
                  </span>
                )
              })}
            </span>
          </div>
        </div>

        {/* ==================================================================
            1C. FLOATING SERVICE & NICHE BADGES
            Web Development, Mobile Apps, Game Dev, AI Automation, Social Media
            Framer "HoverBump" Directional Rush & Spring Rebound Physics
            ================================================================== */}
        <div
          className="hero-floating-elements-layer"
          style={{
            opacity: Math.max(1 - scrollProgress * 3.5, 0),
            transform: `translateY(${scrollProgress * -30}px)`,
            pointerEvents: scrollProgress > 0.15 ? 'none' : 'auto',
          }}
        >
          {/* 1. Website Development (Cyan · Browser & Code) */}
          <div
            className="hero-floating-badge hero-floating-badge--web"
            title="Website Development"
            onPointerEnter={handleBadgePointerEnter}
          >
            <div className="floating-badge-inner">
              <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="18" rx="4" stroke="white" strokeWidth="2" fill="none" />
                <line x1="2" y1="8" x2="22" y2="8" stroke="white" strokeWidth="1.6" opacity="0.65" />
                <polyline points="7 12 5 14 7 16" stroke="white" strokeWidth="2" />
                <polyline points="13 12 15 14 13 16" stroke="white" strokeWidth="2" />
                <line x1="11" y1="12" x2="9" y2="16" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* 2. Social Media (Rose/Magenta · Viral Engagement) */}
          <div
            className="hero-floating-badge hero-floating-badge--social"
            title="Social Media Management"
            onPointerEnter={handleBadgePointerEnter}
          >
            <div className="floating-badge-inner">
              <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="8.5" cy="12" r="1.2" fill="white" stroke="none" />
                <circle cx="12" cy="12" r="1.2" fill="white" stroke="none" />
                <circle cx="15.5" cy="12" r="1.2" fill="white" stroke="none" />
              </svg>
            </div>
          </div>

          {/* 3. Mobile Apps Development (Emerald · Smartphone & App) */}
          <div
            className="hero-floating-badge hero-floating-badge--mobile"
            title="Mobile Apps Development"
            onPointerEnter={handleBadgePointerEnter}
          >
            <div className="floating-badge-inner">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="3.5" stroke="white" strokeWidth="2" fill="none" />
                <line x1="10" y1="5" x2="14" y2="5" stroke="white" strokeWidth="1.8" />
                <circle cx="12" cy="18.5" r="1.2" fill="white" stroke="none" />
                <rect x="8.5" y="8" width="3" height="3" rx="0.8" fill="white" stroke="none" />
                <rect x="12.5" y="8" width="3" height="3" rx="0.8" fill="white" stroke="none" />
                <rect x="8.5" y="12" width="3" height="3" rx="0.8" fill="white" stroke="none" />
                <rect x="12.5" y="12" width="3" height="3" rx="0.8" fill="white" stroke="none" />
              </svg>
            </div>
          </div>

          {/* 4. Game Development (Cosmic Purple · Gamepad Controller) */}
          <div
            className="hero-floating-badge hero-floating-badge--game"
            title="Game Development"
            onPointerEnter={handleBadgePointerEnter}
          >
            <div className="floating-badge-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="6" width="20" height="12" rx="6" stroke="white" strokeWidth="2" fill="none" />
                <path d="M6 12h4M8 10v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="15" cy="10.5" r="1.2" fill="white" stroke="none" />
                <circle cx="17.5" cy="12" r="1.2" fill="white" stroke="none" />
                <circle cx="15" cy="13.5" r="1.2" fill="white" stroke="none" />
                <circle cx="12.5" cy="12" r="1.2" fill="white" stroke="none" />
              </svg>
            </div>
          </div>

          {/* 5. AI Automation (Electric Orange · Neural Core & Autonomous Spark) */}
          <div
            className="hero-floating-badge hero-floating-badge--ai"
            title="AI Automation"
            onPointerEnter={handleBadgePointerEnter}
          >
            <div className="floating-badge-inner">
              <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="6" y="6" width="12" height="12" rx="2.8" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="2.2" fill="white" stroke="none" />
                <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" stroke="white" strokeWidth="1.8" />
              </svg>
            </div>
          </div>
        </div>

        {/* ==================================================================
            3. KINETIC HERO HEADER (Syne Display + Shimmering Accent)
            Fades smoothly as user scrolls down so screen stays clean for cards
            ================================================================== */}
        <header
          className="hero-brand-header"
          aria-label="Nailed It Bro Studio Hero Introduction"
          style={{
            transform: `translateY(${scrollProgress * -25}px) scale(${1 - scrollProgress * 0.08})`,
            transformOrigin: 'top center',
            opacity: Math.max(1 - scrollProgress * 4.2, 0),
            pointerEvents: scrollProgress > 0.15 ? 'none' : 'auto',
            transition: 'opacity 0.2s ease-out, transform 0.1s linear',
          }}
        >
          <m.h1
            className="hero-brand-title"
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-script-lead">We craft digital products that</span>
            <span className="hero-modern-headline">
              GET YOU{' '}
              <span className="hero-accent-wrap">
                <em className="hero-brand-accent">CUSTOMERS.</em>
                <span className="hero-accent-glow" aria-hidden="true" />
              </span>
            </span>
          </m.h1>
        </header>

        {/* ==================================================================
            3B. DOCKED SERVICES PILL (Fades in on scroll above mascot)
            ================================================================== */}
        <div
          className="hero-services-dock"
          aria-hidden={scrollProgress <= 0.15}
          style={{
            opacity: Math.min(Math.max((scrollProgress - 0.14) * 4.5, 0), 1),
            transform: `translateX(-50%) translateY(${Math.min(Math.max((scrollProgress - 0.14) * 16, 0), 12)}px)`,
            pointerEvents: scrollProgress > 0.15 ? 'auto' : 'none',
          }}
        >
          <div className="hero-services-dock-pill">
            <span className="dock-pill-sparkle">✦</span>
            <span className="dock-pill-title">10 Founder-Led Disciplines</span>
            <span className="dock-pill-sep">·</span>
            <span className="dock-pill-hint">Click any card to inspect deliverables</span>
          </div>
        </div>

        {/* ==================================================================
            4. 10 SERVICE CARDS (2 ROWS SIDEWAYS · 5 ON LEFT, 5 ON RIGHT)
            Appear one-by-one as user scrolls down through the pinned stage
            ================================================================== */}
        <div className="hero-sideways-services" role="region" aria-label="10 Studio Disciplines">
          {/* LEFT COLUMN: 5 Services */}
          <div className="hero-services-col hero-services-col--left">
            {SERVICES_LEFT.map((svc, i) => {
              const isRevealed = scrollProgress >= pairThresholds[i]
              return (
                <div
                  key={svc.id}
                  className={`hero-sideway-card hero-sideway-card--left ${isRevealed ? 'is-revealed' : ''}`}
                  onClick={() => setActiveModalItem(svc)}
                  title={`Inspect ${svc.title} specs`}
                  style={{
                    transform: isRevealed
                      ? 'translateX(0px) scale(1)'
                      : 'translateX(-40px) scale(0.92)',
                    opacity: isRevealed ? 1 : 0,
                    pointerEvents: isRevealed ? 'auto' : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="sideway-card-header">
                    <span className="sideway-card-no" style={{ color: svc.tone }}>
                      {svc.no}
                    </span>
                    <span className="sideway-card-category">{svc.category}</span>
                  </div>
                  <div className="sideway-card-body">
                    <h4 className="sideway-card-title">{svc.title}</h4>
                    <p className="sideway-card-desc">{svc.desc}</p>
                  </div>
                  <div className="sideway-card-footer">
                    <span className="sideway-card-tag">{svc.deliverables[0]}</span>
                    <span className="sideway-card-arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT COLUMN: 5 Services */}
          <div className="hero-services-col hero-services-col--right">
            {SERVICES_RIGHT.map((svc, i) => {
              const isRevealed = scrollProgress >= pairThresholds[i]
              return (
                <div
                  key={svc.id}
                  className={`hero-sideway-card hero-sideway-card--right ${isRevealed ? 'is-revealed' : ''}`}
                  onClick={() => setActiveModalItem(svc)}
                  title={`Inspect ${svc.title} specs`}
                  style={{
                    transform: isRevealed
                      ? 'translateX(0px) scale(1)'
                      : 'translateX(40px) scale(0.92)',
                    opacity: isRevealed ? 1 : 0,
                    pointerEvents: isRevealed ? 'auto' : 'none',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="sideway-card-header">
                    <span className="sideway-card-no" style={{ color: svc.tone }}>
                      {svc.no}
                    </span>
                    <span className="sideway-card-category">{svc.category}</span>
                  </div>
                  <div className="sideway-card-body">
                    <h4 className="sideway-card-title">{svc.title}</h4>
                    <p className="sideway-card-desc">{svc.desc}</p>
                  </div>
                  <div className="sideway-card-footer">
                    <span className="sideway-card-tag">{svc.deliverables[0]}</span>
                    <span className="sideway-card-arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ==================================================================
            5. SCROLL-DRIVEN 3D MASCOT (NO MOUSE DRAG, PURE CINEMATIC SCROLL)
            - Initial (scroll 0): Centered, half-body, looking straight forward
            - On Scroll: Appears FULL BODY & CENTERED with dynamic presentation orbit
            ================================================================== */}
        <div className="sky-scroll-mascot-container">
          <div
            className="sky-scroll-mascot-wrap"
            style={{
              transform: `translateX(-50%) translateY(${150 + scrollProgress * 15}px) scale(${(1.24 - scrollProgress * 0.18).toFixed(3)})`,
              height: `clamp(640px, ${76 + scrollProgress * 16}vh, 920px)`,
              maskImage:
                scrollProgress >= 0.82
                  ? 'none'
                  : `linear-gradient(to bottom, #000 0%, #000 ${78 + scrollProgress * 22}%, rgba(0,0,0,0) ${96 + scrollProgress * 4}%)`,
              WebkitMaskImage:
                scrollProgress >= 0.82
                  ? 'none'
                  : `linear-gradient(to bottom, #000 0%, #000 ${78 + scrollProgress * 22}%, rgba(0,0,0,0) ${96 + scrollProgress * 4}%)`,
            }}
          >
            {hasModelViewer ? (
              <model-viewer
                src="/mascot.glb"
                poster="/avatar_front_clean.png"
                alt="Nailed It Bro 3D Studio Mascot"
                camera-orbit={`${Math.sin(scrollProgress * Math.PI) * -14}deg ${88 - scrollProgress * 12}deg ${Math.round(34 + scrollProgress * 42)}%`}
                camera-target={`0m ${(0.28 - scrollProgress * 0.14).toFixed(2)}m 0m`}
                interpolation-decay="160"
                interaction-prompt="none"
                shadow-intensity="0"
                shadow-softness="0"
                exposure="1.08"
                environment-image="neutral"
                loading="eager"
                reveal="auto"
                className="sky-scroll-mascot-model"
                style={{
                  '--progress-bar-color': 'transparent',
                  '--progress-bar-height': '0px',
                  pointerEvents: 'none',
                }}
              >
                <img
                  src="/avatar_front_clean.png"
                  alt="3D Mascot Fallback"
                  className="sky-scroll-mascot-fallback"
                  slot="poster"
                  style={{
                    transform: `scale(${(1.36 - scrollProgress * 0.36).toFixed(3)})`,
                    transformOrigin: '50% 28%',
                  }}
                />
              </model-viewer>
            ) : (
              <img
                src="/avatar_front_clean.png"
                alt="Nailed It Bro 3D Mascot"
                className="sky-scroll-mascot-fallback"
                style={{
                  transform: `scale(${(1.36 - scrollProgress * 0.36).toFixed(3)})`,
                  transformOrigin: '50% 28%',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================
          INTERACTIVE SERVICE BLUEPRINT & SCOPE MODAL (Triggered by any card)
          ================================================================== */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="sky-modal-backdrop" onClick={() => setActiveModalItem(null)}>
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
                  <span style={{ color: activeModalItem.tone }}>
                    {activeModalItem.no} — {activeModalItem.category}
                  </span>
                </div>
                <button
                  type="button"
                  className="sky-modal-close"
                  onClick={() => setActiveModalItem(null)}
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              <div className="sky-modal-hero">
                <div className="sky-modal-media">
                  <img
                    src={activeModalItem.thumbnail}
                    alt={activeModalItem.title}
                    className="sky-modal-img"
                  />
                </div>
                <div className="sky-modal-headline-block">
                  <span className="sky-modal-kicker">DISCIPLINE {activeModalItem.no}</span>
                  <h3 id="sky-modal-title" className="sky-modal-title">
                    {activeModalItem.title}
                  </h3>
                  <p className="sky-modal-desc">{activeModalItem.desc}</p>
                </div>
              </div>

              <div className="sky-modal-body">
                <div className="sky-modal-col">
                  <h4 className="sky-modal-section-title">Verified Deliverables</h4>
                  <ul className="sky-modal-list">
                    {activeModalItem.deliverables.map((item, i) => (
                      <li key={i} className="sky-modal-item">
                        <span className="sky-modal-check" style={{ color: activeModalItem.tone }}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sky-modal-col sky-modal-col--meta">
                  <div className="sky-meta-block">
                    <span className="sky-meta-label">Timeline</span>
                    <span className="sky-meta-value">{activeModalItem.timeline}</span>
                  </div>
                  <div className="sky-meta-block">
                    <span className="sky-meta-label">Expected Outcome</span>
                    <span className="sky-meta-value">{activeModalItem.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="sky-modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalItem(null)
                    scrollToTarget('#services')
                  }}
                  className="sky-modal-cta"
                  style={{ backgroundColor: '#FF5E14', borderColor: '#FF5E14' }}
                >
                  <span>Start a Project with This Discipline</span>
                  <span className="sky-modal-arrow">→</span>
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
