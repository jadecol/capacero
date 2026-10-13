import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SECTORES_CARRUSEL } from '../data'

export default function SectorCarousel() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1)
    setIdx((next + SECTORES_CARRUSEL.length) % SECTORES_CARRUSEL.length)
  }

  useEffect(() => {
    timer.current = setInterval(() => go(idx + 1), 5000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [idx])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className="relative">
      {/* Dots */}
      <div className="flex gap-2 mb-8">
        {SECTORES_CARRUSEL.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`h-px transition-all duration-300 ${i === idx ? 'w-8 bg-amber' : 'w-4 bg-bone/20'}`}/>
        ))}
      </div>

      {/* Card */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={idx} custom={dir} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0">
            <div className="border border-rule p-8 h-full flex flex-col justify-between">
              <div>
                <div className="text-[11px] tracking-[0.24em] text-amber mb-3">
                  {String(idx + 1).padStart(2, '0')} / {String(SECTORES_CARRUSEL.length).padStart(2, '0')}
                </div>
                <div className="sr text-[28px] font-light leading-tight mb-3">
                  {SECTORES_CARRUSEL[idx].sector}
                </div>
                <p className="text-[13px] text-bone/70 leading-relaxed">
                  {SECTORES_CARRUSEL[idx].desc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => go(idx - 1)}
          className="w-10 h-10 border border-rule flex items-center justify-center text-bone/70 hover:text-bone hover:border-bone/30 transition-all">
          <ChevronLeft size={16}/>
        </button>
        <button onClick={() => go(idx + 1)}
          className="w-10 h-10 border border-rule flex items-center justify-center text-bone/70 hover:text-bone hover:border-bone/30 transition-all">
          <ChevronRight size={16}/>
        </button>
      </div>
    </div>
  )
}
