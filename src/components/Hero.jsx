import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './NuriaHero.css'

// 5 Core Services & Capabilities of Nailed It Bro
const SERVICES = [
  {
    id: 'web',
    name: 'Website Dev',
    tagline: 'Custom websites engineered to convert visitors into clients.',
    accent: '#0077FF',
    color: '#0088FF',
    target: '#work',
    description: 'Ultra-fast business websites & web apps. Built with Next-gen performance, high Google rank & seamless responsiveness.',
  },
  {
    id: 'app',
    name: 'Mobile Apps',
    tagline: 'Smooth Android & iOS native apps your users open daily.',
    accent: '#10B981',
    color: '#10B981',
    target: '#services',
    description: 'High-performance mobile engineering with cloud sync, offline support & push notifications.',
  },
  {
    id: 'ai',
    name: 'AI & QR Tools',
    tagline: 'Smart QR solutions & automated booking that saves hours daily.',
    accent: '#F59E0B',
    color: '#F59E0B',
    target: '#services',
    description: 'Digital menus, automated appointment scheduling, WhatsApp workflows & smart customer capture.',
  },
  {
    id: 'game',
    name: '3D Games',
    tagline: 'Custom 3D mobile games & experiences players keep replaying.',
    accent: '#06B6D4',
    color: '#06B6D4',
    target: '#services',
    description: 'Custom physics, real-time mechanics & optimized 3D graphics tuned for mid-range mobile devices.',
  },
  {
    id: 'social',
    name: 'Social Media',
    tagline: 'Omnichannel campaigns & content that turn scrollers into buyers.',
    accent: '#EC4899',
    color: '#EC4899',
    target: '#services',
    description: 'Short-form video production, creator distribution & tracked conversion funnels with clear ROI.',
  },
]

