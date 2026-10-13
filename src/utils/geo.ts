/**
 * Proyección oficial MAGNA-SIRGAS Origen Nacional / CTM12 (EPSG: 9377)
 * Adoptado en Colombia mediante Resolución IGAC 471 de 2020 y Res. 529 de 2020.
 *
 * Parámetros oficiales:
 *  - Elipsoide: GRS 1980 (a = 6378137.0 m, f = 1/298.257222101)
 *  - Meridiano Central (lon0): -73.00000000° (-73°00'00" W)
 *  - Latitud de Origen (lat0): 4.00000000° (4°00'00" N)
 *  - Factor de Escala (k0): 0.9992
 *  - Falso Este (X0): 5.000.000,00 m
 *  - Falso Norte (Y0): 2.000.000,00 m
 */
export function latLonToCTM12(latDeg: number, lonDeg: number): { este: number; norte: number } {
  const a = 6378137.0
  const f = 1 / 298.257222101
  const b = a * (1 - f)
  const e2 = (a * a - b * b) / (a * a)
  const ePrime2 = (a * a - b * b) / (b * b)
  const k0 = 0.9992
  const lon0 = (-73.0 * Math.PI) / 180
  const lat0 = (4.0 * Math.PI) / 180
  const falseE = 5000000.0
  const falseN = 2000000.0

  const lat = (latDeg * Math.PI) / 180
  const lon = (lonDeg * Math.PI) / 180

  function M(phi: number) {
    return (
      a *
      ((1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * Math.pow(e2, 3)) / 256) * phi -
        ((3 * e2) / 8 + (3 * e2 * e2) / 32 + (45 * Math.pow(e2, 3)) / 1024) * Math.sin(2 * phi) +
        ((15 * e2 * e2) / 256 + (45 * Math.pow(e2, 3)) / 1024) * Math.sin(4 * phi) -
        ((35 * Math.pow(e2, 3)) / 3072) * Math.sin(6 * phi))
    )
  }

  const N = a / Math.sqrt(1 - e2 * Math.sin(lat) * Math.sin(lat))
  const T = Math.tan(lat) * Math.tan(lat)
  const C = ePrime2 * Math.cos(lat) * Math.cos(lat)
  const dLon = lon - lon0
  const deltaA = dLon * Math.cos(lat)

  const M_lat = M(lat)
  const M_lat0 = M(lat0)

  const x =
    k0 *
      N *
      (deltaA +
        ((1 - T + C) * Math.pow(deltaA, 3)) / 6 +
        ((5 - 18 * T + T * T + 72 * C - 58 * ePrime2) * Math.pow(deltaA, 5)) / 120) +
    falseE

  const y =
    k0 *
      (M_lat -
        M_lat0 +
        N *
          Math.tan(lat) *
          (Math.pow(deltaA, 2) / 2 +
            ((5 - T + 9 * C + 4 * C * C) * Math.pow(deltaA, 4)) / 24 +
            ((61 - 58 * T + T * T + 600 * C - 330 * ePrime2) * Math.pow(deltaA, 6)) / 720)) +
    falseN

  return { este: Math.round(x), norte: Math.round(y) }
}

/** Formatea número con separador de miles colombiano (ej. 4.909.332) */
export function formatMeters(val: number): string {
  return val.toLocaleString('es-CO')
}
