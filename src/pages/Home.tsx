/**
 * CONTRAST MAP — Home
 *  1. hero       → dark      (bg-void, particles)
 *     ── amber hairline divider (h-px bg-amber/30)
 *  2. kpis       → dark-alt  (bg-void2)
 *  3. manifiesto → dark      (bg-void)
 *  4. cobertura  → dark-alt  (bg-void2)
 *  5. sectores   → dark      (bg-void)
 *  6. mercados   → dark-alt  (bg-void2, cards bg-void3)
 *  7. cta        → PAPER     (bg-bone text-void)
 */
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers } from 'lucide-react'
import { CAPACIDADES, MERCADOS } from '../data'
import SectorCarousel from '../components/SectorCarousel'
import ColombiaMap from '../components/ColombiaMap'
import FloatingNav from '../components/FloatingNav'
import { useTypewriter } from '../hooks/useTypewriter'

const HEADLINE = 'El suelo tiene capas que otros no leen.'
const HIGHLIGHT = 'capas'
const HL_START = HEADLINE.indexOf(HIGHLIGHT)
const HL_END = HL_START + HIGHLIGHT.length

interface Particle { x: number; y: number; vx: number; vy: number }

const PARTICLE_COUNT = 60
const LINK_DISTANCE = 120
const PARTICLE_COLOR = 'rgba(200,164,90,0.15)'

function ParticleField({ still }: { still: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = PARTICLE_COLOR
      ctx.strokeStyle = PARTICLE_COLOR
      ctx.lineWidth = 1
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      if (!still) raf = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [still])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }
})

const HOME_SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'manifiesto', label: 'Manifiesto' },
  { id: 'cobertura', label: 'Cobertura' },
  { id: 'sectores', label: 'Sectores' },
  { id: 'mercados', label: 'Mercados' },
  { id: 'cta', label: 'Contacto' },
]

