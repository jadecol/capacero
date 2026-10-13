import { useState } from 'react'

interface BrandLogoProps {
  className?: string
  imageSrc?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function BrandLogo({
  className = '',
  imageSrc = '/logo.svg',
  showText = true,
  size = 'md',
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false)

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-[22px] h-[22px]',
    lg: 'w-7 h-7',
  }

  const textSizes = {
    sm: 'text-[15px]',
    md: 'text-[18px]',
    lg: 'text-[22px]',
  }

  // Si existe una imagen de logo cargada en /public (ej. /logo.svg o /logo.png) y no falla, se muestra directamente.
  if (imageSrc && !imageError) {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img
          src={imageSrc}
          alt="CAPA CERO"
          className={`h-auto object-contain ${size === 'sm' ? 'max-h-5' : size === 'md' ? 'max-h-6' : 'max-h-8'}`}
          onError={() => setImageError(true)}
        />
        {/* Si la imagen es solo un isotipo y showText es true, podemos conservar el texto tipográfico */}
      </div>
    )
  }

  // Fallback nativo: Isotipo vectorial de estratos geológicos + Tipografía editorial CAPA CERO
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={`${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
      >
        <rect x="0" y="8" width="32" height="2.5" rx="1.25" fill="#C8A45A" />
        <rect x="0" y="15" width="32" height="2.5" rx="1.25" fill="#C8A45A" fillOpacity="0.55" />
        <rect x="0" y="22" width="32" height="2.5" rx="1.25" fill="#C8A45A" fillOpacity="0.25" />
        <circle cx="27" cy="9.25" r="1.5" fill="#F4F1EB" className="animate-pulse" />
      </svg>

      {showText && (
        <span className={`sr font-semibold tracking-[0.04em] ${textSizes[size]} transition-colors`}>
          <span className="text-amber">CAPA</span> <span className="text-bone">CERO</span>
        </span>
      )}
    </div>
  )
}
