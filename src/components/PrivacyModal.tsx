import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Lock, FileText } from 'lucide-react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'datos' | 'confidencialidad'
}

export default function PrivacyModal({ isOpen, onClose, initialTab = 'datos' }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-void2 border border-rule shadow-2xl z-10 my-8 max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-rule bg-void">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-amber" />
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-amber uppercase font-medium">MARCO LEGAL & HABEAS DATA</div>
                  <h2 id="privacy-modal-title" className="sr text-[22px] font-light text-bone leading-tight">
                    Política de Tratamiento de Datos y Confidencialidad
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="w-8 h-8 flex items-center justify-center text-bone/60 hover:text-bone hover:bg-void3 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-[13px] text-bone/70 leading-[1.8] font-light">
              {/* Sección 1: Datos Personales */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-bone font-medium text-[14px]">
                  <FileText size={15} className="text-amber" />
                  <span>1. Política de Tratamiento de Datos Personales (Ley 1581 de 2012)</span>
                </div>
                <p>
                  En cumplimiento de la <strong className="text-bone font-normal">Ley Estatutaria 1581 de 2012</strong>, el <strong className="text-bone font-normal">Decreto Reglamentario 1377 de 2013</strong> y el marco constitucional de Habeas Data en Colombia, <strong className="text-bone font-normal">CAPA CERO</strong> (operada por deecozan) informa a los usuarios, clientes y titulares que los datos suministrados a través de nuestros canales de contacto serán tratados bajo principios de legalidad, finalidad, libertad, veracidad y confidencialidad.
                </p>
                <div className="bg-void p-4 border border-rule space-y-2 text-[12px]">
                  <p><strong className="text-bone font-normal">Responsable del Tratamiento:</strong> Julián de Ecozan / CAPA CERO</p>
                  <p><strong className="text-bone font-normal">Canal de atención y ejercicio de derechos:</strong> alejandrodecozan@gmail.com · Tel: +57 311 262 1281</p>
                  <p><strong className="text-bone font-normal">Ubicación operativa:</strong> Ubaté · Bogotá D.C., Colombia</p>
                </div>
              </section>

              {/* Sección 2: Finalidad */}
              <section className="space-y-3">
                <div className="text-bone font-medium text-[13px]">
                  2. Finalidad del Tratamiento de Información
                </div>
                <p>Los datos de contacto (nombre, teléfono, correo electrónico, empresa y municipio de interés) serán utilizados exclusivamente para:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-bone/70">
                  <li>Gestionar solicitudes de orientación, cotizaciones y agendamiento de sesiones de calibración territorial (20 min).</li>
                  <li>Elaborar diagnósticos normativos prediales y servicios contratados.</li>
                  <li>Enviar boletines y alertas territoriales cuando medie suscripción voluntaria.</li>
                </ul>
                <p className="text-[12px] text-amber">
                  Bajo ninguna circunstancia CAPA CERO cederá, venderá ni compartirá información personal con terceros para fines comerciales o publicitarios ajenos.
                </p>
              </section>

              {/* Sección 3: Confidencialidad Predial */}
              <section className="space-y-3 pt-4 border-t border-rule">
                <div className="flex items-center gap-2 text-bone font-medium text-[14px]">
                  <Lock size={15} className="text-amber" />
                  <span>3. Reserva y Confidencialidad de Información Predial</span>
                </div>
                <p>
                  Entendemos la naturaleza estratégica y sensible de las negociaciones de suelo inmobiliario y minero en Colombia. Toda coordenada cartográfica, matrícula inmobiliaria, cédula catastral, polígono o dato documental compartido con CAPA CERO para cotizaciones o diagnósticos está cobijado bajo estricta reserva profesional y secreto comercial.
                </p>
              </section>

              {/* Sección 4: Derechos ARCO */}
              <section className="space-y-3 pt-4 border-t border-rule">
                <div className="text-bone font-medium text-[13px]">
                  4. Derechos de los Titulares (Conocer, Actualizar, Rectificar y Suprimir)
                </div>
                <p>
                  Usted tiene derecho a conocer qué datos conservamos, solicitar su actualización, rectificación o eliminación definitiva en cualquier momento escribiendo a <a href="mailto:alejandrodecozan@gmail.com" className="text-amber hover:underline">alejandrodecozan@gmail.com</a>. Las solicitudes se resuelven en un término máximo de 10 días hábiles.
                </p>
              </section>
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-rule bg-void flex items-center justify-between">
              <span className="text-[11px] text-bone/50">República de Colombia · Vigencia 2026</span>
              <button
                type="button"
                onClick={onClose}
                className="bg-amber text-void text-[11px] font-medium tracking-[0.1em] px-5 py-2 hover:bg-amber/90 transition-colors uppercase"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
