import React from 'react'

/**
 * Convierte las negritas <b>…</b> de las traducciones en nodos de React,
 * sin usar dangerouslySetInnerHTML. Cualquier otra etiqueta queda como texto.
 */
export function richText(text: string): React.ReactNode[] {
  return text.split(/(<b>.*?<\/b>)/g).map((part, i) => {
    const bold = part.match(/^<b>(.*)<\/b>$/)
    return bold ? (
      <strong key={i} className='font-bold text-white'>
        {bold[1]}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  })
}
