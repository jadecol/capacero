/**
 * CONTRAST MAP — Contacto
 *  1. header → dark      (bg-void)
 *  2. form   → dark-alt  (bg-void2) — left contact-data column is PAPER (bg-bone text-void)
 */
import { useState, useRef } from 'react'
import { Phone, Mail, Globe, ArrowRight, Upload, FileText, X, CheckCircle2 } from 'lucide-react'
import FloatingNav from '../components/FloatingNav'

const SECTIONS = [
  { id: 'header', label: 'Contacto' },
  { id: 'form', label: 'Formulario' },
  { id: 'calibracion', label: 'Calibración de predio' },
]

const OBJETIVOS = [
  'Saber si es desarrollable',
  'Saber si es vendible a un desarrollador',
  'Auditar bloqueos',
]

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '', telefono: '', mensaje: '' })
  const [sentPredio, setSentPredio] = useState(false)
  const [predio, setPredio] = useState({
    nombre: '',
    email: '',
    telefono: '',
    matricula: '',
    municipio: '',
    objetivo: OBJETIVOS[0],
    ctm12: '',
    radar: false,
  })
  const [adjunto, setAdjunto] = useState<{ filename: string; content: string; size: number } | null>(null)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState<'' | 'form' | 'predio'>('')
  const [errorForm, setErrorForm] = useState('')
  const [errorPredio, setErrorPredio] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 4 * 1024 * 1024) {
      setFileError('El archivo excede 4 MB. Por favor adjunta un PDF o imagen más comprimido.')
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setAdjunto({
        filename: file.name,
        content: reader.result as string,
        size: file.size,
      })
    }
    reader.onerror = () => {
      setFileError('Error al leer el archivo. Intenta con otro formato.')
    }
    reader.readAsDataURL(file)
  }

  const removeAdjunto = () => {
    setAdjunto(null)
    setFileError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const post = async (kind: 'form' | 'predio', payload: Record<string, unknown>, onOk: () => void) => {
    const setErr = kind === 'form' ? setErrorForm : setErrorPredio
    setLoading(kind)
    setErr('')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      onOk()
    } catch {
      setErr('No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.')
    } finally {
      setLoading('')
    }
  }

  const submitPredio = (e: React.FormEvent) => {
    e.preventDefault()
    if (!predio.matricula.trim() && !adjunto) {
      setErrorPredio('Por favor escribe el Chip catastral / Matrícula o adjunta el documento del predio.')
      return
    }
    post('predio', { tipo: 'predio', ...predio, adjunto }, () => setSentPredio(true))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('form', { tipo: 'consulta', ...form }, () => setSent(true))
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
                { icon: Mail, label: 'Email', val: 'contacto@deecozan.com', href: 'mailto:contacto@deecozan.com' },
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
              <a href="https://wa.me/573112621281?text=Hola%2C%20quiero%20agendar%20una%20sesi%C3%B3n%20de%20calibraci%C3%B3n%20con%20CAPA%20CERO"
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
                  { name: 'email', label: 'Email', placeholder: 'nombre@empresa.com', required: true },
                  { name: 'empresa', label: 'Empresa u organización', placeholder: 'Constructora XYZ', required: false },
                  { name: 'telefono', label: 'Teléfono', placeholder: '+57 300 000 0000', required: false },
                ].map(f => (
                  <div key={f.name}>
                    <label htmlFor={`f-${f.name}`} className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">{f.label.toUpperCase()}</label>
                    <input id={`f-${f.name}`} name={f.name} type={f.name === 'email' ? 'email' : 'text'} autoComplete={f.name === 'nombre' ? 'name' : f.name === 'telefono' ? 'tel' : f.name === 'email' ? 'email' : 'organization'} placeholder={f.placeholder} required={f.required}
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
                <button type="submit" disabled={loading === 'form'}
                  className="w-full flex items-center justify-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.12em] py-4 hover:bg-amber/90 transition-colors disabled:opacity-60">
                  {loading === 'form' ? 'ENVIANDO...' : <>ENVIAR MENSAJE <ArrowRight size={14}/></>}
                </button>
                {errorForm && loading === '' && <p role="alert" className="text-[12px] text-red-400">{errorForm}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      <section id="calibracion" className="bg-void border-t border-rule">
        <div className="max-w-[1360px] mx-auto px-8 py-20 grid md:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <div className="text-[11px] tracking-[0.3em] text-amber mb-6">¿TIENES UN PREDIO EN ORIGEN?</div>
            <h2 className="sr text-[clamp(32px,4vw,56px)] leading-[0.95] font-light">
              Calibración de<br/><span className="italic text-bone/70">Viabilidad Predial.</span>
            </h2>
            <p className="mt-8 text-[14px] text-bone/70 leading-[1.8] font-light max-w-[440px]">
              No publicamos tu predio. Lo leemos. Cruzamos POT, IDIGER, determinantes ambientales CAR, catastro minero y norma urbana para determinar si construye o bloquea.
            </p>
            <p className="mt-4 text-[13px] text-bone/70 leading-[1.8] font-light max-w-[440px]">
              Si es viable y tú lo autorizas, puede entrar a nuestro Radar de Oportunidades ante fondos y desarrolladores calificados.
            </p>
            <div className="mt-6 border-l-2 border-amber/40 pl-4 py-1 text-[11px] text-bone/60 leading-[1.7] max-w-[440px]">
              Reserva absoluta de expedientes bajo secreto profesional. El dictamen técnico es independiente de cualquier proceso comercial.
            </div>
          </div>

          <div>
            {sentPredio ? (
              <div className="border border-amber/20 bg-amber/5 p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="sr text-[36px] font-light mb-4">Solicitud recibida.</div>
                <p className="text-[14px] text-bone/70 max-w-[400px]">Revisamos tu predio y te contactamos en menos de 4 horas hábiles con los primeros hallazgos.</p>
                <button onClick={() => { setSentPredio(false); removeAdjunto(); }} className="mt-8 text-[11px] tracking-[0.16em] text-amber border border-amber/30 px-6 py-3 hover:bg-amber hover:text-void transition-all">
                  SOLICITAR OTRA CALIBRACIÓN
                </button>
              </div>
            ) : (
              <form onSubmit={submitPredio} className="space-y-4">
                {[
                  { name: 'nombre', label: 'Nombre completo', placeholder: 'Juan Pérez', required: true },
                  { name: 'email', label: 'Email', placeholder: 'nombre@empresa.com', required: true },
                  { name: 'telefono', label: 'Teléfono / WhatsApp (opcional)', placeholder: '+57 300 000 0000', required: false },
                  { name: 'municipio', label: 'Municipio', placeholder: 'Ubaté, Chía, Zipaquirá...', required: true },
                ].map(f => (
                  <div key={f.name}>
                    <label htmlFor={`p-${f.name}`} className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">{f.label.toUpperCase()}</label>
                    <input id={`p-${f.name}`} name={f.name} type={f.name === 'email' ? 'email' : 'text'} autoComplete={f.name === 'email' ? 'email' : f.name === 'telefono' ? 'tel' : f.name === 'nombre' ? 'name' : 'off'} placeholder={f.placeholder} required={f.required}
                      value={(predio as any)[f.name]}
                      onChange={e => setPredio({ ...predio, [f.name]: e.target.value })}
                      className="w-full bg-transparent border border-rule text-bone text-[13px] px-4 py-3 focus:outline-none focus:border-amber/50 placeholder:text-bone/60 transition-colors"/>
                  </div>
                ))}

                {/* Adjunto de Certificado / Documento */}
                <div>
                  <label className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">
                    CERTIFICADO DE TRADICIÓN, BOLETÍN CATASTRAL O PREDIAL (ADJUNTO)
                  </label>
                  <input
                    ref={fileInputRef}
                    id="p-file"
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {!adjunto ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border border-dashed border-rule hover:border-amber/60 p-4 flex flex-col items-center justify-center gap-2 bg-void2 hover:bg-void3 transition-all text-center group cursor-pointer"
                    >
                      <Upload size={18} className="text-amber group-hover:scale-110 transition-transform"/>
                      <span className="text-[12px] text-bone">
                        Haz clic para adjuntar archivo <span className="text-amber">(PDF, JPG o PNG)</span>
                      </span>
                      <span className="text-[10px] text-bone/50">
                        Certificado de Tradición y Libertad, Boletín Catastral o Impuesto Predial (Máx. 4 MB)
                      </span>
                    </button>
                  ) : (
                    <div className="border border-amber/40 bg-amber/5 p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 size={16} className="text-amber flex-shrink-0"/>
                        <FileText size={16} className="text-bone/70 flex-shrink-0"/>
                        <div className="min-w-0">
                          <div className="text-[12px] text-bone truncate font-medium">{adjunto.filename}</div>
                          <div className="text-[10px] text-bone/50 font-mono">
                            {(adjunto.size / 1024).toFixed(1)} KB · Documento cargado
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeAdjunto}
                        className="p-1 hover:bg-void rounded text-bone/60 hover:text-red-400 transition-colors"
                        title="Quitar archivo"
                      >
                        <X size={15}/>
                      </button>
                    </div>
                  )}
                  {fileError && <p className="text-[11px] text-red-400 mt-1">{fileError}</p>}
                </div>

                {/* Opción de digitar chip/matrícula como alternativa o complemento */}
                <div>
                  <label htmlFor="p-matricula" className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">
                    O DIGITA EL CHIP CATASTRAL / MATRÍCULA {adjunto ? '(OPCIONAL)' : '(SI NO TIENES ADJUNTO)'}
                  </label>
                  <input
                    id="p-matricula"
                    name="matricula"
                    type="text"
                    placeholder="Ej: AAA0000XXXX · 50N-00000000"
                    value={predio.matricula}
                    onChange={e => setPredio({ ...predio, matricula: e.target.value })}
                    className="w-full bg-transparent border border-rule text-bone text-[13px] px-4 py-3 focus:outline-none focus:border-amber/50 placeholder:text-bone/60 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="p-objetivo" className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">OBJETIVO</label>
                  <select id="p-objetivo" name="objetivo" value={predio.objetivo}
                    onChange={e => setPredio({ ...predio, objetivo: e.target.value })}
                    className="w-full bg-void2 border border-rule text-bone text-[13px] px-4 py-3 focus:outline-none focus:border-amber/50 transition-colors">
                    {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="p-ctm12" className="text-[11px] tracking-[0.14em] text-bone/70 block mb-2">COORDENADAS CTM-12 (OPCIONAL)</label>
                  <input id="p-ctm12" name="ctm12" type="text" placeholder="E: 000000 · N: 000000"
                    value={predio.ctm12}
                    onChange={e => setPredio({ ...predio, ctm12: e.target.value })}
                    className="w-full bg-transparent border border-rule text-bone text-[13px] px-4 py-3 focus:outline-none focus:border-amber/50 placeholder:text-bone/60 transition-colors"/>
                </div>
                <label htmlFor="p-radar" className="flex items-start gap-3 text-[12px] text-bone/70 leading-[1.6] cursor-pointer">
                  <input id="p-radar" type="checkbox" checked={predio.radar}
                    onChange={e => setPredio({ ...predio, radar: e.target.checked })}
                    className="mt-1 accent-[#C8A45A]"/>
                  Autorizo que, si el predio es viable, sea evaluado para el Radar de Oportunidades (sin divulgar su identidad sin mi consentimiento).
                </label>
                <button type="submit" disabled={loading === 'predio'}
                  className="w-full flex items-center justify-center gap-3 bg-amber text-void text-[11px] font-medium tracking-[0.12em] py-4 hover:bg-amber/90 transition-colors disabled:opacity-60">
                  {loading === 'predio' ? 'ENVIANDO SOLICITUD...' : <>SOLICITAR CALIBRACIÓN DE VIABILIDAD <ArrowRight size={14}/></>}
                </button>
                {errorPredio && loading === '' && <p role="alert" className="text-[12px] text-red-400">{errorPredio}</p>}
                <p className="text-[10px] text-bone/50 leading-[1.6]">
                  Tratamiento de datos (Ley 1581 de 2012): usamos la información únicamente para evaluar su predio y contactarle. No la compartimos con terceros.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