export default function Home() {
  const reduce = !!useReducedMotion()
  const tw = useTypewriter(HEADLINE, 35)
  const typed = reduce ? HEADLINE : tw.typed
  const done = reduce || tw.done
  const before = typed.slice(0, HL_START)
  const hl = typed.slice(HL_START, HL_END)
  const after = typed.slice(HL_END)

  return (
    <div>
      <FloatingNav sections={HOME_SECTIONS} />

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center pb-16 pt-[100px] relative overflow-hidden bg-void">
        {/* fine grid */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_79px,rgba(244,241,235,0.025)_80px),repeating-linear-gradient(90deg,transparent,transparent_79px,rgba(244,241,235,0.025)_80px)]"/>
        {/* particles */}
        <ParticleField still={reduce}/>
        {/* slow-pulse amber glow, center-right */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_70%_at_75%_45%,rgba(200,164,90,0.16)_0%,transparent_70%)]"
          animate={{ opacity: reduce ? 0.7 : [0.35, 1, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}/>
        {/* scanlines */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,#fff_0px,#fff_2px,transparent_2px,transparent_6px)]"/>

        <div className="max-w-[1360px] mx-auto px-8 w-full relative">
          <motion.div {...fade(0.1)} className="text-[11px] tracking-[0.32em] text-amber mb-8">
            INTELIGENCIA TERRITORIAL · COLOMBIA
          </motion.div>

          <h1 aria-label={HEADLINE} className="sr text-[clamp(40px,7.5vw,104px)] leading-[0.95] font-light max-w-[1100px] tracking-[-0.01em] min-h-[2.85em]">
            <span aria-hidden="true">
              {before}
              <span className="text-amber">{hl}</span>
              {after}
              {!done && <span className="text-amber/70">|</span>}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="w-12 h-px bg-amber my-10"/>

            <p className="text-[17px] leading-[1.8] max-w-[520px] text-bone/70 font-light">
              Antes de negociar un predio, antes de radicar, antes de comprometerse — existe una capa de información que determina si ese suelo construye o bloquea. Eso es lo que leemos.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/servicios"
                className="flex items-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.1em] px-6 py-3 hover:bg-amber/90 transition-colors">
                VER SERVICIOS <ArrowRight size={14}/>
              </Link>
              <Link to="/inteligencia"
                className="flex items-center gap-3 border border-rule text-bone/60 text-[11px] tracking-[0.1em] px-6 py-3 hover:border-bone/30 hover:text-bone transition-all">
                INTELIGENCIA TERRITORIAL <Layers size={14}/>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div aria-hidden="true" className="h-px bg-amber/30"/>

      {/* KPIs */}
      <section id="kpis" className="bg-void2 border-b border-rule">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-[1360px] mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
          {CAPACIDADES.map((c, i) => (
            <div key={i} className="pr-6 border-r border-rule last:border-r-0 py-2 mr-6 last:mr-0">
              <div className="sr text-[32px] font-light leading-none text-bone">{c.val}</div>
              <div className="text-[11px] text-bone/70 mt-2 leading-[1.5] tracking-[0.04em]">{c.label}</div>
              <div className="text-[11px] text-bone/60 mt-1 tracking-[0.06em]">{c.sub}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MANIFIESTO */}
      <section id="manifiesto" className="bg-void border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-24 grid md:grid-cols-[1fr_1.8fr] gap-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-amber mb-5">QUIÉNES SOMOS</div>
            <h2 className="sr text-[clamp(36px,4vw,54px)] leading-[0.92] font-light">
              Nacimos en<br/>el expediente.
            </h2>
          </div>
          <div className="space-y-5 text-[16px] leading-[1.85] text-bone/70 font-light">
            <p>CAPA CERO no es una firma de consultoría convencional. Es la materialización de lo que se aprende cuando <span className="text-bone">revisas miles de expedientes desde adentro</span> — desde la Secretaría de Planeación, no desde la oficina de un cliente.</p>
            <p>Sabemos por qué una curaduría devuelve. Sabemos qué restricción del POT bloquea una compra antes de que el comprador lo sepa. Sabemos en qué momento un predio que parece viable se convierte en un litigio.</p>
            <p>Operamos en la intersección de tres mundos que raramente se encuentran juntos: <span className="text-bone">normativa urbana profunda, tecnología de datos propia y experiencia constructiva real.</span></p>
            <div className="pt-4">
              <Link to="/firma" className="text-[11px] tracking-[0.16em] text-amber flex items-center gap-2 hover:gap-3 transition-all">
                CONOCER LA FIRMA <ArrowRight size={12}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COBERTURA MAP */}
      <section id="cobertura" className="bg-void2 border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="text-[11px] tracking-[0.24em] text-amber mb-3">COBERTURA NACIONAL</div>
              <h2 className="sr text-[clamp(32px,3.5vw,48px)] leading-[0.92] font-light">
                Análisis de POT<br/>en todo Colombia.
              </h2>
            </div>
            <div className="text-right hidden md:block">
              <div className="sr text-[42px] font-light text-bone">50+</div>
              <div className="text-[11px] text-bone/60 tracking-[0.1em]">MUNICIPIOS ANALIZADOS</div>
            </div>
          </div>
          <ColombiaMap height={500}/>
        </div>
      </section>

      {/* SECTORES CARRUSEL */}
      <section id="sectores" className="bg-void border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-20 grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-amber mb-5">SECTORES DE INTERVENCIÓN</div>
            <h2 className="sr text-[clamp(32px,3.5vw,52px)] leading-[0.92] font-light mb-6">
              Cada tipo de<br/>suelo tiene<br/>su lenguaje.
            </h2>
            <p className="text-[15px] leading-[1.8] text-bone/70 font-light max-w-[400px]">
              El análisis normativo no es igual para vivienda que para industria. Adaptamos la matriz de capas a las restricciones específicas de cada uso y sector.
            </p>
            <div className="mt-8">
              <Link to="/servicios" className="text-[11px] tracking-[0.16em] text-amber flex items-center gap-2 hover:gap-3 transition-all">
                VER TODOS LOS SERVICIOS <ArrowRight size={12}/>
              </Link>
            </div>
          </div>
          <SectorCarousel/>
        </div>
      </section>

      {/* MERCADOS */}
      <section id="mercados" className="bg-void2">
        <div className="max-w-[1360px] mx-auto px-8 py-20">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-4">CON QUIÉN TRABAJAMOS</div>
          <p className="text-[14px] text-bone/70 max-w-[640px] mb-10 leading-[1.7]">Seis perfiles de decisión sobre el suelo. Para cada uno, el riesgo concreto que leemos antes de que se vuelva costo — respaldado por 3.000+ expedientes revisados y 7.809 solicitudes mineras auditadas.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-rule">
            {MERCADOS.map((m, i) => (
              <div key={i} className="bg-void3 p-8 hover:bg-void transition-colors group">
                <div className="sr text-[22px] font-light mb-3 group-hover:text-amber transition-colors">{m.label}</div>
                <p className="text-[13px] text-bone/70 leading-[1.75]">{m.desc}</p>
                <div className="mt-5 pt-4 border-t border-rule">
                  <div className="text-[11px] tracking-[0.16em] text-amber mb-1">RIESGO QUE RESOLVEMOS</div>
                  <p className="text-[13px] text-bone/80 leading-[1.6]">{m.riesgo}</p>
                  <Link to="/servicios" className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.1em] text-bone/70 hover:text-amber transition-colors">
                    {m.servicio} <ArrowRight size={11}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-bone text-void">
        <div className="max-w-[1360px] mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="sr text-[clamp(32px,4vw,56px)] leading-[0.9] font-light max-w-[600px] text-void">
            Hablemos antes de<br/><span className="italic text-amber-ink">negociar el lote.</span>
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-void/70 max-w-[280px] leading-[1.7]">
              20 minutos. Una primera lectura de capas. Sin compromiso.
            </p>
            <Link to="/contacto"
              className="flex items-center gap-3 bg-void text-bone text-[11px] font-medium tracking-[0.12em] px-8 py-4 hover:bg-void/80 transition-colors w-fit">
              AGENDAR 20 MINUTOS <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
