/**
 * CONTRAST MAP — Metodo
 *  1. header     → dark      (bg-void)
 *  2. pasos      → dark-alt  (bg-void2) — contains the PAPER "20 min" aside (bg-bone text-void)
 *  3. recorrido  → dark      (bg-void, cards bg-void3) — ruta comercial paso a paso
 *  4. tech       → dark-alt  (bg-void2, cards bg-void3) — tecnología con beneficio cliente
 *  5. principios → dark      (bg-void, cards bg-void3) — principios operativos estratégicos
 *  6. cta        → dark-alt  (bg-void2)
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { METODO_STEPS, RECORRIDO_COMERCIAL } from '../data'
import FloatingNav from '../components/FloatingNav'

const SECTIONS = [
  { id: 'header', label: 'Método' },
  { id: 'pasos', label: 'Proceso' },
  { id: 'recorrido', label: 'Ruta' },
  { id: 'tech', label: 'Tecnología' },
  { id: 'principios', label: 'Principios' },
]

const tech = [
  {
    label: 'Backend & Geoespacial',
    stack: 'Java · Spring Boot · TimescaleDB + PostGIS',
    beneficio: 'Cruce espacial de polígonos y capas en milisegundos sin latencia ni caídas de servidores públicos.',
  },
  {
    label: 'Cartografía Oficial SIG',
    stack: 'QGIS · Leaflet · Shapefile · GeoJSON · CTM-12 (EPSG:9377)',
    beneficio: 'Proyección cartográfica oficial única IGAC (Origen Nacional CTM-12) con precisión milimétrica para cotas, rondas y cesiones.',
  },
  {
    label: 'IA & Extracción Documental',
    stack: 'RAG · NLP para normativa · Procesamiento de expedientes',
    beneficio: 'Análisis semántico inmediato sobre miles de páginas de acuerdos de POT, decretos y resoluciones municipales.',
  },
  {
    label: 'Estándares y Rigor Jurídico',
    stack: 'Ley 388/97 · PGAU 2025–2035 (MinAmbiente) · Decreto 1077/15 · CAR',
    beneficio: 'Doctrina de superior jerarquía ambiental y régimen urbanístico que aplican curadurías y autoridades ambientales para blindar la inversión.',
  },
]

const principios = [
  {
    t: 'Anticipación antes del compromiso.',
    b: 'El costo de resolver un impedimento después de la promesa o la compraventa es exponencial. El único momento de ventaja real es antes de firmar.',
  },
  {
    t: 'La capa invisible es la que bloquea.',
    b: 'El riesgo territorial rara vez está en el POT evidente; surge en el conflicto entre instrumentos superpuestos: determinantes CAR, rondas hídricas, riesgos IDIGER y planes parciales.',
  },
  {
    t: 'Cálculo de mitigación sobre prohibición teórica.',
    b: 'Saber que un predio tiene una restricción no es suficiente. El valor real radica en dimensionar en pesos colombianos y semanas el costo exacto de destrabarlo.',
  },
  {
    t: 'Independencia de los sistemas públicos.',
    b: 'Operamos con bases cartográficas y normativas propias estructuradas. Auditamos directamente sin depender de si las plataformas estatales están en línea o desactualizadas.',
  },
]

export default function Metodo() {
  return (
    <div className="pt-[60px]">
      <FloatingNav sections={SECTIONS} />

      {/* Header */}
      <section id="header" className="bg-void border-b border-rule py-20">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-[11px] tracking-[0.3em] text-amber mb-6">MÉTODO</div>
          <h1 className="sr text-[clamp(48px,7vw,96px)] leading-[0.88] font-light max-w-[900px]">
            Cómo leemos<br />
            <span className="italic text-bone/70">lo que otros no ven.</span>
          </h1>
          <p className="mt-8 text-[16px] text-bone/70 max-w-[580px] leading-[1.8] font-light">
            La inteligencia territorial no es un trámite posterior; es la ventaja informacional que define las condiciones de compra, licenciamiento y desarrollo.
          </p>
        </div>
      </section>

      {/* Pasos de análisis */}
      <section id="pasos" className="bg-void2 border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="grid md:grid-cols-[1fr_2fr] gap-20 items-start">
            <div className="md:sticky md:top-24">
              <h2 className="sr text-[clamp(28px,3vw,42px)] leading-[0.95] font-light mb-6">
                El proceso que<br />cambia la<br /><span className="italic text-amber">negociación.</span>
              </h2>
              <p className="text-[14px] text-bone/70 leading-[1.8]">
                La secuencia importa tanto como el análisis. Saber antes de comprometerse es la diferencia entre negociar con ventaja o asumir pasivos ocultos.
              </p>

              {/* Aside de Calibración / Diagnóstico con distinción 20min vs 72h */}
              <div className="mt-10 border border-void/10 bg-bone text-void p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="sr text-[36px] font-light text-amber-ink leading-none">20 min</div>
                  <span className="text-[11px] tracking-[0.14em] uppercase text-void/60 font-medium">Orientación</span>
                </div>
                <div className="text-[11px] text-void tracking-[0.1em] mt-3 font-medium">SESIÓN DE CALIBRACIÓN INICIAL</div>
                <p className="text-[12px] text-void/70 mt-2 leading-[1.6]">
                  Conversación estratégica directa para entender el polígono, clasificar los riesgos probables y determinar el alcance requerido. Sin costo.
                </p>
                <div className="mt-4 pt-4 border-t border-void/10 flex items-center justify-between text-[11px]">
                  <span className="text-void/60">Diagnóstico 5 capas:</span>
                  <span className="font-medium text-void">Entrega en 72h (desde $3M)</span>
                </div>
              </div>
            </div>

            <div>
              {METODO_STEPS.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid grid-cols-[32px_1fr] gap-6 py-8 border-b border-rule last:border-b-0 items-start">
                  <div className="sr text-[14px] text-amber pt-1">{s.n}</div>
                  <div>
                    <div className="sr text-[22px] font-light mb-3">{s.title}</div>
                    <p className="text-[13px] text-bone/70 leading-[1.8]">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recorrido Comercial de Decisión */}
      <section id="recorrido" className="bg-void border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-4">RUTA OPERATIVA Y COMERCIAL</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="sr text-[clamp(28px,3vw,44px)] leading-[0.95] font-light">
                De la primera lectura<br />al cierre de negocio.
              </h2>
            </div>
            <p className="text-[14px] text-bone/70 max-w-[500px] leading-[1.7]">
              Un camino transparente sin fricción. Cada fase cuenta con un tiempo de respuesta definido, un costo transparente y un entregable ejecutivo de decisión.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
            {RECORRIDO_COMERCIAL.map((r, i) => (
              <div key={i} className="bg-void3 p-8 flex flex-col justify-between group hover:bg-void transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="sr text-[20px] text-amber">{r.fase}</span>
                    <span className="text-[11px] text-bone/60 border border-rule px-2 py-0.5">{r.tiempo}</span>
                  </div>
                  <h3 className="sr text-[22px] font-light mb-1 group-hover:text-amber transition-colors">{r.nombre}</h3>
                  <div className="text-[11px] text-amber tracking-[0.06em] font-medium mb-4">{r.costo}</div>
                  <p className="text-[13px] text-bone/70 leading-[1.7] mb-6">{r.objetivo}</p>
                </div>

                <div className="pt-4 border-t border-rule">
                  <div className="flex items-start gap-2 text-[11px] text-bone/80 mb-4">
                    <CheckCircle2 size={13} className="text-amber flex-shrink-0 mt-0.5" />
                    <span>{r.salida}</span>
                  </div>
                  <Link to={r.link} className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] text-amber hover:text-amber/80 transition-colors">
                    {r.cta.toUpperCase()} <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología Propia con Beneficio Cliente */}
      <section id="tech" className="bg-void2 border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-6">INFRAESTRUCTURA Y DATOS</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="sr text-[clamp(28px,3vw,44px)] leading-[0.95] font-light max-w-[620px]">
                Herramientas que construimos<br />porque el mercado no las tenía.
              </h2>
            </div>
            <p className="text-[14px] text-bone/70 max-w-[500px] leading-[1.7]">
              No somos revendedores de software ni intermediarios de trámites. Creamos tecnología propia para garantizar certeza cuando las plataformas públicas colapsan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
            {tech.map((t, i) => (
              <div key={i} className="bg-void3 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] tracking-[0.2em] text-amber mb-3 font-medium">{t.label.toUpperCase()}</div>
                  <div className="text-[11px] text-bone/60 font-mono tracking-tight mb-6 pb-4 border-b border-rule">
                    {t.stack}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.16em] text-bone/50 mb-1">VALOR PARA EL CLIENTE</div>
                  <p className="text-[13px] text-bone/80 leading-[1.7]">{t.beneficio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principios Operativos */}
      <section id="principios" className="bg-void border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-6">CRITERIO Y DOCTRINA</div>
          <h2 className="sr text-[clamp(28px,3vw,44px)] leading-[0.95] font-light mb-12">
            Principios operativos irrenunciables.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-rule">
            {principios.map((p, i) => (
              <div key={i} className="bg-void3 p-8">
                <div className="sr text-[22px] font-light mb-3 leading-snug text-bone">{p.t}</div>
                <p className="text-[13px] text-bone/70 leading-[1.8]">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-void2 py-20">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-amber mb-2">SESIÓN DE CALIBRACIÓN</div>
            <div className="sr text-[clamp(28px,3.5vw,48px)] font-light max-w-[560px] leading-[0.95]">
              ¿Tiene un predio o cartera en evaluación?
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-bone/70 max-w-[320px] leading-[1.7]">
              20 minutos de orientación estratégica directa con el fundador. Sin compromiso.
            </p>
            <Link to="/contacto"
              className="flex items-center justify-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.12em] px-8 py-4 hover:bg-amber/90 transition-colors w-fit">
              AGENDAR 20 MINUTOS <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
