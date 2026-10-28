import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, useGSAP, EASE, DUR } from '../lib/motion'
import { scrollToTarget, getLenis } from '../lib/useSmoothScroll'
import Magnetic from './Magnetic'
import './NuriaHero.css'

const SERVICES = [
  {
    id: 'studio',
    label: 'Overview',
    eyebrow: 'Digital Studio · Brands, Websites & Apps',
    titlePrefix: 'We craft digital products that get you',
    titleHighlight: 'customers.',
    sub: 'Nailed It Bro is a design and engineering studio. We build fast websites, mobile apps and booking automation, and run social media campaigns that turn attention into enquiries.',
    accent: '#FF5E14',
    badge: 'Digital Studio',
    stats: '50+ Launched · 4.9★',
  },
  {
    id: 'web',
    label: 'Website Dev',
    eyebrow: 'Custom Website Design & Engineering',
    titlePrefix: 'Websites engineered to convert visitors into',
    titleHighlight: 'buyers.',
    sub: 'Custom-designed business websites and web apps that load instantly, work seamlessly on every device, and rank on Google. Easy to maintain, secure, and built for real business enquiries.',
    accent: '#FF5E14',
    badge: 'High-Converting Web',
    stats: 'Sub-second Load · SEO Ready',
  },
  {
    id: 'app',
    label: 'Mobile App',
    eyebrow: 'Android & Cross-Platform Engineering',
    titlePrefix: 'Mobile apps your users open',
    titleHighlight: 'daily.',
    sub: 'Smooth Android apps built from a single high-performance codebase, featuring offline support, real-time push notifications, and a scalable cloud backend. From initial wireframes to Play Store launch.',
    accent: '#10B981',
    badge: 'Android & Cloud',
    stats: 'Play Store Ready · 60 FPS',
  },
  {
    id: 'ai',
    label: 'AI Automation',
    eyebrow: 'QR Menus & AI Booking Systems',
    titlePrefix: 'QR and AI tools that save you valuable',
    titleHighlight: 'hours.',
    sub: 'From digital menus, booking engines, and payments to lead capture and WhatsApp automation. We build tools that handle repetitive workflows so you never answer the same questions twice.',
    accent: '#D97706',
    badge: 'Automation & QR',
    stats: '24/7 Auto-Pilot · Zero Friction',
  },
  {
    id: 'game',
    label: '3D Games',
    eyebrow: '3D Mobile Games & Interactive Worlds',
    titlePrefix: '3D mobile experiences players keep',
    titleHighlight: 'replaying.',
    sub: 'Custom 3D gameplay, realistic physics, responsive touch controls, and immersive mechanics, optimized to run fluidly on mid-range smartphones without battery drain.',
    accent: '#06B6D4',
    badge: '3D Interactive',
    stats: 'Custom Physics · Mid-range Optimized',
  },
  {
    id: 'social',
    label: 'Social Media',
    eyebrow: 'Social Media & Performance Growth',
    titlePrefix: 'Content campaigns that turn scrollers into',
    titleHighlight: 'clients.',
    sub: 'High-retention short-form video, creative distribution, and tracked growth campaigns designed to turn passive viewers into qualified enquiries and revenue.',
    accent: '#EC4899',
    badge: 'Growth & Content',
    stats: 'Tracked ROI · Multi-Platform',
  },
]

// 3D Avatar Turnaround Frames for Scroll Reaction
const AVATAR_FRAMES = [
  '/avatar_front_3d.png',
  '/turn_1_fl.png',
  '/turn_2_left.png',
  '/turn_3_back.png',
  '/turn_4_right.png',
  '/turn_5_fr.png',
  '/avatar_front_nailed.png',
]

