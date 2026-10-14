import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, ExternalLink, Mail, Phone } from 'lucide-react'
import BrandLogo from './BrandLogo'
import PrivacyModal from './PrivacyModal'

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-rule bg-void py-16 mt-0">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-rule">
            {/* Columna 1: Marca y Propósito */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" aria-label="CAPA CERO — Inicio">
                <BrandLogo size="md" />
              </Link>
              <p className="text-[13px] text-bone/70 max-w-[440px] leading-[1.8] font-light">
                Inteligencia territorial, lectura simultánea de 5 capas normativas y estructuración de suelo antes del compromiso. Nacimos en el expediente, operamos con tecnología propia.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] text-bone/50 font-mono">
                <span className="border border-rule px-2 py-0.5">MAGNA-SIRGAS</span>
                <span className="border border-rule px-2 py-0.5">CTM-12 (EPSG:9377)</span>
                <span className="border border-rule px-2 py-0.5">50+ MUNICIPIOS</span>
              </div>
            </div>

            {/* Columna 2: Navegación de Plataforma */}
            <div className="space-y-4">
              <div className="text-[11px] tracking-[0.2em] text-amber uppercase font-medium">PLATAFORMA</div>
              <ul className="space-y-2.5">
                {[
                  { to: '/servicios', label: 'Servicios & Entregables' },
                  { to: '/inteligencia', label: 'Radar de Inteligencia Territorial' },
                  { to: '/metodo', label: 'Método de 5 Capas' },
                  { to: '/firma', label: 'La Firma & Trayectoria' },
                  { to: '/contacto', label: 'Contacto & Calibración 20 min' },
                ].map(l => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-[12px] text-bone/70 hover:text-amber transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Marco Legal y Contacto */}
            <div className="space-y-4">
              <div className="text-[11px] tracking-[0.2em] text-amber uppercase font-medium">LEGAL & CONTACTO</div>
              <ul className="space-y-2.5">
                <li>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-[12px] text-bone/70 hover:text-amber transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ShieldCheck size={13} className="text-amber flex-shrink-0" />
                    <span>Política de Tratamiento de Datos</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-[12px] text-bone/70 hover:text-amber transition-colors text-left"
                  >
                    Confidencialidad de Expedientes
                  </button>
                </li>
                <li className="pt-2 text-[12px] text-bone/70 space-y-1">
                  <a
                    href="mailto:contacto@deecozan.com"
                    className="hover:text-amber transition-colors flex items-center gap-1.5"
                  >
                    <Mail size={12} className="text-amber flex-shrink-0" />
                    <span>contacto@deecozan.com</span>
                  </a>
                  <a
                    href="https://wa.me/573112621281?text=Hola%2C%20quiero%20agendar%20una%20sesi%C3%B3n%20de%20calibraci%C3%B3n%20con%20CAPA%20CERO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber transition-colors flex items-center gap-1.5 text-amber"
                  >
                    <Phone size={12} className="text-amber flex-shrink-0" />
                    <span>WhatsApp: +57 311 262 1281</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Sub-footer: Copyright y Crédito desarrollado por deecozan */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-bone/60">
            <div>
              CAPA CERO © 2026 · Todos los derechos reservados · República de Colombia
            </div>

            <div className="flex items-center gap-1.5">
              <span>Desarrollado por</span>
              <a
                href="https://deecozan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber hover:text-amber/80 transition-colors inline-flex items-center gap-1 font-medium tracking-[0.04em]"
              >
                <span>deecozan</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Política de Datos y Confidencialidad */}
      <PrivacyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
