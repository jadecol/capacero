import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const ROUTE_ORDER = ['/', '/servicios', '/inteligencia', '/metodo', '/firma', '/contacto'] as const

const SWIPE_THRESHOLD = 80

const btnBase =
  'fixed top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center ' +
  'border border-bone/20 bg-void/60 backdrop-blur-sm text-bone/60 ' +
  'hover:text-amber hover:border-amber/50 focus-visible:text-amber transition-colors duration-300'

export default function PageNavigator() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [touchVisible, setTouchVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const go = useCallback(
    (dir: 1 | -1) => {
      const idx = ROUTE_ORDER.indexOf(pathname as (typeof ROUTE_ORDER)[number])
      const current = idx === -1 ? 0 : idx
      const next = (current + dir + ROUTE_ORDER.length) % ROUTE_ORDER.length
      navigate(ROUTE_ORDER[next])
    },
    [pathname, navigate]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }

    let startX = 0
    let startY = 0
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      setTouchVisible(true)
      clearTimeout(hideTimer.current)
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
      hideTimer.current = setTimeout(() => setTouchVisible(false), 1800)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      clearTimeout(hideTimer.current)
    }
  }, [go])

  const animate = { opacity: touchVisible ? 1 : 0 }
  const hover = { opacity: 1 }
  const transition = { duration: 0.3 }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Página anterior"
        onClick={() => go(-1)}
        initial={{ opacity: 0 }}
        animate={animate}
        whileHover={hover}
        whileFocus={hover}
        transition={transition}
        className={`${btnBase} left-2`}
      >
        <ChevronLeft size={20} strokeWidth={1.25} />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Página siguiente"
        onClick={() => go(1)}
        initial={{ opacity: 0 }}
        animate={animate}
        whileHover={hover}
        whileFocus={hover}
        transition={transition}
        className={`${btnBase} right-2`}
      >
        <ChevronRight size={20} strokeWidth={1.25} />
      </motion.button>
    </>
  )
}
