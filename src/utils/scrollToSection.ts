/**
 * Desplaza suavemente hasta una sección dejando lugar para el encabezado fijo.
 * Todos los botones y links que llevan a una sección usan esta función,
 * así terminan exactamente en el mismo lugar.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  // Escritorio: el encabezado flota más abajo y es más alto que el margen de la sección
  const offset = window.innerWidth > 1024 ? 100 : 25
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({top, behavior: 'smooth'})
}
