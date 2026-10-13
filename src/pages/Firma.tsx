/**
 * CONTRAST MAP — Firma
 *  1. header      → dark      (bg-void)
 *  2. perfil      → dark-alt  (bg-void2, profile card bg-void3)
 *  3. trayectoria → PAPER     (bg-bone text-void)
 *  4. valores     → dark-alt  (bg-void2, cards bg-void3)
 *  5. cta         → dark      (bg-void)
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import FloatingNav from '../components/FloatingNav'

const SECTIONS = [
  { id: 'header', label: 'La Firma' },
  { id: 'perfil', label: 'Dirección' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'valores', label: 'Doctrina' },
]

const trayectoria = [
  {
    año: '2012',
    titulo: 'Ingreso al Estado · Secretaría de Planeación',
    hito: 'Grado en Arquitectura (U. Piloto). Inicio de carrera en la Secretaría de Planeación de Ubaté, revisando radicaciones y expedientes desde la mesa técnica municipal.',
  },
  {
    año: '2015',
    titulo: 'Profesional Universitario · Régimen Urbanístico',
    hito: 'Análisis de fondo de POT, conceptos de uso, licencias de construcción y parcelación en el epicentro industrial, minero y agropecuario de la provincia.',
  },
  {
    año: '2016',
    titulo: 'Gestión Ambiental Urbana · Marco Doctrinario',
    hito: 'Inicio de la Especialización en Gestión Ambiental Urbana (U. Piloto). Análisis de la articulación entre la Política de Gestión Ambiental Urbana (PGAU), determinantes CAR y expansión territorial.',
  },
  {
    año: '2019',
    titulo: 'Especialista · Colisiones de Superior Jerarquía',
    hito: 'Grado como Especialista. Identificación de vacíos críticos donde la cartografía y acuerdos municipales colisionan con determinantes ambientales vinculantes de superior jerarquía.',
  },
  {
    año: '2020',
    titulo: 'Secretaría de Obras Públicas · Infraestructura',
    hito: 'Dirección técnica de proyectos de infraestructura pública municipal, estructuración de presupuestos APU, supervisión de obra e implementación de estándares BIM.',
  },
  {
    año: '2024',
    titulo: 'Ingeniería de Software · Herramientas Propias',
    hito: 'Inicio de Ingeniería de Software (Politécnico Grancolombiano). Desarrollo de algoritmos propietarios para cruce espacial masivo de polígonos prediales y extracción documental.',
  },
  {
    año: '2025',
    titulo: 'Auditoría Nacional del Catastro Minero',
    hito: 'Consultoría independiente de datos. Ejecución de la mayor auditoría técnica al sistema AnnA Minería: 7.809 solicitudes activas sin resolver identificadas en mora pública.',
  },
  {
    año: '2026',
    titulo: 'Fundación de CAPA CERO',
    hito: 'Creación de la firma de inteligencia territorial para fondos, constructoras y estructuradores de suelo. Fusión de experiencia estatal interna con tecnología analítica propia.',
  },
]

const metricas = [
  { val: '12 Años', lbl: 'Adentro del Estado', sub: 'Secretaría de Planeación y Obras Públicas' },
  { val: '3.000+', lbl: 'Expedientes Auditados', sub: 'Licencias, usos de suelo y conceptos POT' },
  { val: '7.809', lbl: 'Solicitudes en Mora', sub: 'Catastro minero nacional auditado' },
  { val: '50+', lbl: 'Municipios en Radar', sub: 'Matrices de POT analizadas en Colombia' },
]

const pilaresCapacidad = [
  {
    romano: 'I',
    titulo: 'Doctrina Normativa & Curadurías',
    desc: 'Interpretación profunda de la Ley 388/97, Decreto 1077/15, planes parciales y unidades de actuación. Sabemos con certeza qué hace que una curaduría devuelva un radicado o qué vacío normativo traba una compraventa.',
    items: ['Diagnóstico de causales de devolución', 'Análisis de cargas, cesiones y plusvalías', 'Estructuración de Data Room para escrituración'],
  },
  {
    romano: 'II',
    titulo: 'Determinantes Ambientales & Marco PGAU',
    desc: 'El 80% de los proyectos trabados no fallan en la norma urbanística municipal sino en los determinantes ambientales de superior jerarquía. Evaluamos el suelo bajo la doctrina de la Política de Gestión Ambiental Urbana (MinAmbiente 2025–2035), rondas hídricas y POMCAs antes de comprometer capital.',
    items: ['Determinantes CAR, ANLA y rondas hídricas', 'Marco PGAU 2025–2035 (MinAmbiente)', 'Zonificación de amenaza y remoción IDIGER', 'Conflicto POMCA vs. perímetro municipal'],
  },
  {
    romano: 'III',
    titulo: 'Tecnología de Datos & SIG Propietario',
    desc: 'No dependemos de que las plataformas del Estado estén en línea. Diseñamos motores de software propios para procesar cartografía oficial georreferenciada y acuerdos municipales completos.',
    items: ['Cartografía georreferenciada de alta precisión', 'Bases de datos geoespaciales PostGIS', 'Minería normativa con modelos de lenguaje (NLP)'],
  },
]

export default function Firma() {
  return (
    <div className="pt-[60px]">
      <FloatingNav sections={SECTIONS} />

      {/* Header institucional */}
      <section id="header" className="bg-void border-b border-rule py-20">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-end mb-16">
            <div>
              <div className="text-[11px] tracking-[0.3em] text-amber mb-6 font-medium">LA FIRMA</div>
              <h1 className="sr text-[clamp(48px,6.5vw,84px)] leading-[0.88] font-light">
                CAPA<br />CERO.
              </h1>
            </div>
            <div className="space-y-4">
              <p className="text-[18px] leading-[1.75] text-bone font-light">
                No somos una consultora que lee la norma desde afuera. Nacimos revisando radicados desde la mesa técnica del Estado.
              </p>
              <p className="text-[14px] leading-[1.8] text-bone/70 font-light">
                Durante 12 años examinamos miles de expedientes de licencias, conceptos y planes en Planeación y Obras Públicas. Lo que construimos en CAPA CERO es la materialización de esa experiencia institucional — convertida en ventaja analítica para quienes toman decisiones sobre suelo en Colombia.
              </p>
            </div>
          </div>

          {/* Métricas de Autoridad */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule pt-8 border-t border-rule">
            {metricas.map((m, i) => (
              <div key={i} className="bg-void p-6 first:pl-0 last:pr-0">
                <div className="sr text-[36px] font-light text-bone leading-none">{m.val}</div>
                <div className="text-[12px] text-amber mt-2 font-medium">{m.lbl}</div>
                <div className="text-[11px] text-bone/60 mt-1 leading-[1.5]">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfil del Director y 3 Pilares de Capacidad */}
      <section id="perfil" className="border-b border-rule bg-void2">
        <div className="max-w-[1360px] mx-auto px-8 py-20 space-y-16">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Tarjeta del Fundador */}
            <div>
              <div className="text-[11px] tracking-[0.24em] text-amber mb-6 uppercase font-medium">DIRECCIÓN TÉCNICA</div>
              <div className="border border-rule bg-void3 p-8 text-center relative">
                <div className="w-16 h-16 border border-amber/30 rounded-full mx-auto mb-5 flex items-center justify-center bg-void">
                  <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                    <rect x="0" y="9" width="32" height="2" fill="#C8A45A" />
                    <rect x="0" y="15" width="32" height="2" fill="#C8A45A" fillOpacity="0.55" />
                    <rect x="0" y="21" width="32" height="2" fill="#C8A45A" fillOpacity="0.25" />
                  </svg>
                </div>
                <h3 className="sr text-[24px] font-light mb-1 text-bone">Julián de Ecozan</h3>
                <div className="text-[10px] tracking-[0.16em] text-amber mb-6 font-medium">FUNDADOR · DIRECTOR GENERAL</div>

                <div className="space-y-3 text-left border-t border-rule pt-6 text-[11px]">
                  <div>
                    <span className="text-bone font-medium">Arquitecto</span>
                    <span className="text-bone/60 block">Universidad Piloto de Colombia</span>
                  </div>
                  <div>
                    <span className="text-bone font-medium">Esp. Gestión Ambiental Urbana</span>
                    <span className="text-bone/60 block">Universidad Piloto de Colombia</span>
                    <span className="text-amber/90 text-[10px] block mt-0.5 font-light">Enfoque PGAU 2025–2035 · MinAmbiente</span>
                  </div>
                  <div>
                    <span className="text-bone font-medium">Ingeniería de Software</span>
                    <span className="text-bone/60 block">Politécnico Grancolombiano</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-rule text-left text-[11px] text-bone/70 leading-relaxed font-light">
                  Ex-Profesional Universitario de Planeación y Dirección de Obras Públicas. Fusión de criterio jurídico, cartográfico y computacional.
                </div>
              </div>
            </div>

            {/* Los Tres Vértices de Capacidad */}
            <div>
              <div className="text-[11px] tracking-[0.24em] text-amber mb-6 uppercase font-medium">LOS 3 VÉRTICES DE LA FIRMA</div>
              <h2 className="sr text-[clamp(28px,3.5vw,46px)] leading-[0.95] font-light mb-8 text-bone">
                La confluencia que el mercado<br /><span className="italic text-amber">nunca encuentra junta.</span>
              </h2>

              <div className="grid gap-6">
                {pilaresCapacidad.map((p, i) => (
                  <div key={i} className="bg-void3 border border-rule p-8 hover:border-amber/40 transition-colors">
                    <div className="flex items-baseline justify-between mb-3">
                      <h4 className="sr text-[22px] font-light text-bone">{p.titulo}</h4>
                      <span className="sr text-[18px] text-amber font-light">{p.romano}</span>
                    </div>
                    <p className="text-[13px] text-bone/70 leading-[1.75] mb-5 font-light">{p.desc}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-rule text-[11px] text-bone/80 font-light">
                      {p.items.map((it, j) => (
                        <span key={j} className="flex items-center gap-2">
                          <span className="text-amber">—</span>
                          <span>{it}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trayectoria Cronológica (Sección Paper Break) */}
      <section id="trayectoria" className="bg-bone text-void">
        <div className="max-w-[1360px] mx-auto px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-[11px] tracking-[0.24em] text-amber-ink mb-3 uppercase font-medium">TRAYECTORIA INSTITUCIONAL</div>
              <h2 className="sr text-[clamp(32px,4vw,52px)] leading-[0.92] font-light text-void">
                14 años de evolución en el suelo colombiano.
              </h2>
            </div>
            <p className="text-[14px] text-void/70 max-w-[500px] leading-[1.7]">
              Cada hito consolidó un componente de lo que hoy es CAPA CERO: del rigor en el expediente público al desarrollo de software y auditoría de datos territoriales.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-void/15" />
            {trayectoria.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-[80px_20px_1fr] gap-6 py-7 border-b border-void/10 last:border-b-0 items-start"
              >
                <div className="sr text-[22px] font-light text-amber-ink text-right pr-4">{t.año}</div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-ink mt-2.5 relative z-10 shadow-sm" />
                <div>
                  <h4 className="text-[14px] font-medium text-void mb-1">{t.titulo}</h4>
                  <p className="text-[13px] text-void/75 leading-[1.8] font-light">{t.hito}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctrina Operativa y Principios Éticos */}
      <section id="valores" className="bg-void2 border-b border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-20">
          <div className="text-[11px] tracking-[0.24em] text-amber mb-4 uppercase font-medium">DOCTRINA DE LA FIRMA</div>
          <h2 className="sr text-[clamp(28px,3.5vw,46px)] leading-[0.95] font-light mb-12 text-bone">
            Principios que garantizan nuestra independencia.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-rule">
            {[
              {
                num: '01',
                t: 'Cero intermediación política.',
                b: 'No hacemos lobby ni gestión de favores en despachos públicos. Emitimos dictámenes técnicos rigurosos fundamentados exclusivamente en la ley, el POT y la cartografía georreferenciada.',
              },
              {
                num: '02',
                t: 'Reserva absoluta de expedientes.',
                b: 'Comprendemos el valor de la discreción en transacciones prediales. Toda cédula catastral, matrícula o polígono bajo análisis está cobijado bajo secreto profesional estricto.',
              },
              {
                num: '03',
                t: 'Independencia de sistemas públicos.',
                b: 'Las plataformas estatales colapsan con frecuencia. CAPA CERO opera con bases estructuradas y motores geoespaciales propios que garantizan auditoría sin interrupciones.',
              },
            ].map((v, i) => (
              <div key={i} className="bg-void3 p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-amber/70 font-mono mb-4">{v.num}</div>
                  <div className="sr text-[22px] font-light mb-3 text-bone leading-tight">{v.t}</div>
                  <p className="text-[13px] text-bone/70 leading-[1.8] font-light">{v.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-void py-20">
        <div className="max-w-[1360px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-[11px] tracking-[0.24em] text-amber mb-2 uppercase font-medium">SESIÓN DE CALIBRACIÓN</div>
            <div className="sr text-[clamp(30px,3.8vw,52px)] font-light max-w-[560px] leading-[0.95] text-bone">
              Hablemos antes de negociar su próxima adquisición.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-bone/70 max-w-[320px] leading-[1.7] font-light">
              20 minutos de lectura previa sobre el suelo en evaluación. Directamente con la dirección de la firma.
            </p>
            <Link
              to="/contacto"
              className="flex items-center justify-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.12em] px-8 py-4 hover:bg-amber/90 transition-colors w-fit uppercase"
            >
              CONTACTAR AHORA <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
