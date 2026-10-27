export function pageLabel(page, frontmatters) {
  const boundary = frontmatters.findIndex(slide => slide.appendixStart === true)
  const mainTotal = boundary < 0 ? frontmatters.length : boundary
  if (page <= mainTotal)
    return `${page} / ${mainTotal}`
  if (page === boundary + 1)
    return 'Backup'
  return `B${page - boundary - 1} / ${frontmatters.length - boundary - 1}`
}
