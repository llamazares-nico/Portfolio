import React from 'react'

interface SectionHeadingProps {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}

const ALIGN = {
  start: 'items-start text-start',
  center: 'items-center text-center',
  end: 'items-end text-end',
}

/** Título de sección: Oswald en mayúsculas + barra de acento, igual que el Hero */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  align = 'start',
  className = '',
}) => (
  <div className={`flex flex-col gap-4 ${ALIGN[align]} ${className}`}>
    <h2
      className='oswald-regular uppercase m-0 text-[#e6e6e6]'
      style={{
        // Estilo directo: la regla global de h2 en index.css le gana a las clases
        fontSize: 'clamp(2.5rem, 1.9rem + 2.4vw, 4rem)',
        lineHeight: 1,
        fontWeight: 500,
      }}
    >
      {children}
    </h2>
    <div
      aria-hidden='true'
      className='h-1 w-18 bg-accent'
      style={{clipPath: 'polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)'}}
    />
  </div>
)

export default SectionHeading
