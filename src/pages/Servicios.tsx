/**
 * CONTRAST MAP — Servicios
 *  1. header → dark      (bg-void)
 *  2. tabla  → dark-alt  (bg-void2, row hover bg-void3)
 *  3. cta    → PAPER     (bg-bone text-void)
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Users, Package } from 'lucide-react'
import { SERVICIOS } from '../data'
import FloatingNav from '../components/FloatingNav'

const SECTIONS = [
  { id: 'header', label: 'Servicios' },
  { id: 'tabla', label: 'Catálogo' },
  { id: 'cta', label: 'Contacto' },
]

export default function Servicios() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="pt-[60px]">
      <FloatingNav sections={SECTIONS} />

      {/* Header */}
      <section id="header" className="bg-void border-b border-rule py-20">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-[11px] tracking-[0.3em] text-amber mb-6">SERVICIOS</div>
          <h1 className="sr text-[clamp(48px,7vw,96px)] leading-[0.88] font-light max-w-[900px]">
            Lo que ofrecemos<br/>
            <span className="italic text-bone/70">y lo que entregamos.</span>
          </h1>
          <p className="mt-8 text-[16px] text-bone/70 max-w-[560px] leading-[1.8] font-light">
            Cada servicio tiene un entregable concreto. No informes voluminosos — decisiones ejecutivas respaldadas por análisis de capas simultáneo.
          </p>
        </div>
      </section>

      {/* Tabla */}
      <section id="tabla" className="bg-void2">
        <div className="max-w-[1360px] mx-auto px-8 py-4">
          {SERVICIOS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`border-b border-rule cursor-pointer transition-colors ${s.featured ? 'border-l-2 border-l-amber' : ''} ${active === i ? 'bg-amber/5' : 'hover:bg-void3'}`}
              role="button" tabIndex={0} aria-expanded={active === i}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(active === i ? null : i) } }}
              onClick={() => setActive(active === i ? null : i)}>

              {s.probono && !SERVICIOS[i - 1]?.probono && (
                <div className="pt-6 px-2 text-[11px] tracking-[0.24em] text-bone/70">CONTRIBUCIÓN INSTITUCIONAL · NO ES UN SERVICIO COMERCIAL</div>
              )}
              <div className="flex items-start gap-8 py-7 px-2">
                <div className="sr text-[20px] text-bone/60 font-light w-8 flex-shrink-0 pt-1">{s.idx}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`sr text-[22px] font-light leading-tight mb-1 transition-colors ${active === i ? 'text-amber' : ''}`}>
                        {s.title}
                      </div>
                      {s.featured && (
                        <span className="text-[11px] tracking-[0.16em] bg-amber text-void px-2 py-0.5 font-medium">
                          SERVICIO INSIGNIA
                        </span>
                      )}
                      {s.probono && (
                        <span className="text-[11px] tracking-[0.16em] border border-amber/40 text-amber px-2 py-0.5">
                          CONTRIBUCIÓN PRO BONO
                        </span>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`sr text-[18px] font-light ${s.probono ? 'text-bone/70' : 'text-amber'}`}>{s.precio}</div>
                      <div className="text-[11px] text-bone/60 tracking-[0.1em] mt-1">{s.unidad}</div>
                    </div>
                  </div>
                </div>
              </div>

              {active === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-2 pb-8 ml-16">
                  <div className="grid md:grid-cols-3 gap-8 border-t border-rule pt-8">
                    <div className="md:col-span-2">
                      <p className="text-[14px] text-bone/70 leading-[1.85] mb-6">{s.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 border border-rule px-3 py-2">
                          <Package size={12} className="text-amber"/>
                          <span className="text-[11px] text-bone/60">{s.entregable}</span>
                        </div>
                        <div className="flex items-center gap-2 border border-rule px-3 py-2">
                          <Clock size={12} className="text-amber"/>
                          <span className="text-[11px] text-bone/60">{s.tiempo}</span>
                        </div>
                        <div className="flex items-center gap-2 border border-rule px-3 py-2">
                          <Users size={12} className="text-amber"/>
                          <span className="text-[11px] text-bone/60">{s.mercado}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <Link to="/contacto"
                        className="flex items-center justify-center gap-2 bg-amber text-void text-[11px] font-medium tracking-[0.12em] px-4 py-3 hover:bg-amber/90 transition-colors">
                        AGENDAR CONSULTA <ArrowRight size={12}/>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-bone text-void py-20">
        <div className="max-w-[1360px] mx-auto px-8 text-center">
          <div className="sr text-[48px] font-light mb-4 text-void">¿No sabe por dónde empezar?</div>
          <p className="text-void/70 mb-8 text-[15px]">20 minutos con nosotros bastan para saber qué servicio necesita su predio.</p>
          <Link to="/contacto"
            className="inline-flex items-center gap-3 bg-void text-bone text-[11px] tracking-[0.12em] px-8 py-4 hover:bg-void/80 transition-colors">
            AGENDAR 20 MINUTOS <ArrowRight size={14}/>
          </Link>
        </div>
      </section>
    </div>
  )
}
