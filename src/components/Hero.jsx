import { useState, useCallback } from 'react'
import { m } from 'motion/react'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './NuriaHero.css'

// 5 Core Services of Nailed It Bro
const SERVICES = [
  {
    id: 'web',
    name: 'Website Dev',
    tagline: 'Custom websites engineered to convert visitors into paying clients.',
    accent: '#0077FF',
    target: '#work',
  },
  {
    id: 'app',
    name: 'Mobile Apps',
    tagline: 'Smooth Android & iOS native apps your users open daily.',
    accent: '#10B981',
    target: '#services',
  },
  {
    id: 'ai',
    name: 'AI & QR Tools',
    tagline: 'Smart QR solutions & automated booking that saves hours daily.',
    accent: '#F59E0B',
    target: '#services',
  },
  {
    id: 'game',
    name: '3D Games',
    tagline: 'Custom 3D mobile games & interactive worlds players keep replaying.',
    accent: '#06B6D4',
    target: '#services',
  },
  {
    id: 'social',
    name: 'Social Media',
    tagline: 'Omnichannel campaigns & content that turn scrollers into buyers.',
    accent: '#EC4899',
    target: '#services',
  },
]

export default function Hero({ ready }) {
  const [hoveredService, setHoveredService] = useState(null)
  const [activeChipIdx, setActiveChipIdx] = useState(0)

  // Current active service from hover or selection
  const currentService = hoveredService || SERVICES[activeChipIdx]

  const handleServiceClick = useCallback((target) => {
    scrollToTarget(target || '#services')
  }, [])

  return (
    <section
      className="nuria-viewport-hero"
      id="top"
      data-theme="dark"
      aria-labelledby="hero-title"
      style={{
        '--active-service-color': currentService?.accent || '#FF5E14',
      }}
    >
      {/* Brand Electric Orange & Warm Beige Ambient Lighting */}
      <div className="nuria-backdrop" aria-hidden="true" />
      <div className="nuria-ambient-spot" aria-hidden="true" />
      <div className="nuria-vignette" aria-hidden="true" />

      <div className="nuria-stage">
        {/* ==================================================================
            Hero Canvas: Giant Typography + 5 Overlapping Draggable Stickers
            ================================================================== */}
        <div className="nuria-hero-canvas">
          {/* STICKER 1: Avatar Circle (Top Left Shoulder of DIGITAL) */}
          <m.div
            className="nuria-sticker sticker-avatar"
            title="Nailed It Bro Studio Mascot (Drag me!)"
            tabIndex={0}
            role="button"
            aria-label="Studio Mascot Avatar"
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            dragElastic={0.2}
            animate={{
              y: [0, -9, 0],
              rotate: [-4.5, -3, -4.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.15,
              rotate: 0,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.95 }}
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
          </m.div>

          {/* STICKER 2: Available for Work Pill (Top Center Nestled Indent) */}
          <m.div
            className="nuria-sticker sticker-available"
            title="Available for Q4 projects"
            role="button"
            tabIndex={0}
            drag
            dragConstraints={{ top: -15, bottom: 15, left: -15, right: 15 }}
            dragElastic={0.2}
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.6,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            whileHover={{
              scale: 1.12,
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

          {/* STICKER 3: Website Dev 3D Blue Squircle (Top Right over DIGITAL) */}
          <m.div
            className="nuria-sticker sticker-web"
            title="Website Design & Engineering (Drag me!)"
            role="button"
            tabIndex={0}
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            dragElastic={0.2}
            animate={{
              y: [0, -10, 0],
              rotate: [6, 7.5, 6],
            }}
            transition={{
              repeat: Infinity,
              duration: 5.2,
              ease: 'easeInOut',
              delay: 1,
            }}
            whileHover={{
              scale: 1.15,
              rotate: 0,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.95 }}
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
          </m.div>

          {/* STICKER 4: Retro Pixel Hand Cursor (Bottom Left over STUDIO) */}
          <m.div
            className="nuria-sticker sticker-cursor"
            title="Click to explore work (Drag me!)"
            role="button"
            tabIndex={0}
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            dragElastic={0.2}
            animate={{
              y: [0, -8, 0],
              rotate: [0, 1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: 'easeInOut',
              delay: 1.4,
            }}
            whileHover={{
              scale: 1.15,
              rotate: -8,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToTarget('#work')}
          >
            {/* Retro 8-Bit Pixel Pointer Cursor matching reference */}
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
          </m.div>

          {/* STICKER 5: Mobile App 3D Squircle (Bottom Right over STUDIO) */}
          <m.div
            className="nuria-sticker sticker-app"
            title="Mobile App Development (Drag me!)"
            role="button"
            tabIndex={0}
            drag
            dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
            dragElastic={0.2}
            animate={{
              y: [0, -9, 0],
              rotate: [-4.5, -3, -4.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 5.1,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            whileHover={{
              scale: 1.15,
              rotate: 0,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.95 }}
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
          </m.div>

          {/* ================================================================
              GIANT MONUMENTAL TYPOGRAPHY (Bold architectural lockup)
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
            BOTTOM BLOCK: Generously spaced, warm beige & electric orange
            ================================================================== */}
        <div className="nuria-bottom-block">
          <p className="nuria-context-text">
            {currentService?.tagline ||
              'We build high-converting websites, mobile apps, QR automation & 3D games that get you customers.'}
          </p>

          <div className="nuria-compact-ctas">
            <Magnetic strength={0.22}>
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

            <Magnetic strength={0.22}>
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

          {/* Refined Horizontal Service Discipline Dock */}
          <nav className="nuria-services-dock" aria-label="Services Dock">
            {SERVICES.map((srv, idx) => {
              const isActive = srv.id === currentService?.id
              return (
                <button
                  key={srv.id}
                  type="button"
                  className={`nuria-dock-chip ${isActive ? 'is-active' : ''}`}
                  style={{ '--chip-accent': srv.accent }}
                  onClick={() => {
                    setActiveChipIdx(idx)
                    handleServiceClick(srv.target)
                  }}
                  onMouseEnter={() => setHoveredService(srv)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <span className="nuria-dock-chip__num">0{idx + 1}</span>
                  <span className="nuria-dock-chip__dot" aria-hidden="true" />
                  <span>{srv.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </section>
  )
}
