/**
 * CONTRAST MAP — Inteligencia
 *  1. header → dark      (bg-void)
 *  2. anm    → dark-alt  (bg-void2) — contains the PAPER KPI grid (bg-bone text-void)
 *  3. mapa   → dark      (bg-void)
 *  4. capas  → dark-alt  (bg-void2, layer cards bg-void3)
 *  5. cta    → dark      (bg-void)
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import ColombiaMap from '../components/ColombiaMap'
import FloatingNav from '../components/FloatingNav'

const SECTIONS = [
  { id: 'header', label: 'Inteligencia' },
  { id: 'anm', label: 'Auditoría ANM' },
  { id: 'mapa', label: 'Radar' },
  { id: 'capas', label: 'Capas' },
  { id: 'cta', label: 'Contacto' },
]

const backlogData = [
  { escenario: 'Revisión exhaustiva', años: 62, color: '#C8A45A' },
  { escenario: 'Estimado base', años: 31, color: '#C8A45A99' },
  { escenario: 'Revisión ágil', años: 16, color: '#C8A45A55' },
]

const capas = [
  { nombre: 'POT Municipal', desc: 'Usos del suelo, edificabilidad, aprovechamiento', riesgo: 'Medio' },
  { nombre: 'Plan Parcial', desc: 'Instrumentos de planificación complementaria', riesgo: 'Alto' },
  { nombre: 'Determinantes Ambientales & PGAU', desc: 'Rondas hídricas, POMCAs, reservas CAR y directrices MinAmbiente 2025–2035', riesgo: 'Alto' },
  { nombre: 'Riesgo IDIGER', desc: 'Inundación, remoción en masa, sísmica', riesgo: 'Crítico' },
  { nombre: 'Consulta Previa', desc: 'Territorios de comunidades étnicas', riesgo: 'Crítico' },
]

const riesgoColor: Record<string, string> = {
  Medio: 'text-bone/70 border-bone/20',
  Alto: 'text-amber border-amber/40',
  Crítico: 'text-red-400 border-red-400/40',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-void2 border border-rule px-4 py-3 text-[12px]">
        <div className="text-bone/70 mb-1 text-[11px] tracking-[0.1em]">{label}</div>
        <div className="sr text-[24px] text-amber font-light">{payload[0].value} años</div>
      </div>
    )
  }
  return null
}

export default function Inteligencia() {
  return (
    <div className="pt-[60px]">
      <FloatingNav sections={SECTIONS} />

      <section id="header" className="bg-void border-b border-rule py-20">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-[11px] tracking-[0.3em] text-amber mb-6">INTELIGENCIA TERRITORIAL</div>
          <h1 className="sr text-[clamp(48px,7vw,96px)] leading-[0.88] font-light max-w-[1000px]">
            Datos que el mercado<br/>
            <span className="italic text-bone/70">no está leyendo.</span>
          </h1>
          <p className="mt-8 text-[16px] text-bone/70 max-w-[520px] leading-[1.8] font-light">
            La información territorial no es simétrica. Quien la lee antes, negocia mejor.
          </p>
        </div>
      </section>

      {/* AUDITORÍA ANM */}
      <section id="anm" className="border-b border-rule bg-void2">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="flex items-start justify-between gap-8 mb-12 flex-wrap">
            <div>
              <div className="text-[11px] tracking-[0.24em] text-amber mb-4">AUDITORÍA CATASTRO MINERO — AGOSTO 2026</div>
              <h2 className="sr text-[clamp(32px,4vw,52px)] leading-[0.92] font-light">
                7.809 solicitudes<br/>mineras sin resolver.
              </h2>
            </div>
            <a href="https://deecozan.com/anexo-auditoria-anm/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 border border-amber/40 text-amber text-[11px] tracking-[0.14em] px-4 py-3 hover:bg-amber hover:text-void transition-all flex-shrink-0">
              VER DASHBOARD EN VIVO <ExternalLink size={12}/>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-void/10 text-void mb-10">
            {[
              { val: '7.809', lbl: 'Solicitudes activas sin resolución', sub: 'Estados: evaluación, declaradas, en radicación, suspendidas' },
              { val: '5.6M ha', lbl: 'Hectáreas comprometidas', sub: '4,9% del territorio nacional' },
              { val: '43,4%', lbl: 'Ingresaron entre 2024-2026', sub: 'Flujo activo y creciente, no solo rezago histórico' },
            ].map((k, i) => (
              <div key={i} className="bg-bone p-8">
                <div className="sr text-[42px] font-light text-void leading-none">{k.val}</div>
                <div className="text-[12px] text-void mt-3 mb-2">{k.lbl}</div>
                <div className="text-[11px] text-void/70 leading-[1.6]">{k.sub}</div>
              </div>
            ))}
          </div>

          <div className="border border-rule p-8">
            <div className="text-[11px] tracking-[0.16em] text-bone/70 mb-6">
              TIEMPO PARA RESOLVER EL BACKLOG CON 1 ANALISTA DEDICADO
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={backlogData} layout="vertical" margin={{ left: 0, right: 40 }}>
                <XAxis type="number" tick={{ fill: 'rgba(244,241,235,0.7)', fontSize: 11 }} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="escenario" tick={{ fill: 'rgba(244,241,235,0.85)', fontSize: 11 }} width={160} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="años" radius={0} barSize={20}>
                  {backlogData.map((entry, i) => <Cell key={i} fill={entry.color}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-bone/60">
              <AlertCircle size={12} className="text-amber flex-shrink-0"/>
              El indicador que falla en el sistema público no es un error — es la demostración de por qué se necesita inteligencia propia.
            </div>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section id="mapa" className="bg-void border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-6">RADAR TERRITORIAL NACIONAL</div>
          <div className="grid md:grid-cols-[1fr_2.2fr] gap-12 items-start">
            <div>
              <h2 className="sr text-[clamp(28px,3vw,42px)] leading-[0.95] font-light mb-6">
                Cobertura en<br/>toda Colombia.
              </h2>
              <p className="text-[14px] text-bone/70 leading-[1.8] mb-8">
                Análisis de POT en más de 50 municipios. Desde las capitales metropolitanas hasta municipios en proceso de expansión urbana.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Metropolitanos', n: '5', color: 'bg-bone' },
                  { label: 'Epicentro', n: '1', color: 'bg-amber' },
                  { label: 'Cundinamarca', n: '6+', color: 'bg-amber/60' },
                  { label: 'Regionales', n: '8+', color: 'bg-bone/50' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-[12px]">
                    <div className={`w-2 h-2 rounded-full ${t.color}`}/>
                    <span className="text-bone/60">{t.label}</span>
                    <span className="text-bone/60 ml-auto">{t.n}</span>
                  </div>
                ))}
              </div>
            </div>
            <ColombiaMap height={460}/>
          </div>
        </div>
      </section>

      {/* CAPAS */}
      <section id="capas" className="bg-void2 border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-16">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-10">LA MATRIZ DE 5 CAPAS</div>
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
            <div>
              <h2 className="sr text-[clamp(28px,3vw,44px)] leading-[0.95] font-light mb-6">
                El conflicto entre capas<br/>es donde viven<br/><span className="italic text-amber">los bloqueos.</span>
              </h2>
              <p className="text-[14px] text-bone/70 leading-[1.8]">
                No revisamos el POT y luego el IDIGER. Los cruzamos en simultáneo. Un predio puede ser viable en cuatro capas y estar bloqueado por la quinta.
              </p>
            </div>
            <div className="space-y-px">
              {capas.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start justify-between gap-4 bg-void3 p-5 border-b border-rule last:border-b-0">
                  <div>
                    <div className="text-[13px] font-medium mb-1">{c.nombre}</div>
                    <div className="text-[11px] text-bone/70">{c.desc}</div>
                  </div>
                  <span className={`text-[11px] tracking-[0.14em] border px-2 py-1 flex-shrink-0 ${riesgoColor[c.riesgo]}`}>
                    {c.riesgo.toUpperCase()}
                  </span>
                </motion.div>
              ))}
              <div className="bg-amber/10 border border-amber/20 p-4 mt-2 flex items-center gap-3">
                <CheckCircle size={14} className="text-amber flex-shrink-0"/>
                <span className="text-[12px] text-bone/70">Entregable: GO / NO-GO con costo de mitigación por capa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="bg-void py-16">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="sr text-[clamp(28px,3.5vw,48px)] font-light">
            ¿Quiere ver los datos<br/>de su municipio?
          </div>
          <Link to="/contacto"
            className="flex items-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.12em] px-8 py-4 hover:bg-amber/90 transition-colors">
            SOLICITAR ANÁLISIS <ArrowRight size={14}/>
          </Link>
        </div>
      </section>
    </div>
  )
}