export default function Hero({ ready }) {
  const root = useRef(null)
  const [hoveredService, setHoveredService] = useState(null)
  const [activeChipIdx, setActiveChipIdx] = useState(0)

  // Current active service from hover or selection
  const currentService = hoveredService || SERVICES[activeChipIdx]

  // Intro GSAP Timeline
  useGSAP(
    () => {
      const intro = gsap.timeline({ paused: true, defaults: { ease: EASE.out } })

      intro
        .fromTo(
          '.nuria-type-line',
          { autoAlpha: 0, y: 40, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' },
          0.05
        )
        .fromTo(
          '.nuria-script-line',
          { autoAlpha: 0, y: 25 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          0.3
        )
        .fromTo(
          '.nuria-sticker',
          { autoAlpha: 0, scale: 0.4, y: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'back.out(1.8)',
          },
          0.25
        )
        .fromTo(
          '.nuria-compact-bar',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.55
        )

      root.current._intro = intro
      if (ready) intro.play()
    },
    { dependencies: [ready], scope: root }
  )

  // Desktop Pointer Parallax Tilt on the canvas
  useEffect(() => {
    const canvas = root.current?.querySelector('.nuria-hero-canvas')
    if (!canvas) return

    const handlePointerMove = (e) => {
      if (window.innerWidth < 900) return
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.5)
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.5)

      gsap.to(canvas, {
        rotateY: deltaX * 4,
        rotateX: -deltaY * 4,
        duration: 0.8,
        ease: 'power2.out',
        transformPerspective: 1200,
      })
    }

    const handlePointerLeave = () => {
      gsap.to(canvas, {
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
      })
    }

    window.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  const handleServiceClick = useCallback((target) => {
    scrollToTarget(target || '#services')
  }, [])

  return (
    <section
      className="nuria-viewport-hero"
      id="top"
      ref={root}
      data-theme="dark"
      aria-labelledby="hero-title"
      style={{
        '--active-service-color': currentService.accent,
      }}
    >
      {/* Dark Ambient Lighting & Spot matching screenshot */}
      <div className="nuria-backdrop" aria-hidden="true" />
      <div className="nuria-ambient-spot" aria-hidden="true" />
      <div className="nuria-vignette" aria-hidden="true" />

      <div className="nuria-stage">
        {/* ==================================================================
            Hero Canvas: Giant Typography + Overlapping Floating Stickers
            ================================================================== */}
        <div className="nuria-hero-canvas">
          {/* FLOATING STICKER 1: Avatar Circle (Top Center-Left, overlapping top word) */}
          <div
            className="nuria-sticker sticker-avatar"
            title="Nailed It Bro Studio Mascot"
            tabIndex={0}
            role="button"
            aria-label="Studio Mascot Avatar"
            onMouseEnter={() =>
              setHoveredService({
                name: 'Nailed It Bro',
                tagline: 'Design with Taste · Code with Rigour.',
                accent: '#FF5E14',
              })
            }
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="sticker-avatar__circle">
              <img
                src="/avatar_front_3d.png"
                alt="Nailed It Bro Mascot"
                draggable="false"
              />
            </div>
            <div className="nuria-sticker__tooltip">Nailed It Bro 🔨</div>
          </div>

          {/* FLOATING STICKER 2: Available for Work Pill (Top Center) */}
          <div
            className="nuria-sticker sticker-available"
            title="Available for Q4 projects"
            role="button"
            tabIndex={0}
            onClick={() => scrollToTarget('#contact')}
          >
            <div className="sticker-available__pill">
              <span className="sticker-available__dot" aria-hidden="true" />
              <span>Available for work</span>
            </div>
            <div className="nuria-sticker__tooltip">Available for Q4 Projects</div>
          </div>

          {/* FLOATING STICKER 3: Website Dev 3D Blue Squircle (Framer-style, Top Right) */}
          <div
            className="nuria-sticker sticker-web"
            title="Website Design & Engineering"
            role="button"
            tabIndex={0}
            onClick={() => handleServiceClick('#work')}
            onMouseEnter={() => setHoveredService(SERVICES[0])}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="nuria-squircle-badge squircle-web">
              {/* 3D Web Dev Code Glyphs */}
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div className="nuria-sticker__tooltip">Website Dev · High-Converting</div>
          </div>

          {/* FLOATING STICKER 4: Retro Pixel Hand Pointer (Bottom Left, overlapping bottom word) */}
          <div
            className="nuria-sticker sticker-cursor"
            title="Click to explore work"
            role="button"
            tabIndex={0}
            onClick={() => scrollToTarget('#work')}
          >
            {/* Retro 8-Bit Pixel Pointer Cursor matching the screenshot */}
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
            <div className="nuria-sticker__tooltip">Click to Explore</div>
          </div>

          {/* FLOATING STICKER 5: Mobile App 3D Squircle (Figma-style, Bottom Right) */}
          <div
            className="nuria-sticker sticker-app"
            title="Mobile App Development"
            role="button"
            tabIndex={0}
            onClick={() => handleServiceClick('#services')}
            onMouseEnter={() => setHoveredService(SERVICES[1])}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="nuria-squircle-badge squircle-app">
              {/* 3D Mobile Smartphone Icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
              </svg>
            </div>
            <div className="nuria-sticker__tooltip">Mobile Apps · Android &amp; iOS</div>
          </div>

          {/* FLOATING STICKER 6: AI & QR Automation 3D Squircle (Floating Mid-Right) */}
          <div
            className="nuria-sticker sticker-ai"
            title="QR Solutions & AI Automation"
            role="button"
            tabIndex={0}
            onClick={() => handleServiceClick('#services')}
            onMouseEnter={() => setHoveredService(SERVICES[2])}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="nuria-squircle-badge squircle-ai">
              {/* AI Neural / QR Spark Matrix Icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <circle cx="17.5" cy="17.5" r="3" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="nuria-sticker__tooltip">QR &amp; AI Automation</div>
          </div>

          {/* FLOATING STICKER 7: 3D Mobile Game Controller (Floating Mid-Left) */}
          <div
            className="nuria-sticker sticker-game"
            title="3D Mobile Game Development"
            role="button"
            tabIndex={0}
            onClick={() => handleServiceClick('#services')}
            onMouseEnter={() => setHoveredService(SERVICES[3])}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="nuria-squircle-badge squircle-game">
              {/* 3D Gamepad Controller Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="6" />
                <path d="M6 12h4m-2-2v4" />
                <circle cx="15" cy="11" r="1" fill="#FFFFFF" />
                <circle cx="18" cy="13" r="1" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="nuria-sticker__tooltip">3D Mobile Games</div>
          </div>

          {/* FLOATING STICKER 8: Social Media & Growth (Floating Bottom-Center) */}
          <div
            className="nuria-sticker sticker-social"
            title="Social Media Management & Marketing"
            role="button"
            tabIndex={0}
            onClick={() => handleServiceClick('#services')}
            onMouseEnter={() => setHoveredService(SERVICES[4])}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="nuria-squircle-badge squircle-social">
              {/* Growth Analytics Trend Arrow Icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div className="nuria-sticker__tooltip">Social Media &amp; Growth</div>
          </div>

          {/* ================================================================
              GIANT MONUMENTAL TYPOGRAPHY (Exactly like screenshot)
              ================================================================ */}
          <h1 className="nuria-giant-type" id="hero-title">
            <span className="nuria-type-line">DIGITAL</span>
            <span className="nuria-type-line">STUDIO</span>
          </h1>

          {/* ================================================================
              ROMANTIC ITALIC SERIF SCRIPT DIRECTLY UNDER TITLE
              ================================================================ */}
          <div className="nuria-script-line serif">
            {hoveredService ? (
              <span>
                focusing on <em>{hoveredService.name}</em>
              </span>
            ) : (
              <span>with taste &amp; rigour</span>
            )}
          </div>
        </div>

        {/* ==================================================================
            COMPACT BOTTOM BAR (Fits strictly inside 100vh with no scroll)
            ================================================================== */}
        <div className="nuria-compact-bar">
          <p className="nuria-context-text">
            {currentService.tagline ||
              'We build high-converting websites, mobile apps, QR automation & 3D games that get you customers.'}
          </p>

          <div className="nuria-compact-ctas">
            <Magnetic strength={0.22}>
              <a
                href="#contact"
                className="btn btn--dark nuria-primary-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#contact')
                }}
              >
                <span>Start a Project</span>
                <span className="nuria-arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.22}>
              <a
                href="#work"
                className="btn btn--ghost nuria-ghost-btn"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToTarget('#work')
                }}
              >
                <span>Explore Selected Work</span>
              </a>
            </Magnetic>
          </div>

          {/* Quick Micro-Service Pills for the 5 services */}
          <div className="nuria-micro-services" role="tablist" aria-label="Services List">
            {SERVICES.map((srv, idx) => {
              const isActive = srv.id === currentService.id
              return (
                <button
                  key={srv.id}
                  type="button"
                  className={`nuria-micro-chip ${isActive ? 'is-active' : ''}`}
                  style={{ '--chip-accent': srv.accent }}
                  onClick={() => {
                    setActiveChipIdx(idx)
                    handleServiceClick(srv.target)
                  }}
                  onMouseEnter={() => setHoveredService(srv)}
                  onMouseLeave={() => setHoveredService(null)}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="nuria-micro-chip__dot" aria-hidden="true" />
                  <span>{srv.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
