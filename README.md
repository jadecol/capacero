# CAPA CERO · Inteligencia Territorial & Doctrina Normativa

Plataforma institucional de **CAPA CERO** (deecozan), firma de inteligencia territorial para fondos de inversión, constructoras y estructuradores de suelo en Colombia.

## Stack Tecnológico

- **Framework**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS + Tipografía suiza editorial (Syne + Cormorant Garamond + Inter)
- **Cartografía**: Leaflet + Esri World Dark Canvas + CartoDB Dark Matter + CTM-12 (MAGNA-SIRGAS Origen Nacional / EPSG:9377)
- **Animaciones**: Framer Motion
- **Gráficos**: Recharts
- **Iconografía**: Lucide React

## Requisitos y Configuración Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Variables de Entorno (Opcional)

Puedes definir en `.env` (o en las variables de entorno de Cloudflare Pages):

```env
VITE_CARTO_API_KEY=tu_api_key_opcional
```

## Despliegue en Cloudflare Pages

- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Routing SPA**: Configurado vía `public/_redirects` (`/* /index.html 200`)
