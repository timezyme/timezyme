export default defineEventHandler(async () => {
  return {
    message: 'OK',
    timestamp: Date.now(),
    uptime: process.uptime(),
  }
})
