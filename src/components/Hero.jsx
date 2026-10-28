import { useState, useCallback } from 'react'
import { m } from 'motion/react'
import { scrollToTarget } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './NuriaHero.css'

export default function Hero() {
  const [activeTooltip, setActiveTooltip] = useState(null)

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
      {/* Brand Electric Orange Ambient Backdrop */}
      <div className="nuria-backdrop" aria-hidden="true" />
      <div className="nuria-ambient-spot" aria-hidden="true" />
      <div className="nuria-vignette" aria-hidden="true" />

      {/* Main Hero Container: Perfectly Centered */}
      <div className="nuria-center-wrap">
        {/* ==================================================================
            Typographic Canvas with 5 Floating Tactile Stickers
            ================================================================== */}
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
            onMouseEnter={() => setActiveTooltip('Studio Mascot 🔨')}
            onMouseLeave={() => setActiveTooltip(null)}
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
            onMouseEnter={() => setActiveTooltip('Available for Q4 Projects')}
            onMouseLeave={() => setActiveTooltip(null)}
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
            onClick={() => handleScroll('#work')}
            onMouseEnter={() => setActiveTooltip('Website Design & Development')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="nuria-squircle-badge squircle-web">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
            onClick={() => handleScroll('#services')}
            onMouseEnter={() => setActiveTooltip('Android & Mobile Apps')}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="nuria-squircle-badge squircle-app">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
              </svg>
            </div>
            <div className="nuria-sticker__tooltip">Mobile Apps · Android &amp; iOS</div>
          </m.div>

          {/* Monumental Typography (Clean, uncompressed leading) */}
          <h1 className="nuria-giant-type" id="hero-title">
            <span className="nuria-type-line">DIGITAL</span>
            <span className="nuria-type-line">STUDIO</span>
          </h1>

          {/* Signature Cursive Italic Script */}
          <div className="nuria-script-line serif">
            {activeTooltip ? (
              <span>{activeTooltip}</span>
            ) : (
              <span>with taste &amp; rigour</span>
            )}
          </div>
        </div>

        {/* Clean, uncluttered Dual CTAs (Only 2 buttons, no crowded stacks) */}
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

      {/* ==================================================================
          Refined Studio Meta Bar at Bottom Edge (Muted, Elegant, Grounded)
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
