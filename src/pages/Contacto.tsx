/**
 * CONTRAST MAP — Contacto
 *  1. header → dark      (bg-void)
 *  2. form   → dark-alt  (bg-void2) — left contact-data column is PAPER (bg-bone text-void)
 */
import { useState } from 'react'
import { Phone, Mail, Globe, ArrowRight } from 'lucide-react'
import FloatingNav from '../components/FloatingNav'

const SECTIONS = [
  { id: 'header', label: 'Contacto' },
  { id: 'form', label: 'Formulario' },
]

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', empresa: '', telefono: '', mensaje: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`CAPA CERO — Consulta de ${form.nombre}${form.empresa ? ` · ${form.empresa}` : ''}`)
    const body = encodeURIComponent(`Nombre: ${form.nombre}\nEmpresa: ${form.empresa}\nTeléfono: ${form.telefono}\n\n${form.mensaje}`)
    window.open(`mailto:alejandrodecozan@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
  }

  return (
    <div className="pt-[60px]">
      <FloatingNav sections={SECTIONS} />

      <section id="header" className="border-b border-rule py-20 bg-void">
        <div className="max-w-[1360px] mx-auto px-8">
          <div className="text-[11px] tracking-[0.3em] text-amber mb-6">CONTACTO</div>
          <h1 className="sr text-[clamp(48px,7vw,96px)] leading-[0.88] font-light max-w-[900px]">
            Hablemos antes<br/>
            <span className="italic text-bone/70">de negociar.</span>
          </h1>
          <p className="mt-8 text-[16px] text-bone/70 max-w-[480px] leading-[1.8] font-light">
            20 minutos. Una primera lectura de capas sobre el predio que tiene en mente. Sin compromiso.
          </p>
        </div>
      </section>

      <section id="form" className="bg-void2">
        <div className="max-w-[1360px] mx-auto px-8 py-16 grid md:grid-cols-[1fr_1.5fr] gap-16">
          <div className="bg-bone text-void p-8 self-start">
            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: 'Teléfono', val: '+57 311 262 1281', href: 'tel:+573112621281' },
                { icon: Mail, label: 'Email', val: 'alejandrodecozan@gmail.com', href: 'mailto:alejandrodecozan@gmail.com' },
                { icon: Globe, label: 'Demo territorial', val: 'deecozan.com/anexo-auditoria-anm', href: 'https://deecozan.com/anexo-auditoria-anm/' },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="flex items-start gap-4 group">
                  <div className="w-9 h-9 border border-void/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-ink transition-colors">
                    <c.icon size={14} className="text-amber-ink"/>
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.14em] text-void/60 mb-1">{c.label.toUpperCase()}</div>
                    <div className="text-[13px] text-void group-hover:text-void/70 transition-colors">{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="border border-void/10 p-6 mb-6">
              <div className="text-[11px] tracking-[0.2em] text-amber-ink mb-4">HORARIO</div>
              <div className="space-y-2 text-[13px] text-void/70">
                <div className="flex justify-between"><span>Lunes — Viernes</span><span>7:00 — 18:00</span></div>
                <div className="flex justify-between"><span>Respuesta email</span><span>&lt; 4 horas</span></div>
                <div className="flex justify-between"><span>Primera lectura de capas</span><span>72 horas</span></div>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/573112621281?text=Hola%2C%20quiero%20una%20primera%20lectura%20de%20capas%20con%20CAPA%20CERO"
                target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-void text-bone text-[11px] tracking-[0.1em] py-3 hover:bg-void/80 transition-colors">
                WHATSAPP
              </a>
              <a href="https://linkedin.com/in/julian-de-ecozan" target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-void text-bone text-[11px] tracking-[0.1em] py-3 hover:bg-void/80 transition-colors">
                LINKEDIN
              </a>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="border border-amber/20 bg-amber/5 p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="sr text-[36px] font-light mb-4">Mensaje enviado.</div>
                <p className="text-[14px] text-bone/70">Respondemos en menos de 4 horas hábiles.</p>
                <button onClick={() => setSent(false)} className="mt-8 text-[11px] tracking-[0.16em] text-amber border border-amber/30 px-6 py-3 hover:bg-amber hover:text-void transition-all">
                  ENVIAR OTRO MENSAJE
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="text-[11px] tracking-[0.24em] text-amber mb-6">CUÉNTENOS SOBRE SU PROYECTO</div>
                {[
                  { name: 'nombre', label: 'Nombre completo', placeholder: 'Juan Pérez', required: true },
                  { name: 'empresa', label: 'Empresa u organización', placeholder: 'Constructora XYZ', required: false },
                  { name: 'telefono', label: 'Teléfono', placeholder: '+57 300 000 0000', required: false },
                ].map(f => (
                  <div key={f.name}>
                    <label htmlFor={`f-${f.name}`} className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">{f.label.toUpperCase()}</label>
                    <input id={`f-${f.name}`} name={f.name} type="text" autoComplete={f.name === 'nombre' ? 'name' : f.name === 'telefono' ? 'tel' : 'organization'} placeholder={f.placeholder} required={f.required}
                      value={(form as any)[f.name]}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full bg-transparent border border-rule text-bone text-[13px] px-4 py-3 focus:outline-none focus:border-amber/50 placeholder:text-bone/60 transition-colors"/>
                  </div>
                ))}
                <div>
                  <label htmlFor="f-mensaje" className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">CUÉNTENOS SOBRE EL PREDIO O PROYECTO</label>
                  <textarea id="f-mensaje" name="mensaje" rows={5} placeholder="Municipio, tipo de proyecto, situación actual..."
                    value={form.mensaje}
                    onChange={e => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full bg-transparent border border-rule text-bone text-[13px] px-4 py-3 focus:outline-none focus:border-amber/50 placeholder:text-bone/60 transition-colors resize-none"/>
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.12em] py-4 hover:bg-amber/90 transition-colors">
                  ENVIAR MENSAJE <ArrowRight size={14}/>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
