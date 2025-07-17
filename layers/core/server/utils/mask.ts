export function mask (text: string, num = 4, mask = '*') {
  if (!text) {
    return ''
  }

  if (text.length <= num) {
    return '***'
  }

  return `${text}`.slice(-num).padStart(`${text}`.length, mask)
}
