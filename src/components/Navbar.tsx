import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'

const links = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/inteligencia', label: 'Inteligencia' },
  { to: '/metodo', label: 'Método' },
  { to: '/firma', label: 'La Firma' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [loc])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-all duration-300 ${scrolled ? 'border-b border-rule bg-void/90 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="max-w-[1360px] mx-auto px-8 w-full flex items-center justify-between">
          <Link to="/" aria-label="CAPA CERO — Inicio">
            <BrandLogo size="md" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => {
              const active = loc.pathname === l.to
              return (
                <Link key={l.to} to={l.to} aria-current={active ? 'page' : undefined}
                  className={`relative py-2 text-[11px] tracking-[0.1em] transition-colors duration-200 ${active ? 'text-bone' : 'text-bone/70 hover:text-bone'}`}>
                  {l.label.toUpperCase()}
                  {active && (
                    <motion.span layoutId="nav-active" aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-0.5 h-px bg-amber"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}/>
                  )}
                </Link>
              )
            })}
            <Link to="/contacto"
              className="border border-amber text-amber text-[11px] font-medium tracking-[0.12em] px-4 py-2 hover:bg-amber hover:text-void transition-all duration-200">
              AGENDAR LLAMADA
            </Link>
          </div>

          <button type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}
            className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-bone/70 hover:text-bone" onClick={() => setOpen(!open)}>
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        <motion.div aria-hidden="true" style={{ scaleX: progress }}
          className="absolute left-0 right-0 bottom-0 h-px bg-amber/60 origin-left"/>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-void pt-[60px] flex flex-col items-center justify-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="sr text-[36px] font-light text-bone/70 hover:text-bone transition-colors">
                {l.label}
              </Link>
            ))}
            <Link to="/contacto" className="mt-4 border border-amber text-amber px-8 py-3 text-[12px] tracking-[0.16em]">
              AGENDAR LLAMADA
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
