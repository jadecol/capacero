/**
 * Cloudflare Pages Function — POST /api/contacto
 * 1) Envía la solicitud a la firma. 2) Envía al solicitante un acuse de recibo con plantilla de marca.
 * La API key vive solo en el servidor (secret RESEND_API_KEY), nunca en el bundle del navegador.
 */
interface Env {
  RESEND_API_KEY: string
  RESEND_FROM?: string // ej. "CAPA CERO <contacto@tudominio.com>" (dominio verificado en Resend)
  CONTACT_TO?: string
}

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

const row = (k: string, v: unknown) =>
  `<tr><td style="padding:6px 12px;color:#666">${esc(k)}</td><td style="padding:6px 12px"><b>${esc(v) || '—'}</b></td></tr>`

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Plantilla de acuse de recibo (estilos inline para compatibilidad con clientes de correo). */
function ackTemplate(nombre: string, esPredio: boolean) {
  const titulo = esPredio ? 'Solicitud de calibración recibida' : 'Hemos recibido tu mensaje'
  const cuerpo = esPredio
    ? 'Recibimos los datos de tu predio. Nuestro equipo leerá las capas (POT, IDIGER, catastro minero y norma urbana) y te contactaremos en las próximas horas hábiles para darte los siguientes pasos. Tu información está bajo reserva absoluta.'
    : 'Gracias por escribirnos. Revisaremos tu consulta y nos pondremos en contacto contigo en las próximas horas hábiles (respuesta habitual: menos de 4 horas).'
  return `<!doctype html><html lang="es"><body style="margin:0;padding:0;background:#0b0b0c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0c"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141416;border:1px solid #2a2a2e;font-family:Arial,Helvetica,sans-serif">
  <tr><td style="padding:28px 36px;border-bottom:1px solid #2a2a2e">
    <span style="font-size:11px;letter-spacing:4px;color:#C8A45A">CAPA CERO</span>
    <span style="float:right;font-size:11px;letter-spacing:2px;color:#8a8a8f">INTELIGENCIA TERRITORIAL</span>
  </td></tr>
  <tr><td style="padding:44px 36px 8px">
    <div style="font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.1;color:#f3efe6;font-weight:normal">${titulo}.</div>
  </td></tr>
  <tr><td style="padding:16px 36px 8px;font-size:15px;line-height:1.7;color:#cfcac0">
    Hola ${esc(nombre)},<br><br>${cuerpo}
  </td></tr>
  <tr><td style="padding:24px 36px"><div style="height:2px;width:56px;background:#C8A45A"></div></td></tr>
  <tr><td style="padding:0 36px 32px;font-size:13px;line-height:1.7;color:#8a8a8f">
    ¿Es urgente? Escríbenos por WhatsApp: <a href="https://wa.me/573112621281" style="color:#C8A45A;text-decoration:none">+57 311 262 1281</a>
  </td></tr>
  <tr><td style="padding:20px 36px;background:#0f0f11;border-top:1px solid #2a2a2e;font-size:11px;line-height:1.6;color:#6b6b70">
    <b style="color:#8a8a8f">CAPA CERO</b> · Cordialmente, Dirección de la firma.<br><br>
    Protección de datos (Ley 1581 de 2012): la información que nos suministraste se usa únicamente para atender tu solicitud, se almacena bajo medidas de confidencialidad y no se cede a terceros. Este es un mensaje automático; puedes responder a este correo para continuar la conversación.
  </td></tr>
</table></td></tr></table></body></html>`
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) return json({ error: 'Servicio no configurado' }, 500)

  let d: Record<string, any>
  try { d = await request.json() } catch { return json({ error: 'JSON inválido' }, 400) }

  if (d.website) return json({ ok: true }) // honeypot anti-bot

  const esPredio = d.tipo === 'predio'
  if (!d.nombre || !EMAIL_RE.test(String(d.email ?? ''))) return json({ error: 'Nombre y email válidos son obligatorios' }, 400)

  let subject: string
  let rows: string

  if (esPredio) {
    if ((!d.matricula && !d.adjunto?.content) || !d.municipio || !d.objetivo) {
      return json({ error: 'Faltan campos obligatorios (indica matrícula/chip o adjunta un documento)' }, 400)
    }
    subject = `CALIBRACIÓN CAPA CERO — ${String(d.municipio).slice(0, 60)} · ${String(d.matricula || d.adjunto?.filename || 'Documento adjunto').slice(0, 40)}`
    rows = [
      row('Nombre', d.nombre), row('Email', d.email), row('Teléfono', d.telefono),
      row('Chip catastral / matrícula', d.matricula || 'No indicado por texto (ver documento adjunto)'),
      row('Documento adjunto', d.adjunto?.filename ? `${d.adjunto.filename} (${Math.round((d.adjunto.size || 0) / 1024)} KB) — adjunto en este correo` : 'Ninguno'),
      row('Municipio', d.municipio),
      row('Objetivo', d.objetivo), row('Coordenadas CTM-12', d.ctm12),
      row('Autoriza evaluación para Radar', d.radar ? 'Sí' : 'No'),
    ].join('')
  } else {
    subject = `CAPA CERO — Consulta de ${String(d.nombre).slice(0, 60)}${d.empresa ? ` · ${String(d.empresa).slice(0, 60)}` : ''}`
    rows = [row('Nombre', d.nombre), row('Email', d.email), row('Empresa', d.empresa), row('Teléfono', d.telefono), row('Mensaje', d.mensaje)].join('')
  }

  const from = env.RESEND_FROM || 'CAPA CERO <onboarding@resend.dev>'
  const send = (payload: Record<string, unknown>) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

  // 1) Notificación interna con archivo adjunto si existe — si falla, se informa error al usuario.
  const internalPayload: Record<string, unknown> = {
    from,
    to: [env.CONTACT_TO || 'contacto@deecozan.com'],
    reply_to: String(d.email),
    subject,
    html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
  }

  if (d.adjunto?.content && d.adjunto?.filename) {
    const cleanBase64 = String(d.adjunto.content).replace(/^data:[^;]+;base64,/, '')
    internalPayload.attachments = [
      {
        filename: String(d.adjunto.filename).slice(0, 120),
        content: cleanBase64,
      },
    ]
  }

  const internal = await send(internalPayload)
  if (!internal.ok) return json({ error: 'No se pudo enviar' }, 502)

  // 2) Acuse de recibo al solicitante — mejor esfuerzo, no bloquea la respuesta.
  try {
    await send({
      from,
      to: [String(d.email)],
      reply_to: env.CONTACT_TO || 'contacto@deecozan.com',
      subject: esPredio ? 'CAPA CERO · Recibimos tu solicitud de calibración' : 'CAPA CERO · Recibimos tu mensaje',
      html: ackTemplate(String(d.nombre).slice(0, 80), esPredio),
    })
  } catch { /* el acuse es opcional */ }

  return json({ ok: true })
}
