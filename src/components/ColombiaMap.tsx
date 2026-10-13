import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowRight, Crosshair, Radio } from 'lucide-react'
import { COBERTURA } from '../data'
import { latLonToCTM12, formatMeters } from '../utils/geo'

const COLORS: Record<string, string> = {
  Epicentro: '#C8A45A',
  Metropolitano: '#F4F1EB',
  Regional: 'rgba(244,241,235,0.6)',
  Cundinamarca: 'rgba(200,164,90,0.7)',
}

type CoberturaItem = (typeof COBERTURA)[number]

export default function ColombiaMap({ height = 540 }: { height?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const [selectedCity, setSelectedCity] = useState<CoberturaItem | null>(COBERTURA.find(c => c.ciudad === 'Ubaté') || COBERTURA[0])
  const [activeFilter, setActiveFilter] = useState<string>('Todos')

  useEffect(() => {
    if (!ref.current || mapRef.current) return

    const map = L.map(ref.current, {
      center: [4.9, -74.3],
      zoom: 6.2,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    })

    const cartoKey = import.meta.env.VITE_CARTO_API_KEY
    const tileUrl = cartoKey
      ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'

    L.tileLayer(tileUrl, {
      subdomains: cartoKey ? 'abcd' : '',
      maxZoom: 19,
      attribution: cartoKey ? '&copy; CARTO' : '&copy; Esri',
    }).addTo(map)

    COBERTURA.forEach(c => {
      const color = COLORS[c.tipo] || 'rgba(244,241,235,0.4)'
      const isEpicentro = c.tipo === 'Epicentro'
      const isMetro = c.tipo === 'Metropolitano'
      const coreSize = isEpicentro ? 12 : isMetro ? 8 : 7

      const icon = L.divIcon({
        html: `
          <div class="radar-node-wrapper group cursor-pointer" data-city="${c.ciudad}">
            <div class="radar-sonar-ring" style="border-color:${color};"></div>
            ${isEpicentro ? `<div class="radar-sonar-ring-2" style="border-color:${color};"></div>` : ''}
            <div class="radar-core-dot" style="width:${coreSize}px;height:${coreSize}px;background:${color};box-shadow:0 0 ${coreSize * 2}px ${color};"></div>
          </div>
        `,
        className: 'custom-radar-pin',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })

      const marker = L.marker([c.lat, c.lng], { icon }).addTo(map)

      marker.on('click', () => {
        setSelectedCity(c)
        map.flyTo([c.lat, c.lng], Math.max(map.getZoom(), 8), { duration: 1 })
      })

      marker.on('mouseover', () => {
        setSelectedCity(c)
      })

      markersRef.current.set(c.ciudad, marker)
    })

    mapRef.current = map

    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 250)

    return () => {
      clearTimeout(timer)
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  }, [])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    if (!mapRef.current) return

    if (filter === 'Todos') {
      mapRef.current.flyTo([4.9, -74.3], 6.2, { duration: 1.2 })
      return
    }

    const filtered = COBERTURA.filter(c => c.tipo === filter)
    if (filtered.length > 0) {
      setSelectedCity(filtered[0])
      if (filtered.length === 1) {
        mapRef.current.flyTo([filtered[0].lat, filtered[0].lng], 9, { duration: 1.2 })
      } else {
        const bounds = L.latLngBounds(filtered.map(c => [c.lat, c.lng] as [number, number]))
        mapRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 })
      }
    }
  }

  const filters = ['Todos', 'Epicentro', 'Metropolitano', 'Cundinamarca', 'Regional']

  return (
    <div className="relative border border-rule bg-void overflow-hidden group">
      <style>{`
        .custom-radar-pin {
          background: transparent !important;
          border: none !important;
        }
        .radar-node-wrapper {
          position: relative;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radar-core-dot {
          border-radius: 50%;
          position: relative;
          z-index: 2;
          transition: transform 0.25s ease;
        }
        .radar-node-wrapper:hover .radar-core-dot {
          transform: scale(1.4);
        }
        .radar-sonar-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border-width: 1px;
          border-style: solid;
          animation: radar-beacon 3.2s cubic-bezier(0.1, 0.5, 0.4, 1) infinite;
          pointer-events: none;
        }
        .radar-sonar-ring-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border-width: 1px;
          border-style: solid;
          animation: radar-beacon 3.2s cubic-bezier(0.1, 0.5, 0.4, 1) infinite 1.6s;
          pointer-events: none;
        }
        @keyframes radar-beacon {
          0% {
            transform: scale(0.4);
            opacity: 0.9;
          }
          70% {
            transform: scale(2.2);
            opacity: 0.08;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }
        @keyframes radar-sweep {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.08;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        .radar-sweep-line {
          position: absolute;
          inset: 0;
          height: 140px;
          background: linear-gradient(180deg, transparent, rgba(200,164,90,0.18), transparent);
          pointer-events: none;
          animation: radar-sweep 8s linear infinite;
          z-index: 10;
        }
      `}</style>

      {/* Sutil barrido de radar animado */}
      <div className="radar-sweep-line" aria-hidden="true" />

      {/* Barra de telemetría y filtros interactivos */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 bg-void/85 backdrop-blur-md border border-rule px-3 py-1.5 text-[11px]">
          <Radio size={12} className="text-amber animate-pulse" />
          <span className="text-bone/70 tracking-[0.14em] uppercase">RADAR ACTIVO</span>
          <span className="text-amber font-mono">20 NODOS</span>
        </div>

        {/* Filtros de clasificación territorial */}
        <div className="flex items-center gap-1 bg-void/85 backdrop-blur-md border border-rule p-1 overflow-x-auto">
          {filters.map(f => {
            const count = f === 'Todos' ? COBERTURA.length : COBERTURA.filter(c => c.tipo === f).length
            const active = activeFilter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => handleFilterClick(f)}
                className={`text-[10px] tracking-[0.1em] px-2.5 py-1 transition-colors uppercase whitespace-nowrap flex items-center gap-1.5 ${
                  active ? 'bg-amber text-void font-medium' : 'text-bone/60 hover:text-bone'
                }`}
              >
                <span>{f}</span>
                <span className={`text-[9px] ${active ? 'text-void/80' : 'text-bone/40'}`}>({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Contenedor del mapa Leaflet */}
      <div ref={ref} style={{ height, width: '100%' }} className="w-full z-0" />

      {/* Panel de Telemetría HUD: Nodo Seleccionado */}
      {selectedCity && (() => {
        const ctm = latLonToCTM12(selectedCity.lat, selectedCity.lng)
        return (
          <div className="absolute bottom-4 right-4 z-20 max-w-[290px] w-full bg-void/90 backdrop-blur-md border border-rule p-4 pointer-events-auto shadow-2xl">
            <div className="flex items-center justify-between text-[10px] tracking-[0.16em] mb-2">
              <span className="text-amber flex items-center gap-1.5 font-medium">
                <Crosshair size={11} className="text-amber" />
                {selectedCity.tipo.toUpperCase()}
              </span>
              <span className="text-bone/50 font-mono">{selectedCity.status}</span>
            </div>

            <div className="sr text-[22px] font-light text-bone leading-tight mb-1">
              {selectedCity.ciudad}
            </div>

            {/* Coordenadas CTM-12 (EPSG: 9377) + Geográficas MAGNA-SIRGAS */}
            <div className="space-y-1 my-3 py-2 border-y border-rule font-mono text-[10px]">
              <div className="flex items-center justify-between text-bone/80">
                <span className="text-amber/90">CTM-12 (EPSG:9377):</span>
                <span>N {formatMeters(ctm.norte)} m</span>
              </div>
              <div className="flex items-center justify-end text-bone/80">
                <span>E {formatMeters(ctm.este)} m</span>
              </div>
              <div className="text-[9px] text-bone/50 flex justify-between pt-1 border-t border-rule/50">
                <span>GEOGRÁFICAS:</span>
                <span>{selectedCity.lat.toFixed(4)}° N, {Math.abs(selectedCity.lng).toFixed(4)}° W</span>
              </div>
            </div>

            <div className="text-[11px] text-bone/70 mb-3 leading-relaxed">
              {selectedCity.tipo === 'Epicentro'
                ? 'Origen operativo: 12 años en Secretaría de Planeación y Obras Públicas. Análisis matriz de capas.'
                : selectedCity.tipo === 'Metropolitano'
                ? 'Área metropolitana de alta densificación. Monitoreo permanente de POT y licencias.'
                : 'Polígono en radar: cruce de determinantes ambientales CAR, riesgo y expansión.'}
            </div>

            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] text-amber hover:text-amber/80 font-medium transition-colors"
            >
              SOLICITAR AUDITORÍA <ArrowRight size={11} />
            </Link>
          </div>
        )
      })()}

      {/* Leyenda sobria inferior izquierda */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 bg-void/80 backdrop-blur-sm border border-rule p-3 pointer-events-auto">
        <div className="text-[9px] tracking-[0.2em] text-bone/50 mb-0.5 uppercase">Capas del radar</div>
        {Object.entries(COLORS).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2">
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: v, boxShadow: `0 0 6px ${v}` }} />
            <span className="text-[10px] tracking-[0.12em] text-bone/70">{k.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
