const { WebSocketServer, OPEN } = require('ws')
const { randomUUID } = require('crypto')
const { allowedOrigins } = require('../middleware/cors')

const isProd = process.env.NODE_ENV === 'production'

function createChatServer(httpServer) {
  const wss = new WebSocketServer({
    server: httpServer,
    path: '/ws/chat',
    verifyClient({ origin }) {
      if (!origin && !isProd) return true
      return allowedOrigins.includes(origin)
    },
  })

  wss.on('connection', (ws) => {
    ws.on('message', (raw) => {
      let parsed
      try { parsed = JSON.parse(raw) } catch { return }

      if (parsed.type !== 'message') return
      const text = String(parsed.text ?? '').trim().slice(0, 1000)
      if (!text) return

      const outgoing = JSON.stringify({
        type: 'message',
        id: randomUUID(),
        text,
        userId: String(parsed.userId ?? 'anon').slice(0, 64),
        name: String(parsed.name ?? 'אנונימי').slice(0, 30),
        avatar: String(parsed.avatar ?? '🐶').slice(0, 8),
        at: Date.now(),
      })

      for (const client of wss.clients) {
        if (client.readyState === OPEN) client.send(outgoing)
      }
    })

    ws.on('error', (err) => console.error('[ws]', err.message))
  })

  console.log('WebSocket chat ready on /ws/chat')
  return wss
}

module.exports = { createChatServer }