export default function Hero({ ready }) {
  const root = useRef(null)
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)
  const [frameIdx, setFrameIdx] = useState(0)
  const [isStriking, setIsStriking] = useState(false)
  const [impactCount, setImpactCount] = useState(0)
  const hitAudioRef = useRef(null)

  const activeService = SERVICES[activeServiceIdx]

  // Preload turnaround images & audio
  useEffect(() => {
    AVATAR_FRAMES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
    hitAudioRef.current = new Audio('/hammer_hit.wav')
    hitAudioRef.current.volume = 0.4
  }, [])

  // Lenis / Window scroll effect on the 3D Avatar (Nuria focal element)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const heroHeight = root.current ? root.current.offsetHeight : 800
      const progress = Math.min(Math.max(scrollY / (heroHeight * 0.7), 0), 1)

      // Map scroll progress to turnaround frames
      const targetFrame = Math.min(
        Math.floor(progress * (AVATAR_FRAMES.length - 1)),
        AVATAR_FRAMES.length - 1
      )
      setFrameIdx(targetFrame)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const lenis = getLenis()
    if (lenis) {
      lenis.on('scroll', handleScroll)
    }
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (lenis) lenis.off('scroll', handleScroll)
    }
  }, [])

  // Trigger interactive hammer strike
  const triggerHammerHit = useCallback(() => {
    setIsStriking(true)
    setImpactCount((c) => c + 1)
    if (hitAudioRef.current) {
      hitAudioRef.current.currentTime = 0
      hitAudioRef.current.play().catch(() => {})
    }
    setTimeout(() => {
      setIsStriking(false)
    }, 650)
  }, [])

  // Intro timeline animation
  useGSAP(
    () => {
      const intro = gsap.timeline({ paused: true, defaults: { ease: EASE.out } })
      intro
        .fromTo('.nuria-beacon', { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.05)
        .fromTo(
          '.nuria-title__word',
          { autoAlpha: 0, y: 35, rotateX: 25 },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.04, ease: 'power3.out' },
          0.15
        )
        .fromTo(
          '.nuria-title__serif',
          { autoAlpha: 0, y: 30, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
          0.35
        )
        .fromTo('.nuria-sub', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.45)
        .fromTo(
          '.nuria-centerpiece',
          { autoAlpha: 0, scale: 0.9, y: 40 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.3, ease: 'power3.out' },
          0.3
        )
        .fromTo(
          '.nuria-sticker--left',
          { autoAlpha: 0, x: -30, rotate: -12 },
          { autoAlpha: 1, x: 0, rotate: -3.5, duration: 1, ease: 'back.out(1.4)' },
          0.5
        )
        .fromTo(
          '.nuria-sticker--right',
          { autoAlpha: 0, x: 30, rotate: 12 },
          { autoAlpha: 1, x: 0, rotate: 3.5, duration: 1, ease: 'back.out(1.4)' },
          0.55
        )
        .fromTo('.nuria-ctas', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.65)
        .fromTo('.nuria-services-nav', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.75)
        .fromTo('.nuria-meta', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.85)

      root.current._intro = intro
      if (ready) intro.play()
    },
    { dependencies: [ready], scope: root }
  )

  // Interactive 3D tilt on desktop pointer move
  useEffect(() => {
    const stage = root.current?.querySelector('.nuria-centerpiece')
    if (!stage) return

    const handlePointerMove = (e) => {
      if (window.innerWidth < 900) return
      const rect = stage.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.5)
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.5)

      gsap.to(stage, {
        rotateY: deltaX * 8,
        rotateX: -deltaY * 8,
        duration: 0.8,
        ease: 'power2.out',
        transformPerspective: 1200,
      })
    }

    const handlePointerLeave = () => {
      gsap.to(stage, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'power3.out',
      })
    }

    window.addEventListener('pointermove', handlePointerMove)
    stage.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      stage.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <section
      className="hero nuria-hero"
      id="top"
      ref={root}
      data-theme="dark"
      aria-labelledby="hero-title"
      style={{ '--hero-accent': activeService.accent }}
    >
      {/* Nuria-style Moody Atmospheric Glows & Architectural Grid */}
      <div className="nuria-ambient-mesh" aria-hidden="true" />
      <div
        className="nuria-ambient-orb"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, ${activeService.accent}33 0%, ${activeService.accent}0d 45%, transparent 72%)`,
        }}
        aria-hidden="true"
      />
      <div className="nuria-grid-overlay" aria-hidden="true" />

      <div className="nuria-container container">
        {/* Top Floating Beacon Pill (Nuria style availability indicator) */}
        <div className="nuria-beacon" data-intro>
          <span className="nuria-beacon__pulse" aria-hidden="true">
            <span
              className="nuria-beacon__ping"
              style={{ borderColor: activeService.accent }}
            />
            <span
              className="nuria-beacon__dot"
              style={{ backgroundColor: activeService.accent }}
            />
          </span>
          <span className="nuria-beacon__text">Available for Q4 & New Projects</span>
          <span className="nuria-beacon__sep" aria-hidden="true">·</span>
          <span className="nuria-beacon__loc">Mumbai & Worldwide</span>
        </div>

        {/* Monumental Centered Editorial Headline (Nuria display typography) */}
        <div className="nuria-title-wrap" data-intro>
          <p className="nuria-eyebrow">
            <span className="nuria-eyebrow__dash" style={{ background: activeService.accent }} />
            <span>{activeService.eyebrow}</span>
          </p>

          <h1 className="nuria-title display" id="hero-title">
            <span className="nuria-title__row">
              <span className="nuria-title__word">We</span>
              <span className="nuria-title__word">craft</span>
              <span className="nuria-title__word">digital</span>
              <span className="nuria-title__word">products</span>
            </span>
            <span className="nuria-title__row">
              <span className="nuria-title__word">that</span>
              <span className="nuria-title__word">get</span>
              <span className="nuria-title__word">you</span>
              <em
                className="serif nuria-title__serif"
                style={{ '--highlight-accent': activeService.accent }}
              >
                {activeService.titleHighlight}
              </em>
            </span>
          </h1>

          <p className="nuria-sub">{activeService.sub}</p>
        </div>

        {/* Centrally Located 3D Mascot Showcase & Floating Nuria-Style Badges */}
        <div className="nuria-stage-wrapper">
          {/* Floating Left Studio Card (Nuria tilted badge) */}
          <div className="nuria-sticker nuria-sticker--left">
            <div className="nuria-sticker__glow" />
            <div className="nuria-sticker__inner">
              <span className="nuria-sticker__icon">⭐</span>
              <div className="nuria-sticker__text">
                <span className="nuria-sticker__title">50+ Products Nailed</span>
                <span className="nuria-sticker__sub">4.9★ Client Rating · 100% On-Time</span>
              </div>
            </div>
          </div>

          {/* Interactive 3D Mascot Centerpiece with Scroll-Driven Rotation */}
          <div
            className={`nuria-centerpiece ${isStriking ? 'is-striking' : ''}`}
            onClick={triggerHammerHit}
            role="button"
            tabIndex={0}
            title="Click to strike hammer!"
            aria-label="Interactive 3D Mascot Avatar. Click to nail it!"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                triggerHammerHit()
              }
            }}
          >
            {/* Ambient Spotlight Ring behind Avatar */}
            <div
              className="nuria-centerpiece__spotlight"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${activeService.accent}40 0%, transparent 68%)`,
              }}
              aria-hidden="true"
            />

            {/* Avatar Frame Render (responds smoothly to scroll) */}
            <div className="nuria-avatar-render">
              <img
                src={AVATAR_FRAMES[frameIdx] || '/avatar_front_3d.png'}
                alt="Nailed It Bro 3D Mascot"
                className="nuria-avatar-img"
                draggable="false"
              />
            </div>

            {/* Hammer Strike Impact Shockwave */}
            {isStriking && (
              <div className="nuria-impact-wave" key={impactCount} aria-hidden="true">
                <span className="nuria-impact-ring" />
                <span className="nuria-impact-label">NAILED IT! 🔨</span>
              </div>
            )}

            {/* Center Status Stamp below mascot */}
            <div className="nuria-mascot-stamp">
              <span className="nuria-mascot-stamp__dot" style={{ background: activeService.accent }} />
              <span className="nuria-mascot-stamp__text">
                {isStriking ? 'Hammer Strike!' : 'Scroll to rotate · Tap to Nail It!'}
              </span>
            </div>
          </div>

          {/* Floating Right Studio Card (Nuria tilted badge) */}
          <div className="nuria-sticker nuria-sticker--right">
            <div className="nuria-sticker__glow" />
            <div className="nuria-sticker__inner">
              <span className="nuria-sticker__icon">⚡</span>
              <div className="nuria-sticker__text">
                <span className="nuria-sticker__title">Full-Stack Rigour</span>
                <span className="nuria-sticker__sub">Web · Android · AI · 3D Games</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Pills (Nuria Style) */}
        <div className="nuria-ctas" data-intro>
          <Magnetic strength={0.22}>
            <a
              href="#contact"
              className="btn btn--dark nuria-btn-primary"
              style={{ '--btn-glow': `${activeService.accent}55` }}
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#contact')
              }}
            >
              <span className="btn__label" data-text="Start a Project">Start a Project</span>
              <span className="btn__icon nuria-btn-arrow" aria-hidden="true">→</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.22}>
            <a
              href="#work"
              className="btn btn--ghost nuria-btn-secondary"
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget('#work')
              }}
            >
              <span className="btn__label" data-text="Explore Selected Work">
                Explore Selected Work
              </span>
            </a>
          </Magnetic>
        </div>

        {/* Nuria-Style Interactive Discipline Switcher Strip */}
        <div className="nuria-services-nav" data-intro aria-label="Studio Disciplines">
          <div className="nuria-services-nav__pill-wrap">
            {SERVICES.map((srv, idx) => {
              const isActive = idx === activeServiceIdx
              return (
                <button
                  key={srv.id}
                  type="button"
                  className={`nuria-service-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveServiceIdx(idx)}
                  style={{ '--srv-accent': srv.accent }}
                  aria-pressed={isActive}
                >
                  <span className="nuria-service-pill__num">0{idx + 1}</span>
                  <span className="nuria-service-pill__label">{srv.label}</span>
                  {isActive && <span className="nuria-service-pill__indicator" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Meta Status Bar (Nuria bottom fold) */}
      <div className="nuria-meta container" data-intro>
        <span className="nuria-meta__left">
          Websites · Mobile Apps · QR Automation · 3D Games · Social Media
        </span>

        <button
          type="button"
          className="nuria-meta__scroll-cue"
          onClick={() => scrollToTarget('#manifesto')}
          aria-label="Scroll to explore"
        >
          <span className="nuria-meta__scroll-line" aria-hidden="true" />
          <span>Scroll to explore</span>
        </button>

        <span className="nuria-meta__right hide-sm">
          Design with Taste · Code with Rigour
        </span>
      </div>
    </section>
  )
}
