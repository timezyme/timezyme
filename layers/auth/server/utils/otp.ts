export function isWithinExpiryDate (expiresAt: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime < expiresAt
}
