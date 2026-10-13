import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

interface Section {
  id: string
  label: string
}

interface FloatingNavProps {
  sections?: Section[]
}

export default function FloatingNav({ sections = [] }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState('')
  const [showTop, setShowTop] = useState(false)
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400)

      // Detect active section
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(s.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Dots nav — only when sections provided */}
      {sections.length > 0 && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 items-center">
          {sections.map(s => (
            <div key={s.id} className="relative flex items-center justify-end gap-3">
              {/* Label tooltip */}
              <AnimatePresence>
                {hoveredDot === s.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="absolute right-6 bg-void2 border border-rule text-bone/70 text-[11px] tracking-[0.14em] px-3 py-1.5 whitespace-nowrap pointer-events-none">
                    {s.label.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dot */}
              <button
                onClick={() => scrollTo(s.id)}
                onMouseEnter={() => setHoveredDot(s.id)}
                onMouseLeave={() => setHoveredDot(null)}
                className="group relative flex items-center justify-center w-5 h-5">
                <span className={`block rounded-full transition-all duration-300 ${
                  activeSection === s.id
                    ? 'w-2 h-2 bg-amber'
                    : 'w-1.5 h-1.5 bg-bone/20 group-hover:bg-bone/50'
                }`}/>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={scrollTop}
            className="fixed bottom-8 right-6 z-40 w-10 h-10 border border-rule bg-void/90 backdrop-blur-sm flex items-center justify-center text-bone/70 hover:text-amber hover:border-amber/40 transition-all duration-200">
            <ArrowUp size={14}/>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
