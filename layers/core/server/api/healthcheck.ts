export default defineEventHandler(async () => {
  return {
    message: 'OK',
    timestamp: Date.now(),
    // eslint-disable-next-line node/prefer-global/process
    uptime: process.uptime(),
  }
})
